/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import { addTextValue } from '../../redux/slices/advancedSearchSlice'
import theme from '../../styles/theme'
import { recordTypes } from '../../config/advancedSearch/inputTypes'

interface IInputType {
  label: string
  scope: string
  currentValue: string
  field: string
  stateId: string
}

const StyledToggle = styled(ToggleButton)`
  color: ${theme.color.button};
  background-color: ${theme.color.white};
  border: 1px solid ${theme.color.button} !important;
  border-radius: 5px !important;

  &.checked {
    color: ${theme.color.white};
    background-color: ${theme.color.button} !important;
  }
`

/**
 * Form group for selecting Yes/No values in the advanced search
 * @param {string} label label for the input group
 * @param {string} currentValue current value for the advanced search state object
 * @param {string} field field for the current advanced search state object
 * @param {string} stateId id for the current advanced search state object
 * @returns
 */
const RecordTypeInput: React.FC<IInputType> = ({
  label,
  scope,
  currentValue,
  field,
  stateId,
}) => {
  const dispatch = useAppDispatch()
  const handleOnChange = useCallback(
    (selected: string): void => {
      dispatch(addTextValue({ field, value: selected, stateId }))
    },
    [dispatch, field, stateId],
  )
  const toggleButtonGroupId = `boolean-field-${stateId}`
  const options: Array<{ label: string; value: string }> =
    recordTypes[scope] || []

  return (
    <div
      className="form-group"
      data-testid={`${field}-${stateId}-boolean-input`}
    >
      <div className="input-group">
        {label && (
          <label htmlFor={toggleButtonGroupId} hidden>
            {label}
          </label>
        )}
        <ToggleButtonGroup
          type="radio"
          name="boolean-options"
          id={toggleButtonGroupId}
          onChange={handleOnChange}
        >
          {options.map((option: { label: string; value: string }) => (
            <StyledToggle
              key={`${option.label}-toggle-types-${stateId}`}
              id={`${option.label}-toggle-types-${stateId}`}
              type="radio"
              name="yes-button"
              variant="secondary"
              checked={currentValue === option.value}
              value={option.value}
              className={`${
                currentValue === option.value ? 'checked' : ''
              } me-2`}
            >
              {option.label}
            </StyledToggle>
          ))}
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default RecordTypeInput
