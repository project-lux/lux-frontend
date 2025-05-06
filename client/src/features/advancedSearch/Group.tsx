/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import { conditionals } from '../../config/advancedSearch/conditionals'
import { scopeToAriaLabel } from '../../config/searchTypes'
import {
  IAdvancedSearchState,
  addFieldSelection,
} from '../../redux/slices/advancedSearchSlice'
import CollapseButton from '../../styles/shared/CollapseButton'
import { pushClientEvent } from '../../lib/pushClientEvent'
import StyledInputGroup from '../../styles/features/advancedSearch/InputGroup'
import theme from '../../styles/theme'
import StyledConnectedDiv from '../../styles/features/advancedSearch/ConnectedDiv'
import {
  getProperty,
  isEmptyObj,
} from '../../lib/advancedSearch/advancedSearchParser'

import AddButton from './AddButton'
import CollapseContainer from './CollapseContainer'
import AdvancedSearchDropdown from './Dropdown'
import AdvancedSearchForm from './Form'
import OptionsButton, { GROUP_ROW_TYPE } from './OptionsButton'
import RemoveButton from './RemoveButton'
// import Connector from './Connector'

interface IProps {
  transformX?: string
  transformY?: string
}

const StyledSpan = styled.span<IProps>`
  margin: 0 auto;
  text-align: center;
  width: auto;
  height: auto;
  background: ${theme.color.lightBabyBlue};
  color: ${theme.color.primary.blue};
  display: inline-block;
  position: absolute;
  z-index: 2;
  left: 10px;
  border-radius: 5px;
  font-weight: 400;
  transform: translate(
    ${(props) => props.transformX || '-5px'},
    ${(props) => props.transformY || '10px'}
  );
`

const isChildAGroup = (obj: IAdvancedSearchState): boolean => {
  if (isEmptyObj(Object.keys(obj))) {
    return false
  }
  const property = getProperty(obj)
  const childObj = obj[property] as IAdvancedSearchState
  const childProperty = getProperty(childObj)
  return Array.isArray(childObj[childProperty])
}

interface IGroup {
  stateId: string
  selectedKey: string
  state: Array<Record<string, any>>
  parentScope: string
  parentStateId: string
  nestedLevel: number
  bgColor: 'bg-light' | 'bg-white'
}

/**
 * Contains the functionality and components of a group within the advanced search state.
 * @param {string} stateId id of the current object within the advanced search state
 * @param {string} selectedKey current selected field
 * @param {string} state the current nested state within the advanced search state
 * @param {number} parentScope the scope of the parent object
 * @param {boolean} parentStateId id of the parent object within the advanced search state
 * @param {number} nestedLevel level of depth within the advanced search state
 * @param {string} bgColor the background color of the child container
 * @returns {JSX.Element}
 */
const Group: React.FC<IGroup> = ({
  state,
  stateId,
  selectedKey,
  parentScope,
  parentStateId,
  nestedLevel,
  bgColor,
}) => {
  const [open, setOpen] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const addOption = (selected: string): void => {
    dispatch(
      addFieldSelection({
        scope: parentScope,
        selected,
        stateId,
        parentBgColor: bgColor,
      }),
    )
  }

  const id = `group-dropdown-${stateId}`
  const labelForAria = conditionals[selectedKey]
  const ariaLabelForDropdowns = scopeToAriaLabel[parentScope]

  return (
    <div className={`groupContainer ${bgColor} p-3 border rounded-2`}>
      <FormGroup>
        <StyledInputGroup
          className="bg-white advancedSearchGroupRow"
          data-testid="advanced-search-group-row"
        >
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
                className="collapseNestedAdvancedSearch float-left ms-2 me-3"
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
              <p className="d-flex mb-0 text-nowrap justify-content-center align-items-center">
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
      <Row className={`ps-4 ${open ? '' : 'pb-3'}`}>
        <Col xs={12}>
          <CollapseContainer open={open} id={`group-${stateId}`}>
            <div className="borderLeft" />
            <Row className="pe-2">
              <Col xs={12} className="px-0">
                {state.map((obj: Record<string, any>, ind) => {
                  const isLastObj = ind === state.length - 1
                  const hasGroupChildren = isChildAGroup(obj)
                  // A relationship row can have children
                  // If the children are groups, the connnecting line is displayed by the relationship row
                  return (
                    <StyledConnectedDiv
                      display={hasGroupChildren ? 'none' : 'block'}
                    >
                      <div
                        className={`ms-3 me-1 nestedAdvancedSearchDivFromGroup ${isLastObj ? 'pb-3' : ''}`}
                      >
                        <AdvancedSearchForm
                          key={obj._stateId}
                          state={obj}
                          parentScope={parentScope}
                          parentStateId={stateId}
                          nestedLevel={nestedLevel}
                          childInd={ind}
                          siblings={state}
                          parentBgColor={bgColor}
                          hasYoungerSiblings={!isLastObj}
                        />
                      </div>
                      {/* render if it is not the last element */}
                      {!isLastObj && (
                        <StyledSpan
                          className="px-2"
                          transformX={selectedKey === 'OR' ? '10px' : '5px'}
                          transformY={hasGroupChildren ? '-500%' : '10px'}
                        >
                          {selectedKey.charAt(0).toUpperCase() +
                            String(selectedKey).slice(1).toLowerCase()}
                        </StyledSpan>
                      )}
                    </StyledConnectedDiv>
                  )
                })}
              </Col>
              <Col xs={12} className="px-0">
                <AddButton stateId={stateId} ariaLabel={labelForAria} />
              </Col>
            </Row>
          </CollapseContainer>
        </Col>
      </Row>
    </div>
  )
}
export default Group
