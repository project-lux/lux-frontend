import React, { JSX, useEffect, useRef } from 'react'
import { useLocation, useParams } from 'react-router'
import { Col, Row } from 'react-bootstrap'

import { IOrderedItems } from '../../types/ISearchResults'
import FacetContainer from '../facets/FacetContainer'
import { ISearchResponse } from '../../types/ISearchResponse'
import { getPageLength } from '../../lib/util/params'
import PageLoading from '../common/PageLoading'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import { ResultsTab } from '../../types/ResultsTab'
import StyledResultsCol from '../../styles/features/results/ResultsCol'
import StyledEntityResultsRow from '../../styles/features/results/EntityResultsRow'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  ICurrentSearchState,
  changeFocusResultsHeader,
} from '../../redux/slices/currentSearchSlice'

import Paginate from './Paginate'
import ResultsHeader from './ResultsHeader'
// Person/group-specific result rendering component.
import PersonSnippet from './PersonSnippet'
import NoResultsAlert from './NoResultsAlert'
import WorksSnippet from './WorksSnippet'
import ObjectSnippet from './ObjectSnippet'
import SetSnippet from './SetSnippet'
import PlaceSnippet from './PlaceSnippet'
import ConceptSnippet from './ConceptSnippet'
import EventSnippet from './EventSnippet'

interface IProps {
  searchResponse: ISearchResponse
  isMobile: boolean
}

const ResultsPageContent: React.FC<IProps> = ({ searchResponse, isMobile }) => {
  // Parse URL search params
  const { search } = useLocation()
  const urlParams = new URLSearchParams(search)
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const page = urlParams.has('page') ? urlParams.get('page') : '1'
  const pageLength = getPageLength(urlParams)
  const sort = urlParams.get(`${tab}Sort`)
  const view: string = urlParams.has('view')
    ? (urlParams.get('view') as string)
    : 'list'
  const { data, isFetching, isSuccess, isError, error, isLoading, status } =
    searchResponse

  const dispatch = useAppDispatch()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const { focusResultsHeader } = useAppSelector(
    (state) => state.currentSearch as ICurrentSearchState,
  )

  // After an advanced search is submitted or a new page of results is selected, scroll to and focus the
  // results heading so sighted users see the new results, screen reader users hear the result count,
  // and keyboard users start at the new results.
  // Checking status (not just isFetching) avoids focusing while the previous search's results are still shown:
  // when the query changes, RTK Query briefly reports isFetching false with the old data and an 'uninitialized' status.
  const hasSettled =
    !isFetching && (status === 'fulfilled' || status === 'rejected')
  useEffect(() => {
    if (!focusResultsHeader || !hasSettled) {
      return undefined
    }
    // Wait a frame so this runs after ScrollRestoration (in App) when arriving from another page,
    // which scrolls to the top on the route change. Parent effects run after child effects, so without
    // this the scroll to the heading would be undone when the results are already cached.
    const frame = window.requestAnimationFrame(() => {
      // cleared inside the callback: clearing it earlier would re-run this effect and cancel the frame
      dispatch(changeFocusResultsHeader({ value: false }))
      const heading = headingRef.current
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches
      const behavior = prefersReducedMotion ? 'auto' : 'smooth'
      // The heading is hidden on small screens (display: none), so fall back to the top of the page
      if (heading === null || heading.getClientRects().length === 0) {
        window.scrollTo({ top: 0, behavior })
        return
      }
      heading.scrollIntoView({ behavior, block: 'start' })
      // the scroll is handled above so focusing does not cause a second jump
      heading.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [focusResultsHeader, hasSettled, dispatch])

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

  const resultsList = (
    results: Array<IOrderedItems>,
  ): Array<JSX.Element | undefined> =>
    results.map((result, ind) => {
      switch (tab) {
        case 'objects':
          return (
            <ObjectSnippet
              key={result.id}
              uri={result.id}
              view={view}
              totalResults={estimate}
              pageLength={pageLength}
              index={ind + 1}
            />
          )
        case 'works':
          return (
            <WorksSnippet
              key={result.id}
              uri={result.id}
              view={view}
              totalResults={estimate}
              pageLength={pageLength}
              index={ind + 1}
            />
          )
        case 'collections':
          return (
            <SetSnippet
              key={result.id}
              uri={result.id}
              view={view}
              totalResults={estimate}
              pageLength={pageLength}
              index={ind + 1}
            />
          )
        case 'people':
          return (
            <PersonSnippet
              key={result.id}
              uri={result.id}
              view={view}
              totalResults={estimate}
              pageLength={pageLength}
              index={ind + 1}
            />
          )
        case 'places':
          return (
            <PlaceSnippet
              key={result.id}
              uri={result.id}
              view={view}
              totalResults={estimate}
              pageLength={pageLength}
              index={ind + 1}
            />
          )
        case 'concepts':
          return (
            <ConceptSnippet
              key={result.id}
              uri={result.id}
              view={view}
              totalResults={estimate}
              pageLength={pageLength}
              index={ind + 1}
            />
          )
        case 'events':
          return (
            <EventSnippet
              key={result.id}
              uri={result.id}
              view={view}
              totalResults={estimate}
              pageLength={pageLength}
              index={ind + 1}
            />
          )
      }
    })

  return (
    <StyledEntityResultsRow>
      {(isSuccess || isError) && (
        <Col xs={12}>
          <ResultsHeader
            key={sort}
            total={estimate}
            resultsData={data}
            headingRef={headingRef}
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
          <Col xs={12} sm={12} md={9} lg={9} xl={9} xxl={9}>
            {!isFetching && isSuccess && data && (
              <React.Fragment>
                {view === 'list' && resultsList(data.orderedItems)}
                {view === 'grid' && (
                  <Row xs={1} sm={2} md={3} lg={4} className="g-4 mx-3 pt-2">
                    {resultsList(data.orderedItems)}
                  </Row>
                )}
                {estimate >= pageLength && (
                  <Paginate
                    estimate={estimate}
                    currentPage={parseInt(page!, 10)}
                    pageSize={pageLength}
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

export default ResultsPageContent
