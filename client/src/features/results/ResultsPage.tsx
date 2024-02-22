/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import useTitle from '../../lib/hooks/useTitle'
import { isFromLandingPage } from '../../lib/parse/search/queryParser'
import { useSearchQuery } from '../../redux/api/ml_api'
import { ISearchResponse } from '../../types/ISearchResponse'
import { getParamPrefix } from '../../lib/util/params'
import { ResultsTab } from '../../types/ResultsTab'

import ConceptResults from './ConceptResults'
// import ErrorPage from './ErrorPage'
import EventResults from './EventResults'
import Navigation from './Navigation'
import ObjectResults from './ObjectResults'
import PersonResults from './PersonResults'
import PlaceResults from './PlaceResults'
import SearchContainer from './ResultsSearchContainer'
import WorkResults from './WorksResults'

const getScopedResultsComponent: React.FC<string> = (
  tab: string,
  searchResponse: ISearchResponse,
) => {
  switch (tab) {
    case 'objects':
      return <ObjectResults searchResponse={searchResponse} />
    case 'works':
      return <WorkResults searchResponse={searchResponse} />
    case 'people':
      return <PersonResults searchResponse={searchResponse} />
    case 'places':
      return <PlaceResults searchResponse={searchResponse} />
    case 'concepts':
      return <ConceptResults searchResponse={searchResponse} />
    case 'events':
      return <EventResults searchResponse={searchResponse} />
  }
  return null
}

const title = 'Results Page'

const ResultsPage: React.FC = () => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const paramPrefix = getParamPrefix(tab)

  const { search, state } = useLocation() as {
    search: string
    state: { [key: string]: boolean }
  }

  const urlParams = new URLSearchParams(search)
  const fromLandingPage = isFromLandingPage(state)
  // Check if current tab q exist
  const hasSimpleSearchQuery = urlParams.has('sq')
  // Setting as empty strings
  const queryString = urlParams.get('q') || ''
  const queryTab = urlParams.get('qt') || tab
  const rnd = urlParams.get('rnd') || undefined

  const facetSearchString = urlParams.get(`${paramPrefix}f`) || null
  let actualSearchString = ''

  actualSearchString = facetSearchString
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
      q: actualSearchString,
      page,
      tab,
      sort,
      facets: {},
      rnd,
    },
    {
      skip: actualSearchString === '' || fromLandingPage || tab !== queryTab,
    },
  )

  // Get title for accessibility purposes
  useTitle(title)

  return (
    <React.Fragment>
      <h1 hidden>{title}</h1>
      <SearchContainer key={tab} isSimpleSearch={hasSimpleSearchQuery} />
      <Navigation
        urlParams={urlParams}
        criteria={queryString !== '' ? JSON.parse(queryString) : null}
      />
      <div className="mx-3">
        {getScopedResultsComponent(tab, searchResponse)}
      </div>
    </React.Fragment>
  )
}

export default ResultsPage
