import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'

import config from '../../config/config'
import PrimaryButton from '../../styles/shared/PrimaryButton'

import CreateCollectionButton from './CreateCollectionButton'
import SelectionList from './SelectionList'

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
    keyboard={false}
    animation={false}
    aria-describedby="modalBody"
    aria-labelledby="modalTitle"
    data-testid="switch-to-simple-search-warning-modal"
  >
    <Modal.Dialog className="my-0">
      <Modal.Header closeButton>
        <Modal.Title id="modalTitle">Add to Your Collection</Modal.Title>
      </Modal.Header>
      <Modal.Body id="modalBody">
        <Row>
          <Col xs={12}>
            <p>
              Pick which collection you want to add this record to. By default,
              your default collection will be selected.
            </p>
          </Col>
          <Col xs={12}>
            <SelectionList
              listOfUserCollections={[
                `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
              ]}
            />
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row>
          <Col className="d-flex justify-content-start">
            <CreateCollectionButton additionalClassName="create-a-new-collection" />
          </Col>
          <Col className="d-flex justify-content-end">
            <PrimaryButton onClick={() => onClose()}>Save</PrimaryButton>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal.Dialog>
  </Modal>
)

export default CreateCollectionModal
