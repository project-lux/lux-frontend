import React, { useEffect, useState } from 'react'
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
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'

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
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isSimpleSearch) {
      dispatch(changeCurrentSearchState({ value: 'advanced' }))
    } else {
      dispatch(changeCurrentSearchState({ value: 'simple' }))
    }
  }, [isSimpleSearch, dispatch])

  const currentSearchState = useAppSelector(
    (state) => state.currentSearch as ICurrentSearchState,
  )

  return (
    <React.Fragment>
      {(currentSearchState.searchType === 'simple' || isMobile) && (
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
      {!(currentSearchState.searchType === 'simple' || isMobile) && (
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
