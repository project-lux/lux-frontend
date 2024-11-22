/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Dropdown } from 'react-bootstrap'

import { useAppDispatch } from '../../app/hooks'
import { addSelectedHelpText } from '../../redux/slices/helpTextSlice'
import StyledDropdown from '../../styles/shared/Dropdown'

import DropdownCheckboxList from './DropdownCheckBoxList'

const RELATIONSHIP_ROW_TYPE = 'relationship'
const INPUT_ROW_TYPE = 'input'
const GROUP_ROW_TYPE = 'group'
export { RELATIONSHIP_ROW_TYPE, INPUT_ROW_TYPE, GROUP_ROW_TYPE }

interface IFieldSelectRow {
  state: Record<string, any>
  stateId: string
  ariaLabel: string
  nestedLevel: number
  rowType: string
}

/**
 * Dropdown button that displays options for the current selected field.
 * @param {Record<string, any>} state the current nested state within the advanced search state
 * @param {string} stateId id of the current object within the advanced search state
 * @param {string} ariaLabel label for aria-label for the Dropdown.Toggle
 * @param {number} nestedLevel level of depth within the advanced search state
 * @param {string} rowType type to determine if the dropdown options are rendered
 * @returns {JSX.Element}
 */
const OptionsButton: React.FC<IFieldSelectRow> = ({
  state,
  stateId,
  ariaLabel,
  nestedLevel,
  rowType,
}) => {
  const dispatch = useAppDispatch()

  const setHelpText = (): void => {
    dispatch(addSelectedHelpText({ value: 'options' }))
  }
  /* until a change is made related to ML#916, search options will not work as expected unless the user is searching using Anywhere or Name at the top level of the search. nestedLevel = 0  and  rowType = INPUT_ROW_TYPE help us disable search options where they won't work */
  if (
    state &&
    state._options &&
    nestedLevel === 0 &&
    rowType === INPUT_ROW_TYPE
  ) {
    return (
      <StyledDropdown onClick={setHelpText}>
        <Dropdown.Toggle
          id={`gear-toggle-${stateId}`}
          data-testid={`gear-toggle-${stateId}`}
          className="gearOptions me-2"
          aria-label={`${ariaLabel} options`}
        >
          <i className="bi bi-gear me-2" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            stateId={stateId}
            state={state}
            as={DropdownCheckboxList}
          />
        </Dropdown.Menu>
      </StyledDropdown>
    )
  }

  return null
}

export default OptionsButton
