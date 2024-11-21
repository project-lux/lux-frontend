/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Row, Col, Nav } from 'react-bootstrap'

import { useGetEstimatesQuery } from '../../redux/api/ml_api'
import { resetHelpTextState } from '../../redux/slices/helpTextSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { resetState } from '../../redux/slices/advancedSearchSlice'
import { searchScope } from '../../config/searchTypes'
import StyledNavLink from '../../styles/features/results/NavLink'
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
import { getIcon } from '../../lib/advancedSearch/searchHelper'

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
    isSuccess && data
      ? data
      : {
          objects: '-',
          works: '-',
          people: '-',
          places: '-',
          concepts: '-',
          events: '-',
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
    <Row className="mx-1 mt-3">
      <Col xs={12}>
        <StyledNavbar data-testid="results-page-navbar pb-0">
          <Nav className="w-100 h-100 justify-content-between flex-row">
            {/* iterating over searchScopes to ensure the order the buttons are rendered */}
            {Object.entries(searchScope).map(([key, value]) => (
              <StyledNavLink
                key={key}
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
                style={{
                  marginRight: key !== 'events' ? '10px' : '0px',
                }}
                data-testid={`${key}-results-tab-button`}
              >
                <div className="float-start">
                  <span className="linkTitle float-start">
                    {tabToLinkLabel[key]}
                  </span>
                  <br />
                  <span className="linkSubtext">
                    {(simpleSearch && isLoading) ||
                    isFetching ||
                    (advancedSearch && isLoading) ? (
                      <LoadingSpinner size="sm" />
                    ) : (
                      estimates[key]
                    )}{' '}
                    results
                  </span>
                </div>
                <div className="float-end">
                  <img
                    className="float-end navIcon"
                    src={getIcon(value)}
                    alt="icon"
                    aria-label="icon"
                    height={45}
                    width={45}
                  />
                </div>
              </StyledNavLink>
            ))}
          </Nav>
        </StyledNavbar>
      </Col>
    </Row>
  )
}

export default Navigation
