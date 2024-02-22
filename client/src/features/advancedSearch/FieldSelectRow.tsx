/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { useAppDispatch } from '../../app/hooks'
import { conditionals } from '../../config/advancedSearch/conditionals'
import { scopeToAriaLabel } from '../../config/searchTypes'
import { getProperty } from '../../lib/advancedSearch/advancedSearchParser'
import { getParentLabels } from '../../lib/advancedSearch/stateManager'
import { addFieldSelection } from '../../redux/slices/advancedSearchSlice'
import AlignedDiv from '../../styles/features/advancedSearch/AlignedDiv'

import AdvancedSearchDropdown from './Dropdown'
import RemoveButton from './RemoveButton'
import TextInput from './TextInput'

interface IFieldSelectRow {
  stateId: string
  scope: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: Record<string, any>
  parentStateId: string
  childInd?: number | undefined
  siblings?: Array<Record<string, any>> | undefined
}

/**
 * Contains the components for selecting advanced search fields or entering a name string
 * @param {string} stateId current object's id
 * @param {string} scope the scope of the parent object
 * @param {boolean} state the current nested object within the advanced search state
 * @param {() => void} parentStateId id of the current nested object's parent object
 * @param {number} childInd optional; the array index of the object within a group
 * @param {Array<Record<string, any>> | undefined} siblings optional; array containing the list of children in a group
 * @returns {JSX.Element}
 */
const FieldSelectRow: React.FC<IFieldSelectRow> = ({
  stateId,
  scope,
  state,
  parentStateId,
  childInd = undefined,
  siblings = undefined,
}) => {
  const dispatch = useAppDispatch()
  const addOption = (selected: string): void => {
    dispatch(addFieldSelection({ scope, selected, stateId }))
  }

  const ariaLabel = scopeToAriaLabel[scope]

  const siblingHasData = (
    group: Array<Record<string, any>> | undefined,
  ): boolean => {
    if (group === undefined) {
      return false
    }

    for (const childObj of group) {
      if (getProperty(childObj) !== '') {
        return true
      }
    }
    return false
  }

  return (
    <AlignedDiv
      className="mb-2 px-0"
      data-testid={`field-select-row-${stateId}${
        childInd ? `-${childInd}` : ''
      }`}
      aria-describedby="help-text"
    >
      <div className="col d-flex align-content-start">
        <AdvancedSearchDropdown
          options={conditionals}
          handleChange={addOption}
          className="multipleFieldSelection mx-0"
          dropdownHeaderText="Have multiple fields"
          ariaLabel={`${ariaLabel} Have multiple fields`}
          id={`multiple-fields-${stateId}`}
        />
        <div className="d-flex w-auto align-items-center">
          <p className="mx-2 mb-0">or</p>
        </div>
        <AdvancedSearchDropdown
          options={getParentLabels(scope)}
          handleChange={addOption}
          className="singleFieldSelection ms-2"
          dropdownHeaderText="Have a single field"
          ariaLabel={`${ariaLabel} single field selection`}
          id={`single-fields-${stateId}`}
          scope={scope}
        />
        <div className="d-flex w-auto align-items-center">
          <p className="mx-2 mb-0">or Have Name</p>
        </div>
        <TextInput
          label="Enter a name"
          currentValue={state.name}
          field="name"
          stateId={stateId}
        />
        {childInd !== undefined &&
          (childInd > 0 || siblingHasData(siblings)) && (
            <RemoveButton
              stateId={stateId}
              parentStateId={parentStateId}
              childInd={childInd}
            />
          )}
      </div>
    </AlignedDiv>
  )
}

export default FieldSelectRow
