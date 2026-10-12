import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import theme from '../../styles/theme'
import AdvancedSearchFormContainer from '../advancedSearch/FormContainer'
import { ErrorFallback } from '../error/ErrorFallback'
import SearchContainer from '../search/SearchContainer'
import { ResultsTab } from '../../types/ResultsTab'
import Header from '../advancedSearch/Header'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import RefinementContainer from '../aiAssistedSearch/RefinementContainer'
import { ICurrentSearchState } from '../../redux/slices/currentSearchSlice'
import { useAppSelector } from '../../app/hooks'
import { AI_REFINEMENT_PARAM } from '../../config/aiAssistedSearch/variables'

import Navigation from './Navigation'

interface IProps {
  isAdvancedSearch: boolean
  urlParams: URLSearchParams
  queryString: string
  search: string
  isSwitchToSimpleSearch: boolean
}

const ResultsSearchContainer: React.FC<IProps> = ({
  isAdvancedSearch,
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

  const asSearchState = useAppSelector(
    (searchState) => searchState.currentSearch as ICurrentSearchState,
  )
  const isAiSearch = asSearchState.isAiSearch
  const isRefineSearch = urlParams.has(AI_REFINEMENT_PARAM)
    ? urlParams.get(AI_REFINEMENT_PARAM) === 'true'
    : false
  const showAdvancedSearch = isAdvancedSearch

  return (
    <React.Fragment>
      {(showAdvancedSearch || isRefineSearch) && !isMobile ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Header />
          <Navigation
            urlParams={urlParams}
            criteria={queryString !== '' ? JSON.parse(queryString) : null}
            search={search}
            isSwitchToSimpleSearch={isSwitchToSimpleSearch}
          />
          {isAiSearch && isRefineSearch ? (
            <RefinementContainer key={search} />
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
