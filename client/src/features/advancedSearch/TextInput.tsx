/* eslint-disable prettier/prettier */
import React from 'react'

import { useAppDispatch } from '../../app/hooks'
import config from '../../config/config'
import EntityParser from '../../lib/parse/data/EntityParser'
import { useGetNameQuery } from '../../redux/api/ml_api'
import { addTextValue } from '../../redux/slices/advancedSearchSlice'
import { StyledInput } from '../../styles/features/advancedSearch/Input'
import {
  addHoverHelpText,
  addSelectedHelpText,
} from '../../redux/slices/helpTextSlice'

interface IInputType {
  label: string
  currentValue: string
  field: string
  stateId: string
  scope: string
}

let timeout: NodeJS.Timeout

/**
 * Form group for input values.
 * @param {string} label current selected field used for a label for the input group
 * @param {string} currentValue current input value
 * @param {string} parentScope the scope of the parent object
 * @param {string} stateId id of the current object within the advanced search state
 * @param {string} scope optional; the scope of the row for updating the help text
 * @returns {JSX.Element}
 */
const TextInput: React.FC<IInputType> = ({
  label,
  currentValue,
  field,
  stateId,
  scope,
}) => {
  const [isFocused, setIsFocused] = React.useState(false)

  const dispatch = useAppDispatch()
  const handleOnChange = (userInput: string): void => {
    dispatch(addTextValue({ field, value: userInput, stateId, scope }))
  }

  const handleOnSelect = (): void => {
    if (scope !== undefined) {
      dispatch(addSelectedHelpText({ value: field, scope }))
      dispatch(addHoverHelpText({ value: field, scope }))
    }
  }

  const handleOnFocus = (): void => {
    setIsFocused(true)
    clearTimeout(timeout)
  }

  const handleOnBlur = (): void => {
    timeout = setTimeout(() => setIsFocused(false), 1000)
  }

  const uri = currentValue
    ? currentValue.replace('https://lux.collections.yale.edu/data/', '')
    : ''
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
          type="text"
          value={
            displayName !== currentValue && !isFocused
              ? displayName
              : currentValue
          }
          // value={displayName !== currentValue ? displayName : currentValue}
          className="form-control advancedSearchInput bg-white"
          placeholder={label}
          onChange={(e) => handleOnChange(e.currentTarget.value)}
          onSelect={() => handleOnSelect()}
          data-testid={`${field}-${stateId}-text-input`}
          id={id}
          onFocus={() => handleOnFocus()}
          onBlur={() => handleOnBlur()}
          pattern={
            field === 'id'
              ? 'https://lux.collections.yale.edu/data/.*'
              : undefined
          }
          title={
            field === 'id'
              ? "The input must start with 'https://lux.collections.yale.edu/data/'"
              : undefined
          }
        />
      </div>
    </div>
  )
}

export default TextInput
