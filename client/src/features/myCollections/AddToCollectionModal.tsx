import React, { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'

import PrimaryButton from '../../styles/shared/PrimaryButton'
import {
  IMyCollectionsResultsState,
  resetState,
} from '../../redux/slices/myCollectionsSlice'
import { useAppSelector } from '../../app/hooks'
import {
  useAddToCollectionMutation,
  useSearchQuery,
} from '../../redux/api/ml_api'
import IEntity from '../../types/data/IEntity'
import config from '../../config/config'
import { getOrderedItemsIds } from '../../lib/parse/search/searchResultParser'

import CreateCollectionButton from './CreateCollectionButton'
import SelectionList from './SelectionList'
import AddOption from './AddOption'

interface IMyCollectionsModal {
  showModal: boolean
  onSuccess: () => void
  onError: () => void
  onClose: () => void
  showCreateNewModal: (x: boolean) => void
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onSuccess function to call when successful request is made
 * @param {() => void} onError function to call when unsuccessful request is made
 * @param {() => void} onClose function to close the modal
 * @param {(x: boolean) => void} showCreateNewModal function to open the Create New modal
 * @returns
 */
const AddToCollectionModal: React.FC<IMyCollectionsModal> = ({
  showModal,
  onSuccess,
  onError,
  onClose,
  showCreateNewModal,
}) => {
  const { pathname } = useLocation()
  const auth = useAuth()
  const dispatch = useDispatch()
  const [addToCollection] = useAddToCollectionMutation()
  const [selectedCollection, setSelectedCollection] = useState<IEntity | null>(
    null,
  )

  const { data, isSuccess, isError, isLoading } = useSearchQuery({
    q: JSON.stringify({
      _scope: 'set',
      createdBy: { username: auth.user?.profile['cognito:username'] },
    }),
    filterResults: false,
    token: config.currentAccessToken,
    tab: 'collections',
  })

  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids } = currentMyCollectionState

  const handleClickCreateNew = (): void => {
    onClose()
    showCreateNewModal(true)
  }

  const handleAdd = (): void => {
    let recordsToAdd = uuids
    // If the user is not on the results page set the uuids to the current page
    if (!pathname.includes('results')) {
      recordsToAdd = [
        `${config.env.dataApiBaseUrl}${pathname.replace('/view', 'data')}`,
      ]
    }
    addToCollection({
      collectionId: selectedCollection?.id,
      collectionData: selectedCollection,
      recordsToAdd,
    })
      .unwrap()
      .then(() => {
        onClose()
        dispatch(resetState())
        onSuccess()
      })
      .catch(() => {
        onClose()
        dispatch(resetState())
        onError()
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
              {isLoading && <p>Loading...</p>}
              {isError && (
                <strong>
                  An error occurred trying to retrieve the list of available
                  collections.
                </strong>
              )}
              {isSuccess && data && (
                <SelectionList>
                  {getOrderedItemsIds(data).map((uuid) => (
                    <AddOption
                      collection={uuid}
                      selected={selectedCollection}
                      handleSelection={setSelectedCollection}
                    />
                  ))}
                </SelectionList>
              )}
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
              <PrimaryButton onClick={() => handleAdd()}>Save</PrimaryButton>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  )
}

export default AddToCollectionModal
