import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'

import DangerButton from '../../styles/shared/DangerButton'
import { useAppSelector } from '../../app/hooks'
import { IMyCollectionsResultsState } from '../../redux/slices/myCollectionsSlice'

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
const DeleteModal: React.FC<IMyCollectionsModal> = ({ showModal, onClose }) => {
  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids } = currentMyCollectionState

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
          <Modal.Title id="modalTitle">
            Delete Selected Collection(s)
          </Modal.Title>
        </Modal.Header>
        <Modal.Body id="modalBody">
          <Row>
            <Col xs={12}>
              <p>
                <strong>Important: </strong>Deleted collections are permanently
                removed and cannot be restored.
              </p>
            </Col>
            <Col xs={12}>
              <SelectionList listOfRecords={uuids} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-block">
          <Row>
            <Col className="d-flex justify-content-end">
              <DangerButton onClick={() => onClose()}>Delete</DangerButton>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default DeleteModal
