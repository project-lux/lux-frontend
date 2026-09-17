import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import theme from '../../styles/theme'
import AdvancedSearchContainer from '../advancedSearch/AdvancedSearchContainer'
import { ErrorFallback } from '../error/ErrorFallback'
import SearchContainer from '../search/SearchContainer'
import { ResultsTab } from '../../types/ResultsTab'
import Header from '../advancedSearch/Header'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'

import Navigation from './Navigation'

interface IProps {
  isAdvancedSearch: boolean
  isAiRefinementSearch: boolean
  urlParams: URLSearchParams
  queryString: string
  search: string
  isSwitchToSimpleSearch: boolean
}

const ResultsSearchContainer: React.FC<IProps> = ({
  isAdvancedSearch,
  isAiRefinementSearch,
  urlParams,
  queryString,
  search,
  isSwitchToSimpleSearch,
}) => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const showAdvancedSearch =
    (isAdvancedSearch && !isMobile) || isAiRefinementSearch
  return (
    <React.Fragment>
      {/* {showSimpleSearch && (
        <React.Fragment>
          <SearchContainer
            className="resultsSearchContainer"
            bgColor="transparent"
            id="results-search-container"
            isResultsPage
          />
          <Navigation
            urlParams={urlParams}
            criteria={queryString !== '' ? JSON.parse(queryString) : null}
            search={search}
            isSwitchToSimpleSearch={isSwitchToSimpleSearch}
          />
        </React.Fragment>
      )} */}
      {showAdvancedSearch ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Header />
          <Navigation
            urlParams={urlParams}
            criteria={queryString !== '' ? JSON.parse(queryString) : null}
            search={search}
            isSwitchToSimpleSearch={isSwitchToSimpleSearch}
          />
          <AdvancedSearchContainer key={tab} />
        </ErrorBoundary>
      ) : (
        <React.Fragment>
          <SearchContainer
            className="resultsSearchContainer"
            bgColor="transparent"
            id="results-search-container"
            isResultsPage
          />
          <Navigation
            urlParams={urlParams}
            criteria={queryString !== '' ? JSON.parse(queryString) : null}
            search={search}
            isSwitchToSimpleSearch={isSwitchToSimpleSearch}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default ResultsSearchContainer
