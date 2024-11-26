import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import theme from '../../styles/theme'
import AdvancedSearchContainer from '../advancedSearch/AdvancedSearchContainer'
import { ErrorFallback } from '../error/ErrorFallback'
import SearchContainer from '../search/SearchContainer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  ICurrentSearchState,
  changeCurrentSearchState,
} from '../../redux/slices/currentSearchSlice'
import { ResultsTab } from '../../types/ResultsTab'
import Header from '../advancedSearch/Header'

import Navigation from './Navigation'

interface IProps {
  isSimpleSearch: boolean
  urlParams: URLSearchParams
  queryString: string
  search: string
  isSwitchToSimpleSearch: boolean
}

const ResultsSearchContainer: React.FC<IProps> = ({
  isSimpleSearch,
  urlParams,
  queryString,
  search,
  isSwitchToSimpleSearch,
}) => {
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isSimpleSearch) {
      dispatch(changeCurrentSearchState({ value: 'advanced' }))
    } else {
      dispatch(changeCurrentSearchState({ value: 'simple' }))
    }
  }, [isSimpleSearch, dispatch])

  // Need width to determine if advanced search should be displayed
  const screenWidth = window.innerWidth

  const currentSearchState = useAppSelector(
    (state) => state.currentSearch as ICurrentSearchState,
  )

  return (
    <React.Fragment>
      {(currentSearchState.searchType === 'simple' ||
        screenWidth < theme.breakpoints.md) && (
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
      {!(
        currentSearchState.searchType === 'simple' ||
        screenWidth < theme.breakpoints.md
      ) && (
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
      )}
    </React.Fragment>
  )
}

export default ResultsSearchContainer
