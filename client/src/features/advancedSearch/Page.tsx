import React from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import { AI_REFINEMENT_PARAM } from '../../config/aiAssistedSearch/variables'
import ResultsSearchContainer from '../results/ResultsSearchContainer'
import { ErrorFallback } from '../error/ErrorFallback'

const title = 'Advanced Search Page'

const AdvancedSearchPage: React.FC = () => {
  const { search } = useLocation() as {
    search: string
  }

  const urlParams = new URLSearchParams(search)
  const isAiRefinementSearch =
    (urlParams.has(AI_REFINEMENT_PARAM) &&
      urlParams.get(AI_REFINEMENT_PARAM) === 'true') ||
    false
  // Setting as empty strings
  const queryString = urlParams.get('q') || ''
  const isSwitchToSimpleSearch =
    urlParams.get('fromAdvanced') === 'true' || false

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div data-testid="advanced-search-page">
        <h1 hidden>{title}</h1>
        <ResultsSearchContainer
          key="advanced-search-page"
          isAdvancedSearch
          isAiRefinementSearch={isAiRefinementSearch}
          urlParams={urlParams}
          queryString={queryString}
          search={search}
          isSwitchToSimpleSearch={isSwitchToSimpleSearch}
        />
      </div>
    </ErrorBoundary>
  )
}

export default AdvancedSearchPage
