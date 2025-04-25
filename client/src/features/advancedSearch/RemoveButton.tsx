import React, { MouseEvent } from 'react'
import { Button, InputGroup } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import { remove } from '../../redux/slices/advancedSearchSlice'
import {
  addHoverHelpText,
  resetHoverHelpText,
} from '../../redux/slices/helpTextSlice'
import theme from '../../styles/theme'

const StyledButton = styled(Button)`
  padding: 0;
  border: none;
  background-color: ${theme.color.white};
  color: ${theme.color.button};

  &:hover {
    background-color: ${theme.color.white};
    color: ${theme.color.button};
  }

  &:active {
    background-color: ${theme.color.white};
    color: ${theme.color.button};
  }

  &:focus {
    background-color: ${theme.color.white};
    color: ${theme.color.button};
  }
`

interface IRemoveButton {
  stateId: string
  parentStateId: string
  childInd?: number | undefined
}

let timeout: NodeJS.Timeout

/**
 * Button to remove a row from the advanced search state.
 * @param {string} stateId id of the parent object within the advanced search state
 * @param {string} parentStateId id of the parent object within the advanced search state
 * @returns {JSX.Element}
 */
const RemoveButton: React.FC<IRemoveButton> = ({
  stateId,
  parentStateId,
  childInd = undefined,
}) => {
  const dispatch = useAppDispatch()

  const removeOption = (): void => {
    dispatch(remove({ stateId, parentStateId }))
  }

  const setValues = (value: string): void => {
    dispatch(addHoverHelpText({ value }))
  }

  const handleOnMouseEnter = (
    e: MouseEvent<HTMLButtonElement>,
    value: string,
  ): void => {
    e.preventDefault()
    clearTimeout(timeout)
    timeout = setTimeout(() => setValues(value), 1000)
  }

  const handleOnMouseLeave = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    clearTimeout(timeout)
    timeout = setTimeout(() => dispatch(resetHoverHelpText()), 1000)
  }

  return (
    <InputGroup.Text className="removeButtonInputGroup">
      <StyledButton
        id={`remove-${stateId}`}
        aria-label="remove row"
        data-testid={`${stateId}-${parentStateId}-remove-row-button${
          childInd ? `-${childInd}` : ''
        }`}
        onClick={() => removeOption()}
        onMouseEnter={(e: MouseEvent<HTMLButtonElement>) =>
          handleOnMouseEnter(e, 'remove')
        }
        onMouseLeave={(e: MouseEvent<HTMLButtonElement>) =>
          handleOnMouseLeave(e)
        }
      >
        <i className="bi bi-trash3 fs-4" />
      </StyledButton>
    </InputGroup.Text>
  )
}

export default RemoveButton
