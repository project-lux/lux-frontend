import React, { useCallback } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { addTextValue } from '../../redux/slices/advancedSearchSlice'
import { recordTypes } from '../../config/advancedSearch/inputTypes'

import AdvancedSearchDropdown from './Dropdown'

interface IInputType {
  label: string
  scope: string
  currentValue: string
  field: string
  stateId: string
}

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
      dispatch(addTextValue({ field, value: selected, stateId, scope }))
    },
    [dispatch, field, stateId, scope],
  )
  const toggleButtonGroupId = `boolean-field-${stateId}`
  const options: Record<string, string> = recordTypes[scope] || {}
  const dropdownId = `person-or-group-options-${stateId}`

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
        <AdvancedSearchDropdown
          options={options}
          handleChange={handleOnChange}
          className="recordTypeSelection"
          dropdownHeaderText="Select Value"
          id={dropdownId}
          ariaLabel="Select the record type"
          scope={scope}
          selected={currentValue}
        />
      </div>
    </div>
  )
}

export default RecordTypeInput
