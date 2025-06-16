import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'

const StyledDropdownToggle = styled(Dropdown.Toggle)`
  background-color: ${theme.color.primary.teal};
  color: ${theme.color.white};
  border-radius: 5px;
  border-color: ${theme.color.primary.teal};
  font-size: 16px;
  font-weight: ${theme.font.weight.bold};
  text-decoration: none;

  &:hover,
  &:focus,
  &.btn:active {
    background-color: ${theme.color.primary.teal};
    border-color: ${theme.color.primary.teal};
    color: ${theme.color.white};
  }
`

const UpdateCollectionsButton: React.FC<{
  width: number
}> = ({ width }) => {
  const className = width < theme.breakpoints.sm ? 'w-100 me-0' : 'me-2'

  return (
    <Dropdown id="add-delete-collection-dropdown">
      <StyledDropdownToggle
        id="add-delete-collection-toggle"
        aria-label=""
        className={className}
        data-testid="add-delete-collection-dropdown-toggle"
      >
        Manage Collection
      </StyledDropdownToggle>

      <Dropdown.Menu
        data-testid="add-delete-collection-menu"
        id="add-delete-collection-menu"
      >
        <Dropdown.Item
          as="button"
          eventKey="add"
          id="add-to-collection-dropdown-item"
          aria-label="Add to Collections"
          data-testid="add-to-collection-dropdown-item"
          onClick={() => null}
        >
          <i className="bi bi-folder-plus me-2" />
          Add to Collection(s)
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          eventKey="delete"
          id="delete-collection-dropdown-item"
          aria-label="Delete Collections"
          data-testid="delete-collection-dropdown-item"
          onClick={() => null}
        >
          <i className="bi bi-trash3 me-2" />
          Delete Collection(s)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default UpdateCollectionsButton
