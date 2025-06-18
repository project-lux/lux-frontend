import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import sanitizeHtml from 'sanitize-html'
import { Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
// import { useAuth } from 'react-oidc-context'
import { useDispatch } from 'react-redux'

import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import StyledResultsHeader from '../../styles/features/results/ResultsHeader'
import StyledHr from '../../styles/shared/Hr'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { OverlayKey } from '../../config/cms'
import { getParamPrefix } from '../../lib/util/params'
import EntityResultsDescription from '../cms/EntityResultsDescription'
import { ResultsTab } from '../../types/ResultsTab'
import LuxOverlay from '../common/LuxOverlay'
import MobileSelectedFacets from '../facets/MobileSelectedFacets'
import { searchScope } from '../../config/searchTypes'
import { useWindowWidth } from '../../lib/hooks/useWindowWidth'
import CreateCollectionButton from '../myCollections/CreateCollectionButton'
import AddToCollectionButton from '../myCollections/AddToCollectionButton'
import ManageCollectionsButton from '../myCollections/ManageCollectionsButton'
import { useAppSelector } from '../../app/hooks'
import {
  IMyCollectionsResultsState,
  addSelectAll,
  resetState,
} from '../../redux/slices/myCollectionsSlice'
import { ISearchResults } from '../../types/ISearchResults'
import { getOrderedItemsIds } from '../../lib/parse/search/searchResultParser'
import AddToCollectionModal from '../myCollections/AddToCollectionModal'
import DeleteModal from '../myCollections/DeleteModal'
import CreateCollectionModal from '../myCollections/CreateCollectionModal'

import Sort from './Sort'

const StyledCol = styled(Col)`
  margin-bottom: 12px;
  margin-top: 12px;
  justify-content: flex-start;

  @media (min-width: ${theme.breakpoints.lg}px) {
    justify-content: flex-end;
    text-align: right;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`

const StyledDiv = styled.div`
  display: none;

  @media (min-width: ${theme.breakpoints.md}px) {
    display: inline;
  }
`

interface IResultsHeader {
  total: number
  label: string
  overlay: OverlayKey
  resultsData: ISearchResults
  toggleView?: boolean
}

const ResultsHeader: React.FC<IResultsHeader> = ({
  total,
  label,
  overlay,
  resultsData,
  toggleView = false,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { pathname, search } = useLocation() as {
    pathname: string
    search: string
  }
  const { tab, subTab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(tab)
  const queryString = new URLSearchParams(search)

  // Is the user authenticated
  // const auth = useAuth()
  // console.log(auth)
  const userIsAuthenticate = true
  // const userIsAuthenticate = auth.isAuthenticated
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const [redirect, setRedirect] = useState<boolean>(false)
  const [showAddToCollectionModal, setShowAddToCollectionModal] =
    useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showCreateCollectionModal, setShowCreateCollectionModal] =
    useState<boolean>(false)
  const { width } = useWindowWidth()
  useResizeableWindow(setIsMobile)

  const resultsUuids = getOrderedItemsIds(resultsData)
  const currentMyCollectionState = useAppSelector(
    (myCollectionsState) =>
      myCollectionsState.myCollections as IMyCollectionsResultsState,
  )
  const { uuids, scopeOfSelections } = currentMyCollectionState
  // The select all checkbox will be checked as long as there are 1 or more entities selected
  const isSelectAllChecked =
    uuids.length > 0 &&
    (scopeOfSelections === subTab || scopeOfSelections === tab)

  // Handle the selection of the entity's checkbox
  const handleSelectAllCheckboxSelection = (): void => {
    if (isSelectAllChecked) {
      dispatch(resetState())
    } else {
      dispatch(addSelectAll({ uuids: resultsUuids, scope: tab }))
    }
  }

  useEffect(() => {
    if (redirect !== false) {
      setRedirect(false)
    }
  }, [redirect])

  // set list vs grid view
  const currentView = queryString.has('view') ? queryString.get('view') : 'list'

  // Set sorting options
  const sortName = `${paramPrefix}s`
  const sort = queryString.has(sortName)
    ? (queryString.get(sortName)?.split(':')[0] as string)
    : undefined
  const sortDirectionParamValue = queryString.has(sortName)
    ? (queryString.get(sortName)?.split(':')[1] as string)
    : undefined
  const descriptiveText = EntityResultsDescription(overlay) || ''

  // toggle view between list and image view
  const changeView = (selectedView: string): void => {
    pushClientEvent(
      'Results View Toggle',
      'Selected',
      `To ${selectedView} View`,
    )

    queryString.set('view', selectedView)
    navigate({
      pathname,
      search: `?${queryString.toString()}`,
    })
  }

  // event to handle the closing of the add to collection modal
  const handleCloseAddModal = (): void => {
    setShowAddToCollectionModal(false)
    pushClientEvent('My Collections', 'Closed', 'Add to My Collections modal')
  }

  // event to handle the closing of the delete a collection modal
  const handleCloseDeleteModal = (): void => {
    setShowDeleteModal(false)
    pushClientEvent('My Collections', 'Closed', 'Delete Collections modal')
  }

  // event to handle the closing of the create a collection modal
  const handleCloseCreateCollectionModal = (): void => {
    setShowCreateCollectionModal(false)
    pushClientEvent('My Collections', 'Closed', 'Delete Collections modal')
  }

  let headerButtonsColWidth = 6
  let descriptiveTextColMd = 12
  let descriptiveTextColLg = 3
  let descriptiveTextColXl = 4
  let headerButtonsColMd = 12
  let headerButtonsColLg = 9
  let headerButtonsColXl = 8
  if (!userIsAuthenticate) {
    headerButtonsColWidth = 12
    descriptiveTextColMd = 7
    descriptiveTextColLg = 7
    descriptiveTextColXl = 7
    headerButtonsColMd = 5
    headerButtonsColLg = 5
    headerButtonsColXl = 5
  }

  // render the appropriate button based on the items selected and the current tab
  const additionalClassNameOfMyCollectionsButton =
    width < theme.breakpoints.sm ? 'w-100 me-0' : 'me-2'
  let buttonToRender = (
    <AddToCollectionButton
      additionalClassName={additionalClassNameOfMyCollectionsButton}
      selectAll={isSelectAllChecked}
      setShowModal={setShowAddToCollectionModal}
    />
  )
  if (subTab === 'my-collections') {
    buttonToRender = (
      <CreateCollectionButton
        additionalClassName={additionalClassNameOfMyCollectionsButton}
        setShowModal={setShowCreateCollectionModal}
      />
    )
    if (isSelectAllChecked) {
      buttonToRender = (
        <ManageCollectionsButton
          additionalClassName={additionalClassNameOfMyCollectionsButton}
          setShowAddToCollectionModal={setShowAddToCollectionModal}
          setShowDeleteModal={setShowDeleteModal}
        />
      )
    }
  }

  const justifyContent =
    width < theme.breakpoints.lg
      ? 'justify-content-start'
      : 'justify-content-end'

  return (
    <React.Fragment>
      {showAddToCollectionModal && (
        <AddToCollectionModal
          showModal={showAddToCollectionModal}
          onClose={handleCloseAddModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          onClose={handleCloseDeleteModal}
        />
      )}
      {showCreateCollectionModal && (
        <CreateCollectionModal
          showModal={showCreateCollectionModal}
          onClose={handleCloseCreateCollectionModal}
        />
      )}
      <Row className="resultsHeaderTitleRow">
        <Col className="resultsHeaderTitleCol">
          <StyledResultsHeader
            className="mb-0 resultsHeaderTitle"
            data-testid="results-header-title"
          >
            <StyledDiv>
              {total} {label} results
            </StyledDiv>
            {(tab === 'objects' || tab === 'works') && <LuxOverlay />}
          </StyledResultsHeader>
        </Col>
      </Row>
      <Row className="px-2 resultsHeaderControlsRow">
        <Col
          className="resultsHeaderDescriptiveTextCol"
          xs={12}
          sm={12}
          md={descriptiveTextColMd}
          lg={descriptiveTextColLg}
          xl={descriptiveTextColXl}
        >
          <div
            className="descriptiveText"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(descriptiveText),
            }}
            data-testid="results-page-cms-descriptor"
          />
        </Col>
        <StyledCol
          xs={12}
          sm={12}
          md={headerButtonsColMd}
          lg={headerButtonsColLg}
          xl={headerButtonsColXl}
          className="d-flex align-items-end resultsHeaderOptionsCol"
          data-testid="results-header-options"
        >
          <Row
            className={`w-100 d-flex ${justifyContent} resultsHeaderOptionsRow`}
          >
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={headerButtonsColWidth}
              className={`d-flex ${width < theme.breakpoints.sm ? 'w-100' : 'w-auto'} ${justifyContent} resultsHeaderSortingCol`}
            >
              <div
                className={`d-flex toggleViewButtonDiv ${isMobile ? 'w-100' : ''}`}
              >
                {toggleView && (
                  <Button
                    type="button"
                    className="btn text-center h-100 text-nowrap rounded-3 me-2 toggleViewButton w-100"
                    onClick={() =>
                      changeView(currentView === 'list' ? 'grid' : 'list')
                    }
                    style={{
                      // borderRadius: theme.border.radius,
                      backgroundColor: theme.color.lightGray,
                      color: theme.color.trueBlack,
                      border: theme.color.trueBlack,
                    }}
                    data-testid={
                      currentView === 'list'
                        ? 'switch-to-grid-view-button'
                        : 'switch-to-list-view-button'
                    }
                  >
                    {currentView === 'list' ? (
                      <React.Fragment>
                        <i className="bi bi-grid-3x3-gap-fill mx-2 d-inline-block" />
                        Grid View
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <i className="bi bi-list-ul mx-2 d-inline-block" />
                        List View
                      </React.Fragment>
                    )}
                  </Button>
                )}
              </div>
              <Sort />
            </Col>
            {userIsAuthenticate && (
              <Col
                xs={12}
                sm={12}
                md={6}
                lg={6}
                className={`d-flex ${isMobile ? 'mt-2 flex-wrap' : 'w-auto px-0'} ${justifyContent} resultsHeaderMyCollectionsOptionsCol`}
              >
                {buttonToRender}
                <span className="d-flex align-items-center">
                  <input
                    className="form-check-input d-inline mt-0 selectAllResultsCheckbox"
                    type="checkbox"
                    id="select-all-checkbox"
                    onChange={() => handleSelectAllCheckboxSelection()}
                    checked={isSelectAllChecked}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor="select-all-checkbox"
                  >
                    {isSelectAllChecked &&
                    (scopeOfSelections === subTab || scopeOfSelections === tab)
                      ? `${uuids.length} Selected`
                      : 'Select All'}
                  </label>
                </span>
              </Col>
            )}
          </Row>
        </StyledCol>
        {isMobile && (
          <MobileSelectedFacets
            tab={tab}
            scope={searchScope[tab]}
            search={search}
            selectedSortBy={sort}
            selectedSortDirection={sortDirectionParamValue}
          />
        )}
      </Row>
      <StyledHr width="100%" className="my-2 resultsHeaderHr" />
    </React.Fragment>
  )
}

export default ResultsHeader
