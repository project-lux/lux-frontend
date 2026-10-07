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
// import { AI_ASSISTED_SEARCH_STORAGE_KEY } from '../../config/aiAssistedSearch/variables'
import { ICurrentSearchState } from '../../redux/slices/currentSearchSlice'
import { useAppSelector } from '../../app/hooks'

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
  // const [isAiSearch] = useState<boolean>(() => {
  //   const storedIsActive = localStorage.getItem(AI_ASSISTED_SEARCH_STORAGE_KEY)
  //   return storedIsActive ? JSON.parse(storedIsActive) : false
  // })

  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const asSearchState = useAppSelector(
    (searchState) => searchState.currentSearch as ICurrentSearchState,
  )
  const isAiSearch = asSearchState.isAiSearch
  const showAdvancedSearch = isAdvancedSearch
  return (
    <React.Fragment>
      {showAdvancedSearch && !isMobile ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Header />
          <Navigation
            urlParams={urlParams}
            criteria={queryString !== '' ? JSON.parse(queryString) : null}
            search={search}
            isSwitchToSimpleSearch={isSwitchToSimpleSearch}
          />
          {isAiSearch ? (
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
