import React from 'react'
import { Dropdown } from 'react-bootstrap'

import StyledDropdown from '../../styles/shared/Dropdown'

interface IProps {
  handleOptionSelection: (x: string) => void
}

const EditDropdown: React.FC<IProps> = ({ handleOptionSelection }) => (
  <StyledDropdown
    onSelect={(e) => handleOptionSelection(e as string)}
    className="editMyCollectionDropdown"
    data-testid="edit-my-collection-dropdown"
    style={{ height: 'fit-content' }}
  >
    <Dropdown.Toggle
      id="edit-my-collection-dropdown-button"
      className="h-100"
      data-testid="edit-my-collection-dropdown-button"
    >
      <i className="bi bi-pencil me-2" />
      Edit
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item
        as="button"
        eventKey="name"
        aria-label="Edit Name"
        data-testid="edit-my-collection-name-button"
      >
        <i className="bi bi-pencil me-2" />
        Edit Names
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        eventKey="image"
        aria-label="Set Collection Image"
        data-testid="edit-my-collection-image-button"
        disabled
      >
        <i className="bi bi-image me-2" />
        Set Collection Image (TBD)
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        eventKey="default"
        aria-label="Set as Default"
        data-testid="edit-my-collection-default-button"
        disabled
      >
        <i className="bi bi-gear me-2" />
        Set as Default
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        eventKey="classification"
        aria-label="Edit Collection Classification"
        data-testid="edit-my-collection-classification-button"
      >
        <i className="bi bi-tag me-2" />
        Edit Collection Classification
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        eventKey="identifiers"
        aria-label="Edit Identifiers"
        data-testid="edit-my-collection-identifiers-button"
      >
        <i className="bi bi-hash me-2" />
        Edit Identifiers
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        eventKey="notes"
        aria-label="Edit Notes"
        data-testid="edit-my-collection-notes-button"
      >
        <i className="bi bi-card-heading me-2" />
        Edit Notes
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        eventKey="links"
        aria-label="Edit Webpage Links"
        data-testid="edit-my-collection-webpages-button"
        className="border-bottom"
      >
        <i className="bi bi-link-45deg me-2" />
        Edit Webpage Links
      </Dropdown.Item>
      <Dropdown.Item
        as="button"
        eventKey="deleteCollection"
        aria-label="Delete Collection"
        data-testid="delete-my-collection-button"
      >
        <i className="bi bi-trash3 me-2" />
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  </StyledDropdown>
)

export default EditDropdown
