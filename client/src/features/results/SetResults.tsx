/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useAuth } from 'react-oidc-context'

import { IOrderedItems } from '../../types/ISearchResults'
import FacetContainer from '../facets/FacetContainer'
import { ISearchResponse } from '../../types/ISearchResponse'
import { getParamPrefix } from '../../lib/util/params'
import PageLoading from '../common/PageLoading'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import { ResultsTab } from '../../types/ResultsTab'
import StyledResultsCol from '../../styles/features/results/ResultsCol'
import StyledEntityResultsRow from '../../styles/features/results/EntityResultsRow'
import config from '../../config/config'

import Paginate from './Paginate'
import ResultsHeader from './ResultsHeader'
import NoResultsAlert from './NoResultsAlert'
import SetSnippet from './SetSnippet'
import MyCollectionSnippet from './MyCollectionSnippet'
import Navigation from './Navigation'

interface IProps {
  searchResponse: ISearchResponse
  isMobile: boolean
}

const SetResults: React.FC<IProps> = ({ searchResponse, isMobile }) => {
  const auth = useAuth()
  const isAuthenticated = auth.isAuthenticated
  // Parse URL search params
  const { search } = useLocation()
  const urlParams = new URLSearchParams(search)
  const { tab, subTab } = useParams<keyof ResultsTab>() as ResultsTab
  const queryString = urlParams.get('q') || ''
  const currentTab = subTab ? subTab : tab
  const paramPrefix = getParamPrefix(currentTab)
  const pageParam = `${paramPrefix}p`
  const page: any = urlParams.has(pageParam) ? urlParams.get(pageParam) : 1
  const sort = urlParams.get(`${currentTab}Sort`)
  const view: string = urlParams.has('view')
    ? (urlParams.get('view') as string)
    : 'list'
  const isSwitchToSimpleSearch =
    urlParams.get('fromAdvanced') === 'true' || false

  const { data, isFetching, isSuccess, isError, error, isLoading, status } =
    searchResponse

  const resultsList = (
    results: Array<IOrderedItems>,
  ): Array<React.ReactElement> =>
    results.map((result) => {
      if (config.env.featureMyCollections && subTab === 'my-collections') {
        return (
          <MyCollectionSnippet key={result.id} uri={result.id} view={view} />
        )
      }

      return <SetSnippet key={result.id} uri={result.id} view={view} />
    })

  let errorMessage: string | null = null

  if (isError) {
    errorMessage = error.data.errorMessage
  }

  let estimate = 0
  if (isSuccess && data) {
    estimate = getEstimates(data)
  }

  // If a user is search via advanced search, a request to the search api will not be initialized
  if (status === 'uninitialized') {
    return null
  }

  return (
    <StyledEntityResultsRow className="collectionsResultsPage">
      {config.env.featureMyCollections && isAuthenticated && (
        <React.Fragment>
          <Navigation
            urlParams={urlParams}
            criteria={queryString !== '' ? JSON.parse(queryString) : null}
            search={search}
            isSwitchToSimpleSearch={isSwitchToSimpleSearch}
            isMyCollectionsNestedTab
          />
        </React.Fragment>
      )}
      {(isSuccess || isError) && (
        <Col xs={12}>
          <ResultsHeader
            key={sort}
            total={estimate}
            label="Collections"
            overlay="collections"
            resultsData={data}
            toggleView
          />
        </Col>
      )}
      <Col xs={12}>
        <Row className="mt-3">
          {!isMobile && (
            <StyledResultsCol
              xs={12}
              sm={12}
              md={3}
              lg={3}
              className="desktop-facets-col"
            >
              <FacetContainer />
            </StyledResultsCol>
          )}
          <Col xs={12} sm={12} md={9} lg={9}>
            {!isFetching && isSuccess && data && (
              <React.Fragment>
                {view === 'list' && resultsList(data.orderedItems)}
                {view === 'grid' && (
                  <Row xs={1} sm={2} md={3} lg={4} className="g-4 mx-3 pt-2">
                    {resultsList(data.orderedItems)}
                  </Row>
                )}
                {estimate >= 20 && (
                  <Paginate
                    estimate={estimate}
                    currentPage={parseInt(page, 10)}
                    pageSize={20}
                  />
                )}
              </React.Fragment>
            )}
            {!isFetching &&
              !isLoading &&
              (isError ||
                (isSuccess && data && data.orderedItems.length === 0)) && (
                <NoResultsAlert
                  message={errorMessage}
                  variant={
                    isSuccess && data && data.orderedItems.length === 0
                      ? 'danger'
                      : 'warning'
                  }
                />
              )}
            {(isFetching || isLoading) && <PageLoading />}
          </Col>
        </Row>
      </Col>
    </StyledEntityResultsRow>
  )
}

export default SetResults
