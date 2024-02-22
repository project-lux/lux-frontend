import React from 'react'

import { useAppDispatch } from '../../app/hooks'
import { addNewGroupChild } from '../../redux/slices/advancedSearchSlice'
import { addSelectedHelpText } from '../../redux/slices/helpTextSlice'
import StyledAddButton from '../../styles/features/advancedSearch/AddButton'

interface IAddButton {
  stateId: string
  ariaLabel: string
}

/**
 * Button for adding a row to the advanced search form.
 * @param {string} stateId id for the current advanced search state object
 * @param {string} ariaLabel string to be used for aria-label value of the button
 * @returns {JSX.Element}
 */
const AddButton: React.FC<IAddButton> = ({ stateId, ariaLabel }) => {
  const dispatch = useAppDispatch()
  const handleAddRow = (): void => {
    dispatch(addSelectedHelpText({ value: 'fieldSelectRow' }))
    dispatch(addNewGroupChild({ stateId }))
  }

  return (
    <StyledAddButton
      type="button"
      onClick={handleAddRow}
      className="addNewQueryButton"
      aria-label={`add new line to ${ariaLabel} query`}
      data-testid={`${stateId}-add-row-button`}
    >
      Add Row
    </StyledAddButton>
  )
}

export default AddButton
