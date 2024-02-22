import React from 'react'

import { useAppDispatch } from '../../app/hooks'
import {
  addEndDateValue,
  addStartDateValue,
} from '../../redux/slices/advancedSearchSlice'
import { StyledInput } from '../../styles/features/advancedSearch/Input'

interface IDateInput {
  currentValue: {
    start: string
    end: string
  }
  field: string
  stateId: string
}

/**
 * Responsible for rendering the range input components for advanced search.
 * @param {string} label the current nested state within the advanced search state
 * @param {string} currentValue current range value
 * @param {string} field current range field selected
 * @param {string} comp comparator value, such as >, <, >=, etc
 * @param {string} stateId id of the current object within the advanced search state
 * @param {string} ariaLabel label for aria-label for the AdvancedSearchDropdown
 * @returns {JSX.Element}
 */
const DateInput: React.FC<IDateInput> = ({ currentValue, field, stateId }) => {
  const dispatch = useAppDispatch()
  const handleStartOnChange = (userInput: string): void => {
    dispatch(addStartDateValue({ field, value: userInput, stateId }))
  }

  const handleEndOnChange = (userInput: string): void => {
    dispatch(addEndDateValue({ field, value: userInput, stateId }))
  }

  const startId = `earliest-date-${stateId}`
  const endId = `latest-date-${stateId}`

  return (
    <div
      className="d-flex justify-content-between"
      data-testid={`${field}-${stateId}-range-input`}
    >
      <label htmlFor={startId} className="d-none">
        Enter a start year
      </label>
      <StyledInput
        id={startId}
        type="number"
        className="form-control me-2"
        placeholder="Enter start year"
        value={currentValue.start}
        onChange={(e) => handleStartOnChange(e.currentTarget.value)}
      />
      <p className="d-flex align-items-center me-2 mb-0">to</p>
      <label htmlFor={endId} className="d-none">
        Enter an end year
      </label>
      <StyledInput
        id={endId}
        type="number"
        className="form-control me-2"
        placeholder="Enter end year"
        value={currentValue.end || ''}
        onChange={(e) => handleEndOnChange(e.currentTarget.value)}
      />
    </div>
  )
}

export default DateInput
