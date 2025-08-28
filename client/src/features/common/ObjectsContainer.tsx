/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import StyledObjectsContainerLinkRow from '../../styles/features/common/ObjectsContainerLinkRow'
import { formatHalLink } from '../../lib/parse/search/queryParser'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import {
  getEstimates,
  getOrderedItemsIds,
} from '../../lib/parse/search/searchResultParser'
import { searchScope } from '../../config/searchTypes'
import { pushClientEvent } from '../../lib/pushClientEvent'
import config from '../../config/config'
import StyledHr from '../../styles/shared/Hr'
import {
  IMyCollectionsResultsState,
  resetState,
} from '../../redux/slices/myCollectionsSlice'
import { useAppSelector } from '../../app/hooks'
import AddToCollectionButton from '../myCollections/AddToCollectionButton'
import useAuthentication from '../../lib/hooks/useAuthentication'
import CreateCollectionModal from '../myCollections/CreateCollectionModal'
import AddToCollectionModal from '../myCollections/AddToCollectionModal'

import ResultSnippet from './ResultSnippet'
import SelectAll from './SelectAll'

interface IObjectsBy {
  uri: string // URI which is the argument of the search tag
  tab: string // scope - "objects", "works", etc
  title: string // the title of the current tab
  user?: string
}

export const resultsData = (
  orderedItems: Array<IOrderedItems>,
  tab: string,
  title: string,
): any =>
  orderedItems.slice(0, 5).map((item) => {
    const { id } = item
    return (
      <Row key={id}>
        <Col xs={12}>{ResultSnippet(id, tab, title)}</Col>
      </Row>
    )
  })

/**
 * Returns list of results snippets showing related objects or works
 * @param {string} uri the HAL link to retrieve the related data
 * @param {string} tab the results tab to redirect to when a user selects Show all X results
 * @returns {JSX.Element}
 */
const ObjectsContainer: React.FC<IObjectsBy> = ({ uri, tab, title, user }) => {
  const dispatch = useDispatch()
  const auth = useAuthentication()
  const [showAddToCollectionModal, setShowAddToCollectionModal] =
    useState<boolean>(false)
  const [showCreateCollectionModal, setShowCreateCollectionModal] =
    useState<boolean>(false)
  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids, scopeOfSelections } = currentMyCollectionState
  const isSelectAllChecked = uuids.length > 0 && scopeOfSelections === title

  // get relationship data
  const { data, isSuccess, isLoading, isError } = useGetSearchRelationshipQuery(
    {
      uri,
    },
  )

  if (isError && !config.env.luxEnv.includes('production')) {
    return <p>An error occurred fetching the data.</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  // event to handle the closing of the add to collection modal
  const handleCloseAddModal = (): void => {
    pushClientEvent('My Collections', 'Closed', 'Add to My Collections modal')
    dispatch(resetState())
    setShowAddToCollectionModal(false)
  }

  // event to handle the closing of the create a collection modal
  const handleCloseCreateCollectionModal = (): void => {
    pushClientEvent('My Collections', 'Closed', 'Create Collections modal')
    setShowCreateCollectionModal(false)
    dispatch(resetState())
  }

  if (isSuccess && data) {
    const { orderedItems } = data as ISearchResults
    const resultsUuids = getOrderedItemsIds(data).slice(0, 5)
    const estimate = getEstimates(data)

    if (estimate > 0) {
      return (
        <React.Fragment>
          {config.env.featureMyCollections && auth.isAuthenticated && (
            <Row>
              <Col className="d-flex justify-content-end py-3">
                <AddToCollectionButton
                  additionalClassName="addToCollectionTabbedContentButton me-2"
                  setShowModal={setShowAddToCollectionModal}
                  disabled={!isSelectAllChecked}
                >
                  <div>Add Selected to My Collections</div>
                </AddToCollectionButton>
                <SelectAll uuidsToAdd={resultsUuids} scope={title} />
              </Col>
              <StyledHr width="97%" />
            </Row>
          )}
          {showAddToCollectionModal && (
            <AddToCollectionModal
              showModal={showAddToCollectionModal}
              onClose={handleCloseAddModal}
              showCreateNewModal={setShowCreateCollectionModal}
              userUuid={user}
            />
          )}
          {showCreateCollectionModal && (
            <CreateCollectionModal
              showModal={showCreateCollectionModal}
              onClose={handleCloseCreateCollectionModal}
            />
          )}
          {resultsData(orderedItems, tab, title)}
          <StyledObjectsContainerLinkRow className="p-2">
            <Col xs={12}>
              <PrimaryButton
                variant="link"
                className="objectsContainerSearchLink"
                href={`/view/results/${tab}?${formatHalLink(
                  uri,
                  searchScope[tab],
                )}&searchLink=true`}
                onClick={() =>
                  pushClientEvent('Search Link', 'Selected', `Tab ${title}`)
                }
                data-testid="objects-container-show-all-button"
              >
                Show all {estimate} result
                {estimate !== 1 && `s`}
              </PrimaryButton>
            </Col>
          </StyledObjectsContainerLinkRow>
        </React.Fragment>
      )
    }
    return <p>There are no related entities to be displayed.</p>
  }

  return <p>No results were returned with this entity.</p>
}

export default ObjectsContainer
