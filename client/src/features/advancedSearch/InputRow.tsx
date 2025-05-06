import React from 'react'
import { Row, Col } from 'react-bootstrap'

import StyledInputGroup from '../../styles/features/advancedSearch/InputGroup'

import RemoveButton from './RemoveButton'
import InputFieldSet from './InputFieldset'

interface IFieldSelectRow {
  stateId: string
  scope: string
  selectedKey: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: Record<string, any>
  parentStateId: string
  nestedLevel: number
}

/**
 * Contains the functionality and components of a nested relationship within the advanced search state.
 * @param {string} stateId id of the current object within the advanced search state
 * @param {string} scope scope of the input
 * @param {string} selectedKey current selected field
 * @param {string} state the current nested state within the advanced search state
 * @param {boolean} parentStateId id of the parent object within the advanced search state
 * @param {number} nestedLevel level of depth within the advanced search state
 * @returns {JSX.Element}
 */
const InputRow: React.FC<IFieldSelectRow> = ({
  stateId,
  scope,
  selectedKey,
  state,
  parentStateId,
  nestedLevel,
}) => (
  <Row>
    <Col xs={12}>
      <StyledInputGroup
        className="px-0 w-100 bg-white advancedSearchInputRow"
        data-testid="advanced-search-input-row"
      >
        <span className="w-100 d-flex ps-2">
          <InputFieldSet
            stateId={stateId}
            scope={scope}
            selectedKey={selectedKey}
            state={state}
            parentStateId={stateId}
            nestedLevel={nestedLevel}
            className="py-2"
          />
          <RemoveButton stateId={stateId} parentStateId={parentStateId} />
        </span>
      </StyledInputGroup>
    </Col>
  </Row>
)

export default InputRow
