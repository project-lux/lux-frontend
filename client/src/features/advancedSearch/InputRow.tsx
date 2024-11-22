import React from 'react'
import { Col } from 'react-bootstrap'

import { useAppDispatch } from '../../app/hooks'
import { addFieldSelection } from '../../redux/slices/advancedSearchSlice'
import {
  isBooleanInput,
  isDateInput,
  isRangeInput,
  isRecordTypeInput,
  isTextInput,
} from '../../lib/advancedSearch/advancedSearchParser'
import AlignedDiv from '../../styles/features/advancedSearch/AlignedDiv'
import { scopeToAriaLabel } from '../../config/searchTypes'
import { getParentLabels } from '../../lib/advancedSearch/stateManager'
import Legend from '../../styles/features/advancedSearch/Legend'

import RangeInput from './RangeInput'
import AdvancedSearchDropdown from './Dropdown'
import BooleanInput from './BooleanInput'
import TextInput from './TextInput'
import OptionsButton, { INPUT_ROW_TYPE } from './OptionsButton'
import RemoveButton from './RemoveButton'
import RecordTypeInput from './RecordTypeInput'
import DateInput from './DateInput'

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
}) => {
  const id = `input-row-${stateId}`
  const parentLabels = getParentLabels(scope)
  const labelForAria = parentLabels ? parentLabels[selectedKey] : ''

  const dispatch = useAppDispatch()

  const addOption = (selected: string): void => {
    dispatch(addFieldSelection({ scope, selected, stateId }))
  }

  return (
    <AlignedDiv
      className="mb-3"
      data-testid={`${selectedKey}-${stateId}-input-row`}
    >
      <Col xs={12}>
        <fieldset className="d-flex align-content-start">
          <Legend>input options for {labelForAria}</Legend>
          <label htmlFor={id} hidden>
            {selectedKey}
          </label>
          <AdvancedSearchDropdown
            options={parentLabels}
            handleChange={addOption}
            className="singleFieldSelection"
            dropdownHeaderText="Has single field"
            ariaLabel={`${scopeToAriaLabel[scope]} single field selection`}
            selected={selectedKey}
            id={id}
            scope={scope}
          />
          {isBooleanInput(selectedKey) && (
            <BooleanInput
              key={selectedKey}
              label={`Select yes or no for ${labelForAria}`}
              currentValue={state[selectedKey]}
              field={selectedKey}
              stateId={stateId}
            />
          )}
          {isRangeInput(selectedKey) && (
            <RangeInput
              label="Enter number"
              currentValue={state[selectedKey]}
              field={selectedKey}
              comp={state._comp}
              stateId={stateId}
              ariaLabel={labelForAria}
            />
          )}
          {isRecordTypeInput(selectedKey) && (
            <RecordTypeInput
              label={`Select options for ${labelForAria}`}
              scope={scope}
              currentValue={state[selectedKey]}
              field={selectedKey}
              stateId={stateId}
            />
          )}
          {isDateInput(selectedKey) && (
            <DateInput
              label={`Select options for ${labelForAria}`}
              comp={state._comp}
              currentValue={state[selectedKey]}
              field={selectedKey}
              stateId={stateId}
              ariaLabel={labelForAria}
            />
          )}
          {isTextInput(selectedKey) && (
            <TextInput
              label="Enter a text value"
              currentValue={state[selectedKey]}
              field={selectedKey}
              stateId={stateId}
              scope={scope}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
            />
          )}
          <OptionsButton
            state={state}
            stateId={stateId}
            ariaLabel={labelForAria}
            nestedLevel={nestedLevel}
            rowType={INPUT_ROW_TYPE}
          />
          <RemoveButton stateId={stateId} parentStateId={parentStateId} />
        </fieldset>
      </Col>
    </AlignedDiv>
  )
}

export default InputRow
