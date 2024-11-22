import React, { useCallback } from 'react'
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import { addBooleanValue } from '../../redux/slices/advancedSearchSlice'
import theme from '../../styles/theme'

interface IInputType {
  label: string
  currentValue: number
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
 * @param {number} currentValue current value for the advanced search state object
 * @param {string} field field for the current advanced search state object
 * @param {string} stateId id for the current advanced search state object
 * @returns
 */
const BooleanInput: React.FC<IInputType> = ({
  label,
  currentValue,
  field,
  stateId,
}) => {
  const dispatch = useAppDispatch()
  const handleOnChange = useCallback(
    (selected: string): void => {
      dispatch(
        addBooleanValue({ field, value: parseInt(selected, 10), stateId }),
      )
    },
    [dispatch, field, stateId],
  )
  const toggleButtonGroupId = `boolean-field-${stateId}`

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
          <StyledToggle
            id={`toggle-check-yes-${stateId}`}
            type="radio"
            name="yes-button"
            variant="secondary"
            checked={currentValue === 1}
            value={1}
            className={`${currentValue === 1 ? 'checked' : ''} me-2`}
          >
            Yes
          </StyledToggle>
          <StyledToggle
            id={`toggle-check-no-${stateId}`}
            type="radio"
            name="no-button"
            variant="secondary"
            checked={currentValue === 0}
            value={0}
            className={`${currentValue === 0 ? 'checked' : ''} me-2`}
          >
            No
          </StyledToggle>
        </ToggleButtonGroup>
      </div>
    </div>
  )
}

export default BooleanInput
