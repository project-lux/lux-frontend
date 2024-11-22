/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Col } from 'react-bootstrap'

import { IOrderedItems } from '../../types/ISearchResults'
import FacetContainer from '../facets/FacetContainer'
import { facetNamesLists } from '../../config/facets'
import { ISearchResponse } from '../../types/ISearchResponse'
import { searchScope } from '../../config/searchTypes'
import { getParamPrefix } from '../../lib/util/params'
import PageLoading from '../common/PageLoading'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import { ResultsTab } from '../../types/ResultsTab'

import Paginate from './Paginate'
import ResultsHeader from './ResultsHeader'
import EventSnippet from './EventSnippet'
import NoResultsAlert from './NoResultsAlert'

interface IProps {
  searchResponse: ISearchResponse
}

const EventResults: React.FC<IProps> = ({ searchResponse }) => {
  const { search } = useLocation()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const queryString = new URLSearchParams(search)
  const paramPrefix = getParamPrefix(tab)
  const pageParam = `${paramPrefix}p`
  const page: any = queryString.has(pageParam) ? queryString.get(pageParam) : 1
  const sort = queryString.get(`${tab}Sort`)

  const { data, isFetching, isSuccess, isError, error, isLoading, status } =
    searchResponse

  let errorMessage: string | null = null

  if (isError) {
    errorMessage = error.data.errorMessage
  }

  const resultsList = (
    results: Array<IOrderedItems>,
  ): Array<React.ReactElement> =>
    results.map((result) => <EventSnippet key={result.id} uri={result.id} />)

  let estimate = 0
  if (isSuccess && data) {
    estimate = getEstimates(data)
  }

  // If a user is search via advanced search, a request to the search api will not be initialized
  if (status === 'uninitialized') {
    return null
  }

  return (
    <div className="row py-3">
      <FacetContainer
        facetsRequested={facetNamesLists.events}
        scope={searchScope.events}
      />
      <Col xs={12} sm={12} md={12} lg={9}>
        <StyledEntityPageSection>
          {!isFetching && isSuccess && data && (
            <React.Fragment>
              <ResultsHeader
                key={sort}
                total={estimate}
                label="Events"
                overlay="events"
              />
              {resultsList(data.orderedItems)}
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
        </StyledEntityPageSection>
      </Col>
    </div>
  )
}

export default EventResults
