import React from 'react'
import { Dropdown } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'

const StyledDropdownToggle = styled(Dropdown.Toggle)`
  background-color: ${theme.color.primary.teal};
  color: ${theme.color.white};
  border-radius: ${theme.border.radius};
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

/**
 * Dropdown to add to a collection or delete
 * @param {() => void} setShowModal function to open the modal
 * @param {string} additionalClassName className for the button
 * @returns {JSX.Element}
 */
const ManageCollectionsButton: React.FC<{
  additionalClassName: string
  setShowAddToCollectionModal: (x: boolean) => void
  setShowDeleteCollectionModal: (x: boolean) => void
}> = ({
  additionalClassName,
  setShowAddToCollectionModal,
  setShowDeleteCollectionModal,
}) => (
  <Dropdown id="add-delete-collection-dropdown">
    <StyledDropdownToggle
      id="add-delete-collection-toggle"
      aria-label=""
      className={additionalClassName}
      data-testid="add-delete-collection-dropdown-toggle"
    >
      Manage Collection(s)
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
        onClick={() => setShowAddToCollectionModal(true)}
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
        onClick={() => setShowDeleteCollectionModal(true)}
      >
        <i className="bi bi-trash3 me-2" />
        Delete Collection(s)
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
)

export default ManageCollectionsButton
