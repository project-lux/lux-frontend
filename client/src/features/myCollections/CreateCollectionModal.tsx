import React, { ChangeEvent, useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'

import PrimaryButton from '../../styles/shared/PrimaryButton'
import { useCreateCollectionMutation } from '../../redux/api/mlMyCollectionsApi'

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
  const placeholderName = `Collection ${timestamp}`
  const [name, setName] = useState<string>(placeholderName)
  const [classification, setClassification] = useState<string>('Primary Name')
  const [language, setLanguage] = useState<string>('English')
  const [isDefault, setIsDefault] = useState<boolean>(false)
  const [createCollection] = useCreateCollectionMutation()

  const handleSave = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    createCollection({
      name,
      classification,
      language,
      collectionDefault: isDefault,
    })
      .unwrap()
      .then(() => {
        console.log('made it!')
        // handle functionality for rendering the alert component if success
        onClose()
      })
      .catch(() => {
        console.log('what did you do??')
        // handle functionality for rendering the alert component if error
        onClose()
      })
    onClose()
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
                placeholder={placeholderName}
                value={name}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(e: ChangeEvent<any>) => setName(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Classification (required)</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                value={classification}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setClassification(e.target.value)
                }
                required
              >
                <option>Primary Name</option>
                <option>Secondary Name</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Language of Name (optional)</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                value={language}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setLanguage(e.target.value)
                }
              >
                <option>English</option>
                <option>Spanish</option>
                <option>Latin</option>
                <option>...</option>
              </Form.Select>
            </Form.Group>
          </Row>

          <Form.Group id="formGridCheckbox">
            <Form.Check
              inline
              type="checkbox"
              checked={isDefault}
              onChange={() => setIsDefault(!isDefault)}
              label="Set as default collection"
            />
          </Form.Group>
          <Row>
            <Col className="d-flex justify-content-end">
              <PrimaryButton type="submit">Save</PrimaryButton>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default CreateCollectionModal
