import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Alert from 'react-bootstrap/esm/Alert'

import theme from '../../styles/theme'
import AdvancedSearchFormContainer from '../advancedSearch/FormContainer'
import { ErrorFallback } from '../error/ErrorFallback'
import SearchContainer from '../search/SearchContainer'
import { ResultsTab } from '../../types/ResultsTab'
import Header from '../advancedSearch/Header'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import RefinementContainer from '../aiAssistedSearch/RefinementContainer'

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

  const showAdvancedSearch = isAdvancedSearch || isAiRefinementSearch
  return (
    <React.Fragment>
      {showAdvancedSearch ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Header />
          <Navigation
            urlParams={urlParams}
            criteria={queryString !== '' ? JSON.parse(queryString) : null}
            search={search}
            isSwitchToSimpleSearch={isSwitchToSimpleSearch}
          />
          {isMobile ? (
            <Alert
              variant="warning"
              className="mt-3"
              data-testid="mobile-advanced-search-alert"
            >
              The Advanced Search Page is not accessible on mobile devices.
              Please use a desktop or tablet to access this page.
            </Alert>
          ) : isAiRefinementSearch ? (
            <RefinementContainer />
          ) : (
            <AdvancedSearchFormContainer
              key={tab}
              formClassName="advancedSearchBody"
              helpTextClassName="helpText"
            />
          )}
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
