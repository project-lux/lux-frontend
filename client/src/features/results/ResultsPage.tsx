import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Alert, Col } from 'react-bootstrap'
import styled from 'styled-components'

import { useAppDispatch } from '../../app/hooks'
import { changeCurrentSearchState } from '../../redux/slices/currentSearchSlice'
import useTitle from '../../lib/hooks/useTitle'
import { isFromLandingPage } from '../../lib/parse/search/queryParser'
import { useSearchQuery } from '../../redux/api/ml_api'
import { ISearchResponse } from '../../types/ISearchResponse'
import { getParamPrefix } from '../../lib/util/params'
import { ResultsTab } from '../../types/ResultsTab'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { advancedSearchTitles } from '../../config/searchTypes'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import useAuthentication from '../../lib/hooks/useAuthentication'
// import config from '../../config/config'
import MyCollectionsAlert from '../myCollections/Alert'
import { IRouteState } from '../../types/myCollections/IRouteState'

import ConceptResults from './ConceptResults'
import EventResults from './EventResults'
import ObjectResults from './ObjectResults'
import PersonResults from './PersonResults'
import PlaceResults from './PlaceResults'
import WorkResults from './WorksResults'
import ResultsSearchContainer from './ResultsSearchContainer'
import MobileNavigation from './MobileNavigation'
import SetResults from './SetResults'

const ResponsiveCol = styled(Col)`
  display: flex;

  @media (min-width: ${theme.breakpoints.md}px) {
    display: none;
  }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getScopedResultsComponent: any = (
  tab: string,
  searchResponse: ISearchResponse,
  isMobile: boolean,
) => {
  switch (tab) {
    case 'objects':
      return (
        <ObjectResults searchResponse={searchResponse} isMobile={isMobile} />
      )
    case 'works':
      return <WorkResults searchResponse={searchResponse} isMobile={isMobile} />
    case 'collections':
      return <SetResults searchResponse={searchResponse} isMobile={isMobile} />
    case 'people':
      return (
        <PersonResults searchResponse={searchResponse} isMobile={isMobile} />
      )
    case 'places':
      return (
        <PlaceResults searchResponse={searchResponse} isMobile={isMobile} />
      )
    case 'concepts':
      return (
        <ConceptResults searchResponse={searchResponse} isMobile={isMobile} />
      )
    case 'events':
      return (
        <EventResults searchResponse={searchResponse} isMobile={isMobile} />
      )
  }
  return null
}

const title = 'Results Page'

const ResultsPage: React.FC = () => {
  const auth = useAuthentication()

  const dispatch = useAppDispatch()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(tab)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const [alert, setAlert] = useState<IRouteState>({
    showAlert: false,
    alertMessage: '',
    alertVariant: 'primary',
  })

  const { search, state } = useLocation() as {
    search: string
    state: IRouteState
  }

  const urlParams = new URLSearchParams(search)
  const fromLandingPage = isFromLandingPage(state as { [key: string]: boolean })
  // Check if current tab q exist
  const hasSimpleSearchQuery = urlParams.has('sq')
  // Setting as empty strings
  const queryString = urlParams.get('q') || ''
  const queryTab = urlParams.get('qt') || tab
  const filterResults = urlParams.get('filterResults') || null
  const rnd = urlParams.get('rnd') || undefined
  const isSwitchToSimpleSearch =
    urlParams.get('fromAdvanced') === 'true' || false
  const facetSearchString = urlParams.get(`${paramPrefix}f`) || null
  let searchStringWithFacets = ''

  searchStringWithFacets = facetSearchString
    ? `{"AND":[${queryString},${facetSearchString}]}`
    : queryString

  let page = parseInt(urlParams.get(`${paramPrefix}p`) || '', 10)
  if (Number.isNaN(page)) {
    page = 1
  }
  const sort = urlParams.has(`${paramPrefix}s`)
    ? (urlParams.get(`${paramPrefix}s`) as string)
    : undefined

  // Do not let RTK query serve the cached response if the user is logged in
  const forceRefetch = auth.isAuthenticated

  /*
   Query will be skipped if the user has entered empty search string
   Or if there are no search params visible in the URL string, indicating
   the user has switched to advanced search from the landing page
  */
  const searchResponse = useSearchQuery(
    {
      q: searchStringWithFacets,
      filterResults,
      page,
      tab,
      sort,
      facets: {},
      rnd,
    },
    {
      skip:
        auth.isLoading === true ||
        searchStringWithFacets === '' ||
        fromLandingPage ||
        tab !== queryTab,
      forceRefetch,
    },
  )

  useEffect(() => {
    if (!hasSimpleSearchQuery) {
      dispatch(changeCurrentSearchState({ value: 'advanced' }))
    } else {
      dispatch(changeCurrentSearchState({ value: 'simple' }))
    }
  }, [dispatch, hasSimpleSearchQuery])

  useEffect(() => {
    if (state && state.hasOwnProperty('showAlert')) {
      setAlert(state as IRouteState)
    }
  }, [state])

  // Get title for accessibility purposes
  useTitle(title)

  // Get width of window
  useResizeableWindow(setIsMobile)

  return (
    <React.Fragment>
      <h1 hidden>{title}</h1>
      {alert.showAlert && (
        <MyCollectionsAlert
          variant={alert.alertVariant as string}
          message={alert.alertMessage as string}
          handleOnClose={setAlert}
        />
      )}
      <ResultsSearchContainer
        key={tab}
        isSimpleSearch={hasSimpleSearchQuery}
        urlParams={urlParams}
        queryString={queryString}
        search={search}
        isSwitchToSimpleSearch={isSwitchToSimpleSearch}
      />
      <StyledEntityPageSection
        className="row mx-3 resultsEntityPageSection results"
        borderTopLeftRadius={tab === 'objects' && !isMobile ? '0px' : undefined}
        borderTopRightRadius={tab === 'events' && !isMobile ? '0px' : undefined}
      >
        {isMobile && (
          <ResponsiveCol xs={12} className="px-0">
            <MobileNavigation
              isSimpleSearch={hasSimpleSearchQuery}
              urlParams={urlParams}
              queryString={queryString}
              search={search}
              criteria={queryString !== '' ? JSON.parse(queryString) : null}
              isSwitchToSimpleSearch={isSwitchToSimpleSearch}
            />
          </ResponsiveCol>
        )}
        {tab !== queryTab ? (
          <Col>
            <Alert
              variant="info"
              className="mt-3"
              data-testid="results-info-alert"
            >
              Please enter a new search to begin searching for{' '}
              {advancedSearchTitles[tab]} results.
            </Alert>
          </Col>
        ) : (
          <Col xs={12} className={isMobile ? '' : 'px-0'}>
            {getScopedResultsComponent(tab, searchResponse, isMobile)}
          </Col>
        )}
      </StyledEntityPageSection>
    </React.Fragment>
  )
}

export default ResultsPage
