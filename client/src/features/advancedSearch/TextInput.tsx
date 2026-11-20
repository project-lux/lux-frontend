import React, { useEffect, useRef } from 'react'

import { useAppDispatch } from '../../app/hooks'
import config, { getDataApiBaseUrl } from '../../config/config'
import EntityParser from '../../lib/parse/data/EntityParser'
import { useGetNameQuery } from '../../redux/api/ml_api'
import { addTextValue } from '../../redux/slices/advancedSearchSlice'
import { StyledInput } from '../../styles/features/advancedSearch/Input'
import {
  addHoverHelpText,
  addSelectedHelpText,
} from '../../redux/slices/helpTextSlice'
import {
  getLuxDataPrefix,
  getLuxProdDataPrefix,
  PROD_LUX_BASE_URL,
} from '../../lib/util/prefix'

// Resolved at call time because the data API base URL is only known once the
// server config has loaded, which happens after this module is evaluated
const getIdValidationMessage = (): string => {
  if (getDataApiBaseUrl() === PROD_LUX_BASE_URL) {
    return `Input must start with '${getLuxDataPrefix()}'`
  }
  return `Input must start with '${getLuxProdDataPrefix()}' or '${getLuxDataPrefix()}'`
}

// Only the 'id' field requires validation; it must be a LUX data URI
const isValidInput = (field: string, value: string | undefined): boolean =>
  field !== 'id' ||
  !value ||
  value.startsWith(getLuxDataPrefix()) ||
  value.startsWith(getLuxProdDataPrefix())

const stripLuxDataPrefix = (value: string): string => {
  const luxDataPrefix = getLuxDataPrefix()
  const luxProdDataPrefix = getLuxProdDataPrefix()
  return value.startsWith(luxDataPrefix)
    ? value.slice(luxDataPrefix.length)
    : value.startsWith(luxProdDataPrefix)
      ? value.slice(luxProdDataPrefix.length)
      : value
}

interface IInputType {
  label: string
  currentValue: string
  field: string
  stateId: string
  scope: string
  autoFocus?: boolean
}

/**
 * Form group for input values.
 * @param {string} label current selected field used for a label for the input group
 * @param {string} currentValue current input value
 * @param {string} parentScope the scope of the parent object
 * @param {string} stateId id of the current object within the advanced search state
 * @param {string} scope optional; the scope of the row for updating the help text
 * @param {boolean} autoFocus optional; move keyboard focus onto the input field
 * @returns {JSX.Element}
 */
const TextInput: React.FC<IInputType> = ({
  label,
  currentValue,
  field,
  stateId,
  scope,
  autoFocus,
}) => {
  const [isFocused, setIsFocused] = React.useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isValid, setIsValid] = React.useState(true)

  const dispatch = useAppDispatch()

  // Keep the input's validity in sync with the current field and value so a
  // custom validity message does not persist after switching away from 'id'
  useEffect(() => {
    const invalid = !isValidInput(field, currentValue)
    inputRef.current?.setCustomValidity(invalid ? getIdValidationMessage() : '')
    setIsValid(!invalid)
  }, [field, currentValue])

  const handleOnChange = (userInput: string): void => {
    if (!isValidInput(field, userInput)) {
      inputRef.current?.setCustomValidity(getIdValidationMessage())
      inputRef.current?.reportValidity()
    }
    dispatch(addTextValue({ field, value: userInput, stateId, scope }))
  }

  const handleOnSelect = (): void => {
    if (scope !== undefined) {
      dispatch(addSelectedHelpText({ value: field, scope }))
      dispatch(addHoverHelpText({ value: field, scope }))
    }
  }

  const uri = currentValue ? stripLuxDataPrefix(currentValue) : ''
  const { data, isSuccess } = useGetNameQuery(
    { uri },
    { skip: field !== 'id' || currentValue === undefined },
  )

  let displayName = currentValue
  if (isSuccess && data) {
    const entity = new EntityParser(data)
    displayName = entity.getPrimaryName(config.aat.langen)
  }

  const id = `input-field-${stateId}`

  return (
    <div className="form-group me-2">
      <div className="input-group h-100" style={{ minWidth: '100px' }}>
        {label && (
          <label htmlFor={id} hidden>
            {label}
          </label>
        )}
        <StyledInput
          ref={inputRef}
          type="text"
          value={
            displayName !== currentValue && !isFocused
              ? displayName
              : currentValue
          }
          className="form-control advancedSearchInput bg-white"
          placeholder={label}
          onChange={(e) => handleOnChange(e.currentTarget.value)}
          onSelect={() => handleOnSelect()}
          data-testid={`${field}-${stateId}-text-input`}
          id={id}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!isValid}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
        />
      </div>
    </div>
  )
}

export default TextInput
