/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { useGetEstimatesQuery } from '../../redux/api/ml_api'
import { resetHelpTextState } from '../../redux/slices/helpTextSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { resetState } from '../../redux/slices/advancedSearchSlice'
import { searchScope } from '../../config/searchTypes'
import StyledNavLi from '../../styles/features/results/NavLi'
import StyledLink from '../../styles/features/results/Link'
import StyledNavbar from '../../styles/features/results/Navbar'
import LoadingSpinner from '../common/LoadingSpinner'
import {
  isAdvancedSearch,
  isSimpleSearch,
  redirectToTabWithResults,
} from '../../lib/parse/search/estimatesParser'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { ResultsTab } from '../../types/ResultsTab'
import { tabToLinkLabel } from '../../config/results'
import { ICurrentSearchState } from '../../redux/slices/currentSearchSlice'
import {
  getFacetParamsForAdvancedSearchEstimatesRequest,
  getFacetParamsForSimpleSearchEstimatesRequest,
} from '../../lib/util/params'

interface INavigation {
  urlParams: URLSearchParams
  criteria: any
  search: string
  isSwitchToSimpleSearch: boolean
}

const getUrlState = (
  urlParams: URLSearchParams,
  currentTab: string,
): {
  qt: string
  facetRequest: boolean
} => {
  const qt = urlParams.get('qt') || currentTab
  const facetRequest = urlParams.get('facetRequest') === 'true'
  return {
    qt,
    facetRequest,
  }
}

const Navigation: React.FC<INavigation> = ({
  urlParams,
  criteria,
  search,
  isSwitchToSimpleSearch,
}) => {
  const currentSearchState = useAppSelector(
    (state) => state.currentSearch as ICurrentSearchState,
  )

  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const { pathname, state } = useLocation() as {
    pathname: string
    state: { [key: string]: boolean }
  }

  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const { qt, facetRequest } = getUrlState(urlParams, tab)
  const { searchType } = currentSearchState
  const advancedSearch = isAdvancedSearch(searchType)
  const simpleSearch = isSimpleSearch(searchType)
  const hasCriteria = criteria !== null && criteria !== undefined
  // const isSwitchToSimpleSearch = urlParams.get('fromAdvanced') === 'true'

  // Simple search estimates request
  const params =
    simpleSearch && !isSwitchToSimpleSearch
      ? getFacetParamsForSimpleSearchEstimatesRequest(criteria, urlParams)
      : getFacetParamsForAdvancedSearchEstimatesRequest(criteria, urlParams, qt)

  const { data, isSuccess, isFetching, isLoading, isError } =
    useGetEstimatesQuery(
      {
        searchType,
        facetRequest,
        qt,
        params,
        isSwitchToSimpleSearch,
      },
      {
        skip: !hasCriteria,
      },
    )

  // set to estimates or set empty if no results
  const estimates: Record<string, number | string> =
    isSuccess && data ? data : {}

  // If there are any errors retrieving the endpoints set estimates to '-'
  if (isError || !hasCriteria) {
    Object.keys(searchScope).map((scope) => {
      estimates[scope] = '-'
      return null
    })
  }

  if (Object.keys(estimates).length === 0) {
    Object.keys(searchScope).map((key) => {
      estimates[key] = '-'
      return null
    })
  }

  // If performing a simple search, check if the current tab has results
  if (simpleSearch && !isError) {
    if (estimates[tab] === 0) {
      const tabWithResults = redirectToTabWithResults(data, state, tab)
      if (tabWithResults !== null) {
        navigate({
          pathname: pathname.replace(tab, tabWithResults),
          search,
        })
      }
    }
  }

  return (
    <Row className="mx-0">
      <Col xs={12}>
        <StyledNavbar data-testid="results-page-navbar">
          <ul>
            {/* iterating over searchScopes to ensure the order the buttons are rendered */}
            {Object.entries(searchScope).map(([key, value]) => (
              <StyledNavLi
                key={key}
                className={`me-4 pt-3 ${
                  key === tab && advancedSearch ? 'active' : ''
                }`}
              >
                <StyledLink
                  to={`/view/results/${key}?${
                    (advancedSearch && !urlParams.has('qt') && key !== qt) ||
                    isSwitchToSimpleSearch
                      ? `${urlParams.toString()}&qt=${tab}`
                      : urlParams.toString()
                  }`}
                  className={({ isActive }) =>
                    `link ${advancedSearch ? 'advanced' : 'simple'}${
                      isActive ? ' active' : ''
                    }`
                  }
                  state={{
                    targetName: 'Results Page',
                  }}
                  onClick={() => {
                    pushClientEvent(
                      'Results Tab',
                      'Selected',
                      tabToLinkLabel[key],
                    )
                    if (advancedSearch && key !== tab) {
                      dispatch(resetState())
                      dispatch(resetHelpTextState())
                    }
                  }}
                  data-testid={`${key}-results-tab-button`}
                >
                  {tabToLinkLabel[key]} (
                  {(simpleSearch && isLoading) ||
                  isFetching ||
                  (advancedSearch && isLoading) ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    estimates[key]
                  )}
                  )
                </StyledLink>
              </StyledNavLi>
            ))}
          </ul>
        </StyledNavbar>
      </Col>
    </Row>
  )
}

export default Navigation
