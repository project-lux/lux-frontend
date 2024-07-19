import React, { useState } from 'react'
import { isUndefined } from 'lodash'

import { useAppDispatch } from '../../app/hooks'
import { comparators, timePeriod } from '../../config/advancedSearch/inputTypes'
import {
  addRangeComparator,
  addRangeValue,
} from '../../redux/slices/advancedSearchSlice'
import { StyledInput } from '../../styles/features/advancedSearch/Input'
import {
  getDateInputPlaceholder,
  getTimestampFromFacetValue,
} from '../../lib/facets/dateParser'

import AdvancedSearchDropdown from './Dropdown'

interface IDateInput {
  label: string
  currentValue: string
  field: string
  comp: string
  stateId: string
  ariaLabel: string
}

/**
 * Responsible for rendering the date input components for advanced search.
 * @param {string} label the current nested state within the advanced search state
 * @param {string} currentValue current date value
 * @param {string} field current date field selected
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
  const timestamp =
    currentValue !== '' ? getTimestampFromFacetValue(currentValue) : undefined
  const placeHolder = !isUndefined(timestamp)
    ? getDateInputPlaceholder(timestamp)
    : undefined
  const defaultEra = currentValue[0] === '-' ? 'bce' : 'ce'
  const [era, setEra] = useState<string>(defaultEra)

  const handleOnChange = (userInput: string): void => {
    const date = new Date(userInput)
    let year = date.getUTCFullYear()
    if (era === 'bce') {
      year = -year
      date.setUTCFullYear(year)
    }
    if (era === 'ce') {
      year = Math.abs(year)
      date.setUTCFullYear(year)
    }
    dispatch(addRangeValue({ field, value: date.toISOString(), stateId }))
  }

  const handleAddComparator = (selected: string): void => {
    dispatch(addRangeComparator({ comp: selected, stateId }))
  }

  const handleAddTimePeriod = (selected: string): void => {
    setEra(selected)
    if (currentValue !== '') {
      const date = new Date(currentValue)
      let year = date.getUTCFullYear()
      if (selected === 'bce') {
        year = -year
        date.setUTCFullYear(year)
      }
      if (selected === 'ce') {
        year = Math.abs(year)
        date.setUTCFullYear(year)
      }
      dispatch(addRangeValue({ field, value: date.toISOString(), stateId }))
    }
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
      <StyledInput
        id={rangeId}
        type="date"
        className="form-control me-2"
        placeholder={placeHolder}
        value={placeHolder}
        onChange={(e) => handleOnChange(e.currentTarget.value)}
      />
      <label htmlFor="date-period" className="d-none">
        {label}
      </label>
      <AdvancedSearchDropdown
        options={timePeriod}
        handleChange={handleAddTimePeriod}
        className="timeEraSelection me-2"
        dropdownHeaderText="Select the era"
        ariaLabel="Select the era BC or BCE"
        selected={era}
        id="date-period"
      />
    </div>
  )
}

export default DateInput
