import React from 'react'

import { useAppDispatch } from '../../app/hooks'
import {
  comparators,
  numbersToMonths,
} from '../../config/advancedSearch/inputTypes'
import {
  addRangeComparator,
  addRangeValue,
} from '../../redux/slices/advancedSearchSlice'
import { StyledInput } from '../../styles/features/advancedSearch/Input'
import {
  getDaysInMonthArray,
  getDefaultDate,
  getLuxISOString,
  getLuxYear,
  isDayOrMonthToLuxNumberAsString,
  getYearToDisplay,
  isValid,
} from '../../lib/facets/dateParser'

import AdvancedSearchDropdown from './Dropdown'
import DayDropdown from './DayDropdown'

interface IDateInput {
  label: string
  currentValue: string
  field: string
  comp: string
  stateId: string
  ariaLabel: string
}

/**
 * Responsible for rendering the day input components for advanced search.
 * @param {string} label the current nested state within the advanced search state
 * @param {string} currentValue current day value
 * @param {string} field current day field selected
 * @param {string} comp comparator value, such as >, <, >=, etc
 * @param {string} stateId id of the current object within the advanced search state
 * @param {string} ariaLabel label for aria-label for the AdvancedSearchDropdown
 * @returns {JSX.Element}
 */
const DateInput: React.FC<IDateInput> = ({
  label,
  currentValue,
  field,
  comp,
  stateId,
  ariaLabel,
}) => {
  const dispatch = useAppDispatch()
  const { month, day, year } = getDefaultDate(currentValue)
  const daysArr = getDaysInMonthArray(month, year)
  const handleAddComparator = (selected: string): void => {
    dispatch(addRangeComparator({ comp: selected, stateId }))
  }

  const handleAddDate = (y: string, m: string, d: string): void => {
    const isoDate = getLuxISOString(y, m, d)
    dispatch(addRangeValue({ field, value: isoDate, stateId }))
  }

  const handleMonthChange = (selected: string): void => {
    // Check if day inputed is valid
    if (
      isValid(parseInt(day, 10), parseInt(selected, 10), parseInt(year, 10))
    ) {
      handleAddDate(year, selected, day)
    } else {
      handleAddDate(year, selected, '1')
    }
  }

  const handleDayChange = (selected: string): void => {
    handleAddDate(year, month, selected)
  }

  const handleYearChange = (selected: string): void => {
    const yearToAdd = getLuxYear(selected)
    handleAddDate(yearToAdd, month, day)
  }

  const comparatorsId = `comparators-options-${stateId}`
  const rangeId = `comparators-options-${stateId}`

  return (
    <div
      className="d-flex justify-content-between"
      data-testid={`${field}-${stateId}-date-input`}
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
      <div className="d-flex justify-content-between me-2">
        <label htmlFor="month-selection" hidden>
          Month
        </label>
        <AdvancedSearchDropdown
          options={numbersToMonths}
          handleChange={handleMonthChange}
          className="monthSelection me-2"
          dropdownHeaderText="Select a month"
          ariaLabel="Select a month"
          selected={isDayOrMonthToLuxNumberAsString(month)}
          id="month-selection"
        />
        <label htmlFor="day-input" hidden>
          Day
        </label>
        <DayDropdown
          options={daysArr}
          handleChange={handleDayChange}
          className="dateSelection me-2"
          dropdownHeaderText="Select a date"
          ariaLabel="Select a date"
          selected={isDayOrMonthToLuxNumberAsString(day)}
          id="month-selection"
        />
        <label htmlFor="year-input" hidden>
          Year
        </label>
        <StyledInput
          id="year-input"
          type="number"
          className="form-control"
          onChange={(e) => handleYearChange(e.target.value)}
          placeholder="Enter year"
          value={getYearToDisplay(year)}
          max={9999}
          min={-9999}
          required
        />
      </div>
    </div>
  )
}

export default DateInput
