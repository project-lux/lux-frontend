import React, { useState } from 'react'
import { Col, Modal, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import { isUndefined } from 'lodash'

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
import { getOrderedItemsIds } from '../../lib/parse/search/searchResultParser'
import { getFormattedUuidFromPathname } from '../../lib/myCollections/helper'

import CreateCollectionButton from './CreateCollectionButton'
import SelectionList from './SelectionList'
import AddOption from './AddOption'
import DefaultCollection from './DefaultCollection'

interface IMyCollectionsModal {
  showModal: boolean
  onClose: () => void
  showCreateNewModal: (x: boolean) => void
  userUuid?: string
  addingSingleEntityFromEntityPage?: boolean
}

/**
 * Modal used for alerting a user when they are switching from advanced search to simple search.
 * @param {boolean} showModal sets whether or not the modal is visible on the page
 * @param {() => void} onClose function to close the modal
 * @param {(x: boolean) => void} showCreateNewModal function to open the Create New modal
 * @param {string} userUuid optional; the uuid of the current logged in user
 * @returns
 */
const AddToCollectionModal: React.FC<IMyCollectionsModal> = ({
  showModal,
  onClose,
  showCreateNewModal,
  userUuid,
  addingSingleEntityFromEntityPage = false,
}) => {
  const auth = useAuth()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { tab, subTab } = useParams()
  const dispatch = useDispatch()
  const [addToCollection] = useAddToCollectionMutation()
  const [selectedCollection, setSelectedCollection] = useState<IEntity | null>(
    null,
  )

  const defaultCollection = DefaultCollection(userUuid)

  // Get all of the user's collections
  const { data, isSuccess, isError, isLoading } = useSearchQuery({
    q: JSON.stringify({
      _scope: 'set',
      createdBy: { username: auth.user?.profile['cognito:username'] },
    }),
    filterResults: false,
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
    if (addingSingleEntityFromEntityPage) {
      recordsToAdd = [getFormattedUuidFromPathname(pathname)]
    }
    const pathnameToRedirect =
      tab === undefined
        ? pathname
        : `/view/results/${tab}${!isUndefined(subTab) ? `/${subTab}` : ''}`

    addToCollection({
      collectionId: selectedCollection?.id,
      collectionData: selectedCollection,
      recordsToAdd,
    })
      .unwrap()
      .then(() => {
        onClose()
        dispatch(resetState())
        navigate(
          {
            pathname: pathnameToRedirect,
            search,
          },
          {
            state: {
              showAlert: true,
              alertMessage: 'The selected records were saved!',
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
            pathname: pathnameToRedirect,
            search,
          },
          {
            state: {
              showAlert: true,
              alertMessage: 'The selected records could not be saved.',
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
      data-testid="add-to-collection-modal"
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
                  {getOrderedItemsIds(data).map((uuid) => {
                    return (
                      <AddOption
                        collection={uuid}
                        isDefaultCollection={uuid === defaultCollection}
                        selected={selectedCollection}
                        handleSelection={setSelectedCollection}
                      />
                    )
                  })}
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
