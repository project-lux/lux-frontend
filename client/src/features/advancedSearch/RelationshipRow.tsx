/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { useAppDispatch } from '../../app/hooks'
import { scopeToAriaLabel } from '../../config/searchTypes'
import { getIcon } from '../../lib/advancedSearch/searchHelper'
import {
  getParentLabels,
  getFieldToEntityRelationship,
} from '../../lib/advancedSearch/stateManager'
import { addFieldSelection } from '../../redux/slices/advancedSearchSlice'
import AlignedDiv from '../../styles/features/advancedSearch/AlignedDiv'
import CollapseButton from '../../styles/shared/CollapseButton'
import VerticalLine from '../../styles/features/advancedSearch/VerticalLine'
import { pushClientEvent } from '../../lib/pushClientEvent'

import CollapseContainer from './CollapseContainer'
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
  const [open, setOpen] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const addOption = (selected: string): void => {
    dispatch(addFieldSelection({ scope: parentScope, selected, stateId }))
  }
  const scopeToPassToNestedForm =
    getFieldToEntityRelationship(parentScope, selectedKey) || ''
  const id = `field-dropdown-${stateId}`
  const parentLabels = getParentLabels(parentScope)
  const labelForAria = parentLabels ? parentLabels[selectedKey] : ''
  const imgAlt =
    scopeToPassToNestedForm !== ''
      ? scopeToAriaLabel[scopeToPassToNestedForm]
      : 'nested group'
  return (
    <div
      className="mb-3"
      data-testid={`${selectedKey}-${stateId}-relationship-row`}
    >
      <AlignedDiv>
        <div className="form-group col-11 w-auto">
          <div className="input-group">
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
            <RemoveButton stateId={stateId} parentStateId={parentStateId} />
          </div>
        </div>
      </AlignedDiv>
      <VerticalLine className="pe-2">
        <CollapseButton
          onClick={() => {
            pushClientEvent(
              'Collapse Button',
              open ? 'Open' : 'Close',
              'Advanced Search',
            )
            setOpen(!open)
          }}
          aria-controls="group-collapse-text"
          aria-expanded={open}
          className="collapseNestedAdvancedSearch"
          aria-label={
            open ? `close ${labelForAria} group` : `open ${labelForAria} group`
          }
        >
          {open ? '-' : '+'}
        </CollapseButton>
        <CollapseContainer open={open} id={`relationship-${stateId}`}>
          <Row className="row ps-4">
            <Col xs={12}>
              <fieldset className="d-flex px-0">
                <span className="d-flex">
                  <legend className="flex-shrink-0 w-auto">
                    <img
                      className="scopeIcon"
                      src={getIcon(scopeToPassToNestedForm)}
                      alt={imgAlt}
                      aria-label={`${imgAlt} form options`}
                      height={50}
                      width={50}
                    />
                  </legend>
                  <div className="ms-3 flex-grow-1">
                    <AdvancedSearchForm
                      key={stateId}
                      state={state}
                      parentScope={scopeToPassToNestedForm}
                      parentStateId={stateId}
                      nestedLevel={nestedLevel + 1}
                    />
                  </div>
                </span>
              </fieldset>
            </Col>
          </Row>
        </CollapseContainer>
      </VerticalLine>
    </div>
  )
}
export default RelationshipRow
