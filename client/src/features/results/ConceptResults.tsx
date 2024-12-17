/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import { IOrderedItems } from '../../types/ISearchResults'
import FacetContainer from '../facets/FacetContainer'
import { ISearchResponse } from '../../types/ISearchResponse'
import { getParamPrefix } from '../../lib/util/params'
import PageLoading from '../common/PageLoading'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import { ResultsTab } from '../../types/ResultsTab'
import StyledResultsCol from '../../styles/features/results/ResultsCol'
import StyledEntityResultsRow from '../../styles/features/results/EntityResultsRow'

import Paginate from './Paginate'
import ResultsHeader from './ResultsHeader'
import ConceptSnippet from './ConceptSnippet'
import NoResultsAlert from './NoResultsAlert'

interface IProps {
  searchResponse: ISearchResponse
  isMobile: boolean
}

const ConceptResults: React.FC<IProps> = ({ searchResponse, isMobile }) => {
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
    results.map((result) => <ConceptSnippet key={result.id} uri={result.id} />)

  let estimate = 0
  if (isSuccess && data) {
    estimate = getEstimates(data)
  }

  // If a user is search via advanced search, a request to the search api will not be initialized
  if (status === 'uninitialized') {
    return null
  }

  return (
    <StyledEntityResultsRow>
      {(isSuccess || isError) && (
        <Col xs={12}>
          <ResultsHeader
            key={sort}
            total={data ? estimate : 0}
            label="Concepts"
            overlay="conceptsAndGroupings"
            toggleView
          />
        </Col>
      )}
      <Col xs={12}>
        <Row className="mt-3">
          {!isMobile && (
            <StyledResultsCol xs={12} sm={12} md={3} lg={3}>
              <FacetContainer />
            </StyledResultsCol>
          )}
          <Col xs={12} sm={12} md={9} lg={9}>
            {!isFetching && isSuccess && data && (
              <React.Fragment>
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
          </Col>
        </Row>
      </Col>
    </StyledEntityResultsRow>
  )
}

export default ConceptResults
