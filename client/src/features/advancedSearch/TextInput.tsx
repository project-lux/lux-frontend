/* eslint-disable prettier/prettier */
import React, { useRef } from 'react'
import { Overlay, Tooltip } from 'react-bootstrap'

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
  const [error, setError] = React.useState<string | null>(null)
  const [showTooltip, setShowTooltip] = React.useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useAppDispatch()

  const handleOnChange = (userInput: string): void => {
    // Validate that the input starts with the correct URL prefix if the field is 'id'
    if (
      field === 'id' &&
      userInput &&
      !userInput.startsWith('https://lux.collections.yale.edu/data/')
    ) {
      setError("Input must start with 'https://lux.collections.yale.edu/data/'")
      setShowTooltip(true)
    } else {
      setError(null)
      setShowTooltip(false)
    }
    dispatch(addTextValue({ field, value: userInput, stateId, scope }))
  }

  const handleOnBlur = (): void => {
    setIsFocused(false)
    setShowTooltip(false)
  }

  const handleOnSelect = (): void => {
    if (scope !== undefined) {
      dispatch(addSelectedHelpText({ value: field, scope }))
      dispatch(addHoverHelpText({ value: field, scope }))
    }
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
          onBlur={() => handleOnBlur()}
          aria-invalid={!!error}
        />
        <Overlay
          target={inputRef.current}
          show={showTooltip && !!error}
          placement="bottom"
        >
          <Tooltip id={`tooltip-${id}`}>{error}</Tooltip>
        </Overlay>
      </div>
    </div>
  )
}

export default TextInput
