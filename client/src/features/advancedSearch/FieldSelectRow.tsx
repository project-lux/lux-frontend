/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Col } from 'react-bootstrap'

import { useAppDispatch } from '../../app/hooks'
import { conditionals } from '../../config/advancedSearch/conditionals'
import { scopeToAriaLabel } from '../../config/searchTypes'
import { getProperty } from '../../lib/advancedSearch/advancedSearchParser'
import { getParentLabels } from '../../lib/advancedSearch/stateManager'
import { addFieldSelection } from '../../redux/slices/advancedSearchSlice'
import StyledInputGroup from '../../styles/features/advancedSearch/InputGroup'

import AdvancedSearchDropdown from './Dropdown'
import RemoveButton from './RemoveButton'
import TextInput from './TextInput'

interface IFieldSelectRow {
  stateId: string
  scope: string

  state: Record<string, any>
  parentStateId: string
  childInd?: number | undefined
  siblings?: Array<Record<string, any>> | undefined
  parentBgColor?: 'bg-white' | 'bg-light'
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
  parentBgColor,
}) => {
  const dispatch = useAppDispatch()
  const addOption = (selected: string): void => {
    dispatch(addFieldSelection({ scope, selected, stateId, parentBgColor }))
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
    <Col
      className="mb-3 bg-white"
      data-testid={`field-select-row-${stateId}${
        childInd ? `-${childInd}` : ''
      }`}
      aria-describedby="help-text"
    >
      <StyledInputGroup className="px-0 d-flex align-content-start flex-nowrap">
        <span className="w-100 d-flex py-2 ps-2">
          <AdvancedSearchDropdown
            options={conditionals}
            handleChange={addOption}
            className="multipleFieldSelection mx-0"
            dropdownHeaderText="Have multiple fields"
            ariaLabel={`${ariaLabel} Have multiple fields`}
            id={`multiple-fields-${stateId}`}
          />
          <div className="d-flex w-auto align-items-center">
            <p className="mx-2 mb-0 text-nowrap">or</p>
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
            <p className="mx-2 mb-0 text-nowrap">or Have Name</p>
          </div>
          <TextInput
            key={state.name}
            label="Enter a name"
            currentValue={state.name}
            field="name"
            stateId={stateId}
            scope={scope}
          />
        </span>
        {childInd !== undefined &&
          (childInd > 0 || siblingHasData(siblings)) && (
            <RemoveButton
              stateId={stateId}
              parentStateId={parentStateId}
              childInd={childInd}
            />
          )}
      </StyledInputGroup>
    </Col>
  )
}

export default FieldSelectRow
