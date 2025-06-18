import React from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'

import PrimaryButton from '../../styles/shared/PrimaryButton'

interface IMyCollectionsModal {
  showModal: boolean
  onClose: () => void
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @returns
 */
const CreateCollectionModal: React.FC<IMyCollectionsModal> = ({
  showModal,
  onClose,
}) => (
  <Modal
    show={showModal}
    onHide={() => onClose()}
    backdrop="static"
    size="lg"
    keyboard={false}
    animation={false}
    aria-describedby="modalBody"
    aria-labelledby="modalTitle"
    data-testid="switch-to-simple-search-warning-modal"
  >
    <Modal.Header closeButton>
      <Modal.Title id="modalTitle">Create a New Collection</Modal.Title>
    </Modal.Header>
    <Modal.Body id="modalBody">
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Collection" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Classification (required)</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>Primary Name</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Language of Name (optional)</Form.Label>
            <Form.Select defaultValue="Choose...">
              <option>English</option>
              <option>...</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" id="formGridCheckbox">
          <Form.Check type="checkbox" label="Set as default collection" />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <PrimaryButton type="submit" onClick={() => onClose()}>
        Save
      </PrimaryButton>
    </Modal.Footer>
  </Modal>
)

export default CreateCollectionModal
