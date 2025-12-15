import React from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { useAuth } from 'react-oidc-context'

import DangerButton from '../../styles/shared/DangerButton'
import { useAppSelector } from '../../app/hooks'
import {
  IMyCollectionsResultsState,
  resetState,
} from '../../redux/slices/myCollectionsSlice'
import { useDeleteRecordsFromCollectionMutation } from '../../redux/api/ml_api'
import IMyCollection from '../../types/data/IMyCollection'

interface IDeleteRecordsModal {
  showModal: boolean
  onClose: () => void
  collectionId: string
  collectionObject: IMyCollection
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @returns
 */
const DeleteRecordsModal: React.FC<IDeleteRecordsModal> = ({
  showModal,
  onClose,
  collectionId,
  collectionObject,
}) => {
  // const auth = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids } = currentMyCollectionState

  const [deleteRecordsFromCollection] = useDeleteRecordsFromCollectionMutation()

  const handleDelete = (): void => {
    deleteRecordsFromCollection({
      collectionId,
      collectionData: collectionObject,
      recordsToDelete: uuids,
    })
      .then(() => {
        onClose()
        dispatch(resetState())
        navigate(
          {
            pathname,
          },
          {
            state: {
              showAlert: true,
              alertMessage: 'Selected records(s) removed succuessfully!',
              alertVariant: 'primary',
            },
          },
        )
      })
      .catch(() => {
        onClose()
        dispatch(resetState())
        navigate(
          {
            pathname,
          },
          {
            state: {
              showAlert: true,
              alertMessage:
                'The record(s) could not be deleted from the collection.',
              alertVariant: 'danger',
            },
          },
        )
      })
  }

  return (
    <Modal
      show={showModal}
      onHide={() => onClose()}
      backdrop="static"
      keyboard={false}
      animation={false}
      aria-describedby="modalBody"
      aria-labelledby="modalTitle"
      data-testid="delete-from-collection-modal"
    >
      <Modal.Dialog className="my-0">
        <Modal.Header closeButton>
          <Modal.Title id="modalTitle">Remove Selected Record(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body id="modalBody">
          <Row>
            <Col xs={12}>
              <p>
                <strong>Warning:</strong> The selected record(s) are being
                removed from this collection.
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-block">
          <Row>
            <Col className="d-flex justify-content-end">
              <DangerButton
                onClick={() => handleDelete()}
                data-testid="remove-from-my-collection-button"
              >
                Remove
              </DangerButton>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default DeleteRecordsModal
