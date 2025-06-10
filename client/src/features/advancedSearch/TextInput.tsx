import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

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
// import theme from '../../styles/theme'

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
 * @param {boolean} autoFocus optional; move keyboard focus onto the input field
 * @param {string} scope optional; the scope of the row for updating the help text
 * @returns {JSX.Element}
 */
const TextInput: React.FC<IInputType> = ({
  label,
  currentValue,
  field,
  stateId,
  autoFocus,
  scope,
}) => {
  const dispatch = useAppDispatch()
  const [inputValue, setInputValue] = useState<string>(currentValue)
  const handleOnChange = (userInput: string): void => {
    setInputValue(userInput)
    dispatch(addTextValue({ field, value: userInput, stateId, scope }))
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

  const id = `inputField${stateId}`

  return (
    <Form.Group className="me-2">
      <div className="input-group h-100" style={{ minWidth: '100px' }}>
        {label && (
          <Form.Label htmlFor={id} hidden>
            {label}
          </Form.Label>
        )}
        <StyledInput
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          aria-describedby={id}
          id={id}
          type="text"
          placeholder={label}
          value={displayName !== currentValue ? displayName : inputValue}
          className="form-control advancedSearchInput bg-white"
          onChange={(e) => handleOnChange(e.currentTarget.value)}
          onSelect={() => handleOnSelect()}
          data-testid={`${field}-${stateId}-text-input`}
          disabled={displayName !== currentValue}
        />
      </div>
    </Form.Group>
  )
}

export default TextInput
