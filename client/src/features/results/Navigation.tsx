/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Row, Col, Nav } from 'react-bootstrap'
import { useAuth } from 'react-oidc-context'

import { useGetEstimatesQuery } from '../../redux/api/ml_api'
import { resetHelpTextState } from '../../redux/slices/helpTextSlice'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { resetState } from '../../redux/slices/advancedSearchSlice'
import { advancedSearchTitles, searchScope } from '../../config/searchTypes'
import StyledNavLink from '../../styles/features/results/NavLink'
import StyledNavbar from '../../styles/features/results/Navbar'
import LoadingSpinner from '../common/LoadingSpinner'
import {
  defaultEstimates,
  isAdvancedSearch,
  isSimpleSearch,
  redirectToTabWithResults,
} from '../../lib/parse/search/estimatesParser'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { ResultsTab } from '../../types/ResultsTab'
import { ICurrentSearchState } from '../../redux/slices/currentSearchSlice'
import {
  getFacetParamsForAdvancedSearchEstimatesRequest,
  getFacetParamsForSimpleSearchEstimatesRequest,
  getUrlState,
} from '../../lib/util/params'
import { getIcon } from '../../lib/advancedSearch/searchHelper'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { getUsername } from '../../lib/myCollections/helper'

import MyCollectionsNavBar from './MyCollectionsNavBar'

interface INavigation {
  urlParams: URLSearchParams
  criteria: any
  search: string
  isSwitchToSimpleSearch: boolean
  isMyCollectionsNestedTab?: boolean
}

const Navigation: React.FC<INavigation> = ({
  urlParams,
  criteria,
  search,
  isSwitchToSimpleSearch,
  isMyCollectionsNestedTab = false,
}) => {
  const auth = useAuth()
  const user = getUsername(auth)
  const forceRefetch = auth.isAuthenticated
  const viewingMyCollections = urlParams.get('viewingMyCollections')

  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const currentSearchState = useAppSelector(
    (state) => state.currentSearch as ICurrentSearchState,
  )

  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const { pathname, state } = useLocation() as {
    pathname: string
    state: { [key: string]: boolean }
  }

  const { tab, subTab } = useParams<keyof ResultsTab>() as ResultsTab
  const { qt, facetRequest, isFromSearchLink } = getUrlState(urlParams, tab)
  const searchType = isFromSearchLink
    ? 'advanced'
    : currentSearchState.searchType
  const advancedSearch = isAdvancedSearch(searchType)
  const simpleSearch = isSimpleSearch(searchType)
  const hasCriteria = criteria !== null && criteria !== undefined

  // Simple search estimates request
  const params =
    simpleSearch && !isSwitchToSimpleSearch
      ? getFacetParamsForSimpleSearchEstimatesRequest(
          criteria,
          urlParams,
          isMyCollectionsNestedTab,
        )
      : getFacetParamsForAdvancedSearchEstimatesRequest(criteria, urlParams, qt)

  const { data, isSuccess, isFetching, isLoading, isError } =
    useGetEstimatesQuery(
      {
        searchType,
        facetRequest,
        qt,
        params,
        isSwitchToSimpleSearch,
        user,
        viewingMyCollections,
      },
      {
        skip: auth.isLoading === true || !hasCriteria,
        forceRefetch,
      },
    )

  // set to estimates or set empty if no results
  const estimates: Record<string, number | string> = defaultEstimates(
    isSuccess,
    data,
  )

  // Get width of window
  useResizeableWindow(setIsMobile)

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

  const getClassNameOfNavLink = (key: string): string => {
    return `link ${advancedSearch ? 'advanced' : 'simple'}${
      pathname.includes(key) ? ' active' : ''
    }`
  }

  if (isMyCollectionsNestedTab) {
    return (
      <MyCollectionsNavBar
        searchQueryString={
          (advancedSearch && !urlParams.has('qt') && qt !== 'collections') ||
          isSwitchToSimpleSearch
            ? `${urlParams.toString()}&qt=${tab}`
            : urlParams.toString()
        }
        nestedPage={subTab as string}
        currentEstimates={estimates}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    )
  }
  if (!isMobile) {
    return (
      <Row className="mx-1 mt-3 d-block">
        <Col xs={12}>
          <StyledNavbar data-testid="results-page-navbar pb-0">
            <Nav
              className={`w-100 h-100 ${subTab ? '' : 'justify-content-between'} flex-row`}
            >
              {/* iterating over searchScopes to ensure the order the buttons are rendered */}
              {Object.entries(searchScope).map(([key, value]) => (
                <StyledNavLink
                  key={key}
                  to={`/view/results/${key}${key === 'collections' ? '/all' : ''}?${
                    (advancedSearch && !urlParams.has('qt') && key !== qt) ||
                    isSwitchToSimpleSearch
                      ? `${urlParams.toString()}&qt=${tab}`
                      : urlParams.toString()
                  }`}
                  className={getClassNameOfNavLink(key)}
                  onClick={() => {
                    pushClientEvent(
                      'Results Tab',
                      'Selected',
                      advancedSearchTitles[key],
                    )
                    if (advancedSearch && key !== tab) {
                      dispatch(resetState())
                      dispatch(resetHelpTextState())
                    }
                  }}
                  style={{
                    marginRight: key !== 'events' ? '10px' : '0px',
                  }}
                  id={key}
                  data-testid={`${key}-results-tab-button`}
                >
                  <Row className="pe-3">
                    <Col xs={12} sm={12} md={12} lg={12} xl={9}>
                      <Row className="d-flex float-start">
                        <Col xs={12} className="linkTitle d-flex float-start">
                          {advancedSearchTitles[key]}
                        </Col>
                        <Col xs={12} className="linkSubtext d-flex float-start">
                          {(simpleSearch && isLoading) ||
                          isFetching ||
                          (advancedSearch && isLoading) ? (
                            <LoadingSpinner size="sm" />
                          ) : (
                            estimates[key]
                          )}{' '}
                          results
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={3}
                      className="d-flex float-end"
                    >
                      <img
                        className="float-end navIcon"
                        src={getIcon(value)}
                        alt="icon"
                        aria-label="icon"
                        height={45}
                        width={45}
                      />
                    </Col>
                  </Row>
                </StyledNavLink>
              ))}
            </Nav>
          </StyledNavbar>
        </Col>
      </Row>
    )
  }

  return null
}

export default Navigation
