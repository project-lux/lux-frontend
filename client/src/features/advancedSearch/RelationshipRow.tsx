import React from 'react'
import { Col, FormGroup, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import { scopeToAriaLabel } from '../../config/searchTypes'
import {
  getParentLabels,
  getFieldToEntityRelationship,
  getSingleFieldDropdownOptions,
} from '../../lib/advancedSearch/stateManager'
import {
  IAdvancedSearchState,
  addFieldSelection,
} from '../../redux/slices/advancedSearchSlice'
import StyledInputGroupDiv from '../../styles/features/advancedSearch/InputGroup'
import {
  containsInput,
  getProperty,
} from '../../lib/advancedSearch/advancedSearchParser'
// import theme from '../../styles/theme'
import theme from '../../styles/theme'
import { conditionalsLabeling } from '../../config/advancedSearch/conditionals'

import AdvancedSearchDropdown from './Dropdown'
import AdvancedSearchForm from './Form'
import OptionsButton, { RELATIONSHIP_ROW_TYPE } from './OptionsButton'
import RemoveButton from './RemoveButton'
import InputFieldSet from './InputFieldset'

// const StyledBorderDiv = styled.div`
//   position: absolute;
//   border-left: 1px solid ${theme.color.secondary.cornflowerBlue};
//   height: 100%;
//   left: 26px;
//   top: 55px;
//   padding-left: 2rem;
// `

interface IProps {
  display: string
  content: string
}

const StyledFormGroup = styled(FormGroup)<IProps>`
  &:after {
    border: 0.5px solid #8095e8;
    left: 0;
    right: 0;
    width: 0;
    height: 100%;
    min-height: 100px;
    display: ${(props) => props.display};
    content: '';
    margin-left: 38px;
    position: absolute;
  }

  &:before {
    border: 0.5px solid #8095e8;
    content: '${(props) => props.content}';
    display: ${(props) => props.display};
    top: 60%;
    position: absolute;
    background: ${theme.color.lightBabyBlue};
    color: ${theme.color.primary.blue};
    position: absolute;
    z-index: 1;
    margin: 0 auto;
    border-radius: 5px;
    font-weight: 400;
    border: none;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  &:last-child:before {
    display: none;
  }
`

interface IRelationshipRow {
  stateId: string
  selectedKey: string
  state: IAdvancedSearchState
  parentScope: string
  parentStateId: string
  nestedLevel: number
  bgColor: 'bg-light' | 'bg-white'
  hasYoungerSiblings?: boolean
  parentGroupName?: string
}

/**
 * Contains the functionality and components of a nested relationship within the advanced search state.
 * @param {string} stateId id of the parent object within the advanced search state
 * @param {string} selectedKey current selected field
 * @param {IAdvancedSearchState} state the current nested state within the advanced search state
 * @param {string} parentScope the scope of the parent object
 * @param {string} parentStateId id of the parent object within the advanced search state
 * @param {number} nestedLevel level of depth within the advanced search state
 * @param {string} bgColor the background color of the child container
 * @param {boolean} hasYoungerSiblings the background color of the child container
 * @returns {JSX.Element}
 */
const RelationshipRow: React.FC<IRelationshipRow> = ({
  state,
  stateId,
  selectedKey,
  parentScope,
  parentStateId,
  nestedLevel,
  bgColor,
  hasYoungerSiblings = false,
  parentGroupName = undefined,
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
  const hasChildInputField = containsInput(Object.keys(state))
  const legendText =
    scopeToPassToNestedForm !== ''
      ? `${scopeToAriaLabel[scopeToPassToNestedForm]} that`
      : 'that'

  return (
    <Row className="relationship-row">
      <StyledFormGroup
        display={hasYoungerSiblings ? 'block' : 'none'}
        content={
          parentGroupName ? conditionalsLabeling[parentGroupName] : 'And'
        }
        className={`col-12 ${!hasChildInputField ? 'mb-3' : ''}`}
      >
        <StyledInputGroupDiv
          className="jusify-content-between flex-nowrap bg-white"
          data-testid={`${selectedKey}-${stateId}-relationship-row`}
        >
          <span className="w-100 d-flex ps-2">
            <fieldset className="d-flex py-2 align-content-start w-100">
              <label htmlFor={id} hidden>
                {selectedKey}
              </label>
              <AdvancedSearchDropdown
                dropdownType="singleFieldSelection"
                options={getSingleFieldDropdownOptions(parentScope)}
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
              {hasChildInputField && (
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
        </StyledInputGroupDiv>
      </StyledFormGroup>
      {!hasChildInputField && (
        <React.Fragment>
          <Col xs={12} style={{ paddingLeft: '4rem' }} className="mb-3">
            <AdvancedSearchForm
              key={stateId}
              state={state}
              parentScope={scopeToPassToNestedForm}
              parentStateId={stateId}
              nestedLevel={nestedLevel + 1}
              parentBgColor={bgColor}
            />
          </Col>
          {/* <StyledBorderDiv /> */}
        </React.Fragment>
      )}
    </Row>
  )
}
export default RelationshipRow
