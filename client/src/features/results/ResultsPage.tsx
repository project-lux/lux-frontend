import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Alert, Col } from 'react-bootstrap'
import styled from 'styled-components'

import { isFromLandingPage } from '../../lib/parse/search/queryParser'
import { useSearchQuery } from '../../redux/api/ml_api'
import { getParamPrefix } from '../../lib/util/params'
import { ResultsTab } from '../../types/ResultsTab'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import {
  advancedSearchTitles,
  DEFAULT_PAGE_LENGTH,
} from '../../config/searchTypes'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import {
  AI_REFINEMENT_PARAM,
  SEARCH_TYPE_PARAM,
} from '../../config/aiAssistedSearch/variables'

import ResultsSearchContainer from './ResultsSearchContainer'
import MobileNavigation from './MobileNavigation'
import ResultsPageContent from './ResultsPageContent'

const ResponsiveCol = styled(Col)`
  display: flex;

  @media (min-width: ${theme.breakpoints.md}px) {
    display: none;
  }
`

const title = 'Results Page'

const ResultsPage: React.FC = () => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(tab)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )

  const { search, state } = useLocation() as {
    search: string
    state: { [key: string]: boolean }
  }

  const urlParams = new URLSearchParams(search)
  const fromLandingPage = isFromLandingPage(state)
  // Check if current tab q exist
  // logic to determine if the current search is a simple search
  const isSimpleSearch =
    urlParams.has(SEARCH_TYPE_PARAM) &&
    urlParams.get(SEARCH_TYPE_PARAM) === 'simple'
  // logic to determine if the current search is an advanced search
  const isAdvancedSearch =
    urlParams.has(SEARCH_TYPE_PARAM) &&
    urlParams.get(SEARCH_TYPE_PARAM) === 'advanced'
  // if the SEARCH_TYPE_PARAM is set to 'aiAssisted' then the current search is an AI assisted search
  const isAiSearch =
    urlParams.has(SEARCH_TYPE_PARAM) &&
    urlParams.get(SEARCH_TYPE_PARAM) === 'aiAssisted'
  // if the AI_REFINEMENT_PARAM is set to true then the user has selected to refine their AI assisted search
  const isAiRefinementSearch =
    (urlParams.has(AI_REFINEMENT_PARAM) &&
      urlParams.get(AI_REFINEMENT_PARAM) === 'true') ||
    false
  // Setting as empty strings
  const queryString = urlParams.get('q') || ''
  const queryTab = urlParams.get('qt') || tab
  const pageLength = urlParams.has('pageLength')
    ? parseInt(urlParams.get('pageLength')!, 10)
    : DEFAULT_PAGE_LENGTH
  const filterResults = urlParams.get('filterResults')
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

  /*
   Query will be skipped if the user has entered empty search string
   Or if there are no search params visible in the URL string, indicating
   the user has switched to advanced search from the landing page
  */
  const searchResponse = useSearchQuery(
    {
      q: searchStringWithFacets,
      isAiSearch,
      filterResults,
      page,
      tab,
      pageLength,
      sort,
      facets: {},
      rnd,
    },
    {
      skip:
        searchStringWithFacets === '' || fromLandingPage || tab !== queryTab,
    },
  )

  // Get width of window
  useResizeableWindow(setIsMobile)

  return (
    <div data-testid="results-page">
      <h1 hidden>{title}</h1>
      <ResultsSearchContainer
        key={tab}
        isAdvancedSearch={isAdvancedSearch}
        isAiRefinementSearch={isAiRefinementSearch}
        urlParams={urlParams}
        queryString={queryString}
        search={search}
        isSwitchToSimpleSearch={isSwitchToSimpleSearch}
      />
      <StyledEntityPageSection
        className="row mx-3 resultsEntityPageSection results"
        $borderTopLeftRadius={
          tab === 'objects' && !isMobile && isSimpleSearch ? '0px' : undefined
        }
        $borderTopRightRadius={
          tab === 'events' && !isMobile && isSimpleSearch ? '0px' : undefined
        }
      >
        {isMobile && (
          <ResponsiveCol xs={12} className="px-0">
            <MobileNavigation
              isSimpleSearch={isSimpleSearch}
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
          <Col
            xs={12}
            className={isMobile ? '' : 'px-0'}
            data-testid="results-page-search-results-container"
          >
            <ResultsPageContent
              searchResponse={searchResponse}
              isMobile={isMobile}
            />
          </Col>
        )}
      </StyledEntityPageSection>
    </div>
  )
}

export default ResultsPage
