import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'

import config from '../../config/config'
import PrimaryButton from '../../styles/shared/PrimaryButton'

import CreateCollectionButton from './CreateCollectionButton'
import SelectionList from './SelectionList'

interface IMyCollectionsModal {
  showModal: boolean
  onClose: () => void
  showCreateNewModal: (x: boolean) => void
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @param {(x: boolean) => void} showCreateNewModal function to open the Create New modal
 * @returns
 */
const AddToCollectionModal: React.FC<IMyCollectionsModal> = ({
  showModal,
  onClose,
  showCreateNewModal,
}) => {
  const handleClickCreateNew = (): void => {
    onClose()
    showCreateNewModal(true)
  }

  return (
    <Modal
      show={showModal}
      onHide={() => onClose()}
      size="lg"
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
                Pick which collection you want to add this record to. By
                default, your default collection will be selected.
              </p>
            </Col>
            <Col xs={12}>
              <SelectionList
                listOfRecords={[
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                  `${config.env.dataApiBaseUrl}data/set/a082a270-b120-447a-93ae-f1e2f299006e`,
                ]}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-block">
          <Row>
            <Col className="d-flex justify-content-start">
              <CreateCollectionButton
                additionalClassName="create-a-new-collection"
                setShowModal={handleClickCreateNew}
              />
            </Col>
            <Col className="d-flex justify-content-end">
              <PrimaryButton onClick={() => onClose()}>Save</PrimaryButton>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default AddToCollectionModal
