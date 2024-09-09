import React from 'react'

import { useAppDispatch } from '../../app/hooks'
import { comparators } from '../../config/advancedSearch/inputTypes'
import {
  addRangeComparator,
  addRangeValue,
} from '../../redux/slices/advancedSearchSlice'
import { StyledInput } from '../../styles/features/advancedSearch/Input'
import { getYearToDisplay } from '../../lib/facets/dateParser'

import AdvancedSearchDropdown from './Dropdown'

interface IRangeInput {
  label: string
  currentValue: string
  field: string
  comp: string
  stateId: string
  ariaLabel: string
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
const DateRangeInput: React.FC<IRangeInput> = ({
  label,
  currentValue,
  field,
  comp,
  stateId,
  ariaLabel,
}) => {
  const dispatch = useAppDispatch()
  const handleOnChange = (userInput: string): void => {
    dispatch(addRangeValue({ field, value: userInput, stateId }))
  }

  const handleAddComparator = (selected: string): void => {
    dispatch(addRangeComparator({ comp: selected, stateId }))
  }

  const comparatorsId = `comparators-options-${stateId}`
  const rangeId = `comparators-options-${stateId}`

  return (
    <div
      className="d-flex justify-content-between"
      data-testid={`${field}-${stateId}-range-input`}
    >
      <label htmlFor={comparatorsId} className="d-none">
        Select a comparator
      </label>
      <AdvancedSearchDropdown
        options={comparators}
        handleChange={handleAddComparator}
        className="comparatorSelection me-2"
        dropdownHeaderText="greater than or equal to"
        ariaLabel={`${ariaLabel} greater than or equal to`}
        selected={comp}
        id={comparatorsId}
      />
      <label htmlFor={rangeId} className="d-none">
        {label}
      </label>
      <StyledInput
        id={rangeId}
        type="number"
        className="form-control me-2"
        placeholder={label}
        value={getYearToDisplay(currentValue)}
        onChange={(e) => handleOnChange(e.currentTarget.value)}
      />
    </div>
  )
}

export default DateRangeInput
