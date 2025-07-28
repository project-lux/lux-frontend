import React, { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { isUndefined } from 'lodash'
import { useDispatch } from 'react-redux'

import DangerButton from '../../styles/shared/DangerButton'
import { useAppSelector } from '../../app/hooks'
import {
  IMyCollectionsResultsState,
  resetState,
} from '../../redux/slices/myCollectionsSlice'
import { useDeleteCollectionMutation } from '../../redux/api/ml_api'
import useAuthentication from '../../lib/hooks/useAuthentication'

import SelectionList from './SelectionList'
import DeleteOption from './DeleteOption'

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
const DeleteCollectionModal: React.FC<IMyCollectionsModal> = ({
  showModal,
  onClose,
}) => {
  useAuthentication()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { search } = useLocation()
  const { tab, subTab } = useParams()
  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids } = currentMyCollectionState

  const [deleteCollection] = useDeleteCollectionMutation()
  // Used to maintain the local state of the checklist for which records a user truly wants to delete
  // This will help maintain the state of selected entities on the results
  const [selectedForDeletion, setSelectedForDeletion] = useState<
    Array<{ uuid: string; isDefaultCollection: boolean }>
  >(uuids.map((uuid) => ({ uuid, isDefaultCollection: false })))

  const handleDelete = (): void => {
    const filteredSelection = selectedForDeletion
      .filter((s) => !s.isDefaultCollection)
      .map((filtered) => filtered.uuid)
    deleteCollection({
      ids: filteredSelection,
    })
      .then(() => {
        onClose()
        dispatch(resetState())
        navigate(
          {
            pathname: `/view/results/${tab}${!isUndefined(subTab) ? `/${subTab}` : ''}`,
            search,
          },
          {
            state: {
              showAlert: true,
              alertMessage: 'Collection(s) deleted succuessfully',
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
            pathname: `/view/results/${tab}${!isUndefined(subTab) ? `/${subTab}` : ''}`,
            search,
          },
          {
            state: {
              showAlert: true,
              alertMessage: 'The record could not be deleted.',
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
              <SelectionList>
                {uuids.map((uuid) => (
                  <DeleteOption
                    record={uuid}
                    selectedRecords={selectedForDeletion}
                    handleSelection={setSelectedForDeletion}
                  />
                ))}
              </SelectionList>
            </Col>
          </Row>
        </Modal.Body>
        {selectedForDeletion.length > 0 && (
          <Modal.Footer className="d-block">
            <Row>
              <Col className="d-flex justify-content-end">
                <DangerButton onClick={() => handleDelete()}>
                  Delete
                </DangerButton>
              </Col>
            </Row>
          </Modal.Footer>
        )}
      </Modal.Dialog>
    </Modal>
  )
}

export default DeleteCollectionModal
