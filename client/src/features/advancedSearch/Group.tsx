/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'

import { useAppDispatch } from '../../app/hooks'
import { conditionals } from '../../config/advancedSearch/conditionals'
import { scopeToAriaLabel } from '../../config/searchTypes'
import { addFieldSelection } from '../../redux/slices/advancedSearchSlice'
import CollapseButton from '../../styles/shared/CollapseButton'
import VerticalLine from '../../styles/features/advancedSearch/VerticalLine'
import { pushClientEvent } from '../../lib/pushClientEvent'
import StyledInputGroup from '../../styles/features/advancedSearch/InputGroup'

import AddButton from './AddButton'
import CollapseContainer from './CollapseContainer'
import AdvancedSearchDropdown from './Dropdown'
import AdvancedSearchForm from './Form'
import OptionsButton, { GROUP_ROW_TYPE } from './OptionsButton'
import RemoveButton from './RemoveButton'

interface IGroup {
  stateId: string
  selectedKey: string
  state: Array<Record<string, any>>
  parentScope: string
  parentStateId: string
  nestedLevel: number
}

/**
 * Contains the functionality and components of a group within the advanced search state.
 * @param {string} stateId id of the current object within the advanced search state
 * @param {string} selectedKey current selected field
 * @param {string} state the current nested state within the advanced search state
 * @param {number} parentScope the scope of the parent object
 * @param {boolean} parentStateId id of the parent object within the advanced search state
 * @param {number} nestedLevel level of depth within the advanced search state
 * @returns {JSX.Element}
 */
const Group: React.FC<IGroup> = ({
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
  const id = `group-dropdown-${stateId}`
  const labelForAria = conditionals[selectedKey]
  const ariaLabelForDropdowns = scopeToAriaLabel[parentScope]

  return (
    <Col className="mb-3" data-testid={`${selectedKey}-${stateId}-group-row`}>
      <FormGroup className="w-auto">
        <StyledInputGroup>
          <span className="w-100 d-flex ps-2">
            <div className="d-flex w-100 py-2">
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
                aria-label={
                  open
                    ? `close ${labelForAria} group`
                    : `open ${labelForAria} group`
                }
                className="collapseNestedAdvancedSearch float-left mx-2"
              >
                {open ? '-' : '+'}
              </CollapseButton>
              <label htmlFor={id} hidden>
                {selectedKey}
              </label>
              <AdvancedSearchDropdown
                options={conditionals}
                handleChange={addOption}
                className="multipleFieldSelection"
                dropdownHeaderText="Have multiple fields"
                ariaLabel={`${ariaLabelForDropdowns} Have multiple fields`}
                selected={selectedKey}
                id={id}
              />
              <p className="d-flex mb-0 justify-content-center align-items-center">
                the following
              </p>
              <OptionsButton
                state={state}
                stateId={stateId}
                ariaLabel={`${ariaLabelForDropdowns} ${labelForAria}`}
                nestedLevel={nestedLevel}
                rowType={GROUP_ROW_TYPE}
              />
            </div>
            <RemoveButton stateId={stateId} parentStateId={parentStateId} />
          </span>
        </StyledInputGroup>
      </FormGroup>
      <VerticalLine className="groupVerticalLine">
        <CollapseContainer open={open} id={`group-${stateId}`}>
          {state.map((obj: Record<string, any>, ind) => (
            <AdvancedSearchForm
              key={obj._stateId}
              state={obj}
              parentScope={parentScope}
              parentStateId={stateId}
              nestedLevel={nestedLevel}
              childInd={ind}
              siblings={state}
            />
          ))}
        </CollapseContainer>
      </VerticalLine>
      <Row className="mt-2" style={{ paddingLeft: '4px' }}>
        <Col xs={12} className="px-0">
          {/* Horizontal line */}
          <div
            style={{
              width: '26px',
              borderBottom: '1px solid #8095E8',
              display: 'inline-block',
            }}
          />
          <AddButton stateId={stateId} ariaLabel={labelForAria} />
        </Col>
      </Row>
    </Col>
  )
}
export default Group
