import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'

import theme from '../../styles/theme'
import AdvancedSearchContainer from '../advancedSearch/AdvancedSearchContainer'
import { ErrorFallback } from '../error/ErrorFallback'
import SearchBoxContainer from '../search/SearchContainer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  ICurrentSearchState,
  changeCurrentSearchState,
} from '../../redux/slices/currentSearchSlice'
import { ResultsTab } from '../../types/ResultsTab'

interface IProps {
  isSimpleSearch: boolean
}

const ResultsSearchContainer: React.FC<IProps> = ({ isSimpleSearch }) => {
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
      {currentSearchState.searchType === 'simple' ||
      screenWidth < theme.breakpoints.md ? (
        <SearchBoxContainer
          className="resultsSearchContainer"
          bgColor="transparent"
          id="results-search-container"
          isResultsPage
        />
      ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AdvancedSearchContainer key={tab} />
        </ErrorBoundary>
      )}
    </React.Fragment>
  )
}

export default ResultsSearchContainer
