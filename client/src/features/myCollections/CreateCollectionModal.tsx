import React, { FormEventHandler } from 'react'
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
}) => {
  const date = new Date()
  const month = date.getUTCMonth()
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()
  const time = date.toLocaleTimeString()
  const timestamp = `[${month}/${day}/${year} at ${time}]`

  const handleSave = (
    event: React.FormEvent<HTMLFormElement>,
  ): void => {
    console.log(event)
    onClose()
    // push to ML
  }

  return (
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
        <Form onSubmit={handleSave}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Collection ${timestamp}`}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Classification (required)</Form.Label>
              <Form.Select defaultValue="Choose..." required>
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
            <Form.Check label="Set as default collection" />
          </Form.Group>
          <Row>
            <Col className="d-flex justify-content-end">
              <PrimaryButton type="submit">
                Save
              </PrimaryButton>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCollectionModal
