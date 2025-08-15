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
import DefaultCollection from './DefaultCollection'

interface IMyCollectionsModal {
  showModal: boolean
  onClose: () => void
  userUuid?: string
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @param {string} userUuid optional; the uuid of the current logged in user
 * @returns
 */
const DeleteCollectionModal: React.FC<IMyCollectionsModal> = ({
  showModal,
  onClose,
  userUuid,
}) => {
  const auth = useAuthentication()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { tab, subTab } = useParams()

  const defaultCollection = DefaultCollection(userUuid)

  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids } = currentMyCollectionState
  // Used to set the intial state of collections to delete
  const defaultUuidsWithDefaultCollection = uuids.map((uuid) => ({
    uuid,
    isDefaultCollection: uuid === defaultCollection,
  }))

  const [deleteCollection] = useDeleteCollectionMutation()
  // Used to maintain the local state of the checklist for which records a user truly wants to delete
  // This will help maintain the state of selected entities on the results
  const [selectedForDeletion, setSelectedForDeletion] = useState<
    Array<{ uuid: string; isDefaultCollection: boolean }>
  >(defaultUuidsWithDefaultCollection)

  const handleDelete = (): void => {
    let pathnameToRedirectTo = `/view/results/${tab}${!isUndefined(subTab) ? `/${subTab}` : ''}`
    let searchToRedirectTo = search
    // if the user is deleting a collection from an entity page
    if (!pathname.includes('results')) {
      pathnameToRedirectTo = `/view/results/collections/my-collections`
      searchToRedirectTo = `?q=${JSON.stringify({ _scope: 'set', createdBy: { username: auth.user?.profile['cognito:username'] } })}&filterResults=false`
    }
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
            pathname: pathnameToRedirectTo,
            search: searchToRedirectTo,
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
            pathname: pathnameToRedirectTo,
            search: searchToRedirectTo,
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
      data-testid="delete-collection-modal"
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
                {defaultUuidsWithDefaultCollection.map((collection) => (
                  <DeleteOption
                    record={collection.uuid}
                    isDefaultCollection={collection.isDefaultCollection}
                    selectedRecords={selectedForDeletion}
                    handleSelection={setSelectedForDeletion}
                  />
                ))}
              </SelectionList>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-block">
          <Row>
            <Col className="d-flex justify-content-end">
              <DangerButton
                onClick={() => handleDelete()}
                disabled={
                  selectedForDeletion.length === 0 ||
                  (selectedForDeletion.length === 1 &&
                    selectedForDeletion[0].isDefaultCollection)
                }
              >
                Delete
              </DangerButton>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default DeleteCollectionModal
