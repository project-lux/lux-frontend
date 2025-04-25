/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Col, InputGroup, Row } from 'react-bootstrap'

import { useAppDispatch } from '../../app/hooks'
import { scopeToAriaLabel } from '../../config/searchTypes'
import {
  getParentLabels,
  getFieldToEntityRelationship,
} from '../../lib/advancedSearch/stateManager'
import { addFieldSelection } from '../../redux/slices/advancedSearchSlice'
import StyledInputGroup from '../../styles/features/advancedSearch/InputGroup'

import AdvancedSearchDropdown from './Dropdown'
import AdvancedSearchForm from './Form'
import OptionsButton, { RELATIONSHIP_ROW_TYPE } from './OptionsButton'
import RemoveButton from './RemoveButton'

interface IRelationshipRow {
  stateId: string
  selectedKey: string
  state: Array<Record<string, any>>
  parentScope: string
  parentStateId: string
  nestedLevel: number
}

/**
 * Contains the functionality and components of a nested relationship within the advanced search state.
 * @param {string} stateId id of the parent object within the advanced search state
 * @param {string} selectedKey current selected field
 * @param {string} state the current nested state within the advanced search state
 * @param {number} parentScope the scope of the parent object
 * @param {boolean} parentStateId id of the parent object within the advanced search state
 * @param {number} nestedLevel level of depth within the advanced search state
 * @returns {JSX.Element}
 */
const RelationshipRow: React.FC<IRelationshipRow> = ({
  state,
  stateId,
  selectedKey,
  parentScope,
  parentStateId,
  nestedLevel,
}) => {
  const dispatch = useAppDispatch()
  const addOption = (selected: string): void => {
    dispatch(addFieldSelection({ scope: parentScope, selected, stateId }))
  }
  const scopeToPassToNestedForm =
    getFieldToEntityRelationship(parentScope, selectedKey) || ''
  const id = `field-dropdown-${stateId}`
  const parentLabels = getParentLabels(parentScope)
  const labelForAria = parentLabels ? parentLabels[selectedKey] : ''
  const legendText =
    scopeToPassToNestedForm !== ''
      ? scopeToAriaLabel[scopeToPassToNestedForm]
      : 'nested group'

  return (
    <Row>
      <Col>
        <StyledInputGroup
          className="mb-3 border jusify-content-between flex-nowrap"
          data-testid={`${selectedKey}-${stateId}-relationship-row`}
        >
          <span className="ms-2 my-2 d-flex">
            <label htmlFor={id} hidden>
              {selectedKey}
            </label>
            <AdvancedSearchDropdown
              options={parentLabels || {}}
              handleChange={addOption}
              className="singleFieldSelection"
              dropdownHeaderText="Has single field"
              ariaLabel={`${scopeToAriaLabel[parentScope]} single field selection`}
              selected={selectedKey}
              scope={parentScope}
              id={id}
            />
            <OptionsButton
              state={state}
              stateId={stateId}
              ariaLabel={labelForAria}
              nestedLevel={nestedLevel}
              rowType={RELATIONSHIP_ROW_TYPE}
            />
            <div>{legendText}</div>
            <AdvancedSearchForm
              key={stateId}
              state={state}
              parentScope={scopeToPassToNestedForm}
              parentStateId={stateId}
              nestedLevel={nestedLevel + 1}
            />
          </span>
          <InputGroup.Text id="basic-addon1">
            <RemoveButton stateId={stateId} parentStateId={parentStateId} />
          </InputGroup.Text>
        </StyledInputGroup>
      </Col>
    </Row>
  )
}
export default RelationshipRow
