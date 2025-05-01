import React from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'

import { useAppDispatch } from '../../app/hooks'
import { scopeToAriaLabel } from '../../config/searchTypes'
import {
  getParentLabels,
  getFieldToEntityRelationship,
} from '../../lib/advancedSearch/stateManager'
import {
  IAdvancedSearchState,
  addFieldSelection,
} from '../../redux/slices/advancedSearchSlice'
import StyledInputGroup from '../../styles/features/advancedSearch/InputGroup'
import {
  containsInput,
  getProperty,
} from '../../lib/advancedSearch/advancedSearchParser'

import AdvancedSearchDropdown from './Dropdown'
import AdvancedSearchForm from './Form'
import OptionsButton, { RELATIONSHIP_ROW_TYPE } from './OptionsButton'
import RemoveButton from './RemoveButton'
import InputFieldSet from './InputFieldset'

interface IRelationshipRow {
  stateId: string
  selectedKey: string
  state: IAdvancedSearchState
  parentScope: string
  parentStateId: string
  nestedLevel: number
}

/**
 * Contains the functionality and components of a nested relationship within the advanced search state.
 * @param {string} stateId id of the parent object within the advanced search state
 * @param {string} selectedKey current selected field
 * @param {IAdvancedSearchState} state the current nested state within the advanced search state
 * @param {string} parentScope the scope of the parent object
 * @param {string} parentStateId id of the parent object within the advanced search state
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
  const hasNestedInputFields = containsInput(Object.keys(state))
  const legendText =
    scopeToPassToNestedForm !== ''
      ? `${scopeToAriaLabel[scopeToPassToNestedForm]} that`
      : 'that'

  return (
    <Row>
      <FormGroup className="col-12">
        <StyledInputGroup
          className="jusify-content-between flex-nowrap mb-3 bg-white"
          data-testid={`${selectedKey}-${stateId}-relationship-row`}
        >
          <span className="w-100 d-flex ps-2">
            <fieldset className="d-flex py-2 align-content-start w-100">
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
              {hasNestedInputFields && (
                <React.Fragment>
                  <p className="d-flex text-nowrap w-auto mb-0 me-2 justify-content-center align-items-center">
                    {legendText}
                  </p>
                  <InputFieldSet
                    stateId={state._stateId as string}
                    scope={parentScope}
                    selectedKey={getProperty(state)}
                    state={state}
                    parentStateId={stateId}
                    nestedLevel={nestedLevel + 1}
                  />
                </React.Fragment>
              )}
            </fieldset>
            <RemoveButton stateId={stateId} parentStateId={parentStateId} />
          </span>
        </StyledInputGroup>
      </FormGroup>
      {!hasNestedInputFields && (
        <Col xs={12} style={{ paddingLeft: '3rem' }} className="nestedCol">
          <AdvancedSearchForm
            key={stateId}
            state={state}
            parentScope={scopeToPassToNestedForm}
            parentStateId={stateId}
            nestedLevel={nestedLevel + 1}
          />
        </Col>
      )}
    </Row>
  )
}
export default RelationshipRow
