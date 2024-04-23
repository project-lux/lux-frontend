/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { isNull } from 'lodash'

import {
  useGetManyEstimatesQuery,
  useGetSingleEstimateQuery,
} from '../../redux/api/ml_api'
import { resetHelpTextState } from '../../redux/slices/helpTextSlice'
import { useAppDispatch } from '../../app/hooks'
import { resetState } from '../../redux/slices/advancedSearchSlice'
import { searchScope } from '../../config/searchTypes'
import StyledNavLi from '../../styles/features/results/NavLi'
import StyledLink from '../../styles/features/results/Link'
import StyledNavbar from '../../styles/features/results/Navbar'
import LoadingSpinner from '../common/LoadingSpinner'
import {
  redirectToTabWithResults,
  transformAdvancedSearchEstimates,
  transformSimpleSearchEstimates,
} from '../../lib/parse/search/estimatesParser'
import {
  getFacetParamsForSimpleSearchEstimatesRequest,
  getFacetParamsForAdvancedSearchEstimatesRequest,
} from '../../lib/util/params'
import { pushSiteImproveEvent } from '../../lib/siteImprove'
import { ResultsTab } from '../../types/ResultsTab'

const tabToLinkLabel: Record<string, string> = {
  objects: 'Objects',
  works: 'Works',
  people: 'People & Groups',
  places: 'Places',
  concepts: 'Concepts',
  events: 'Events',
}

interface INavigation {
  urlParams: URLSearchParams
  criteria: any
}

const Navigation: React.FC<INavigation> = ({ urlParams, criteria }) => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const { pathname, search, state } = useLocation() as {
    pathname: string
    search: string
    state: { [key: string]: boolean }
  }

  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const queryTab = urlParams.get('qt') || tab
  const isAdvancedSearch = !urlParams.has('sq')
  const isSimpleSearch = !isAdvancedSearch
  const hasCriteria = criteria !== null && criteria !== undefined
  const facetsRequest = urlParams.get('facetRequest')
  const simpleSearchParam = urlParams.has('sq') ? urlParams.get('sq') : ''

  // Simple search estimates request
  const params =
    isSimpleSearch && simpleSearchParam !== ''
      ? getFacetParamsForSimpleSearchEstimatesRequest(criteria, urlParams)
      : getFacetParamsForAdvancedSearchEstimatesRequest(
          criteria,
          urlParams,
          queryTab,
        )

  const {
    data: simpleSearchData,
    isSuccess: simpleSearchIsSuccess,
    isFetching: simpleSearchIsFetching,
    isLoading: simpleSearchIsLoading,
    isError: simpleSearchIsError,
  } = useGetManyEstimatesQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tabParams: params as Record<string, string>,
    },
    {
      skip: isAdvancedSearch || isNull(params) || simpleSearchParam === '',
    },
  )

  console.log(simpleSearchData)
  // Advanced search estimate request
  const {
    data: advancedSearchData,
    isSuccess: advancedSearchIsSuccess,
    isLoading: advancedSearchIsLoading,
    isError: advancedSearchIsError,
  } = useGetSingleEstimateQuery(
    {
      params: params as string,
      tab: queryTab,
    },
    {
      skip: (isSimpleSearch && !facetsRequest) || !hasCriteria,
    },
  )

  let estimates: Record<string, number | string> = {}
  // If there are any errors retrieving the endpoints set estimates to '-'
  if (
    (isSimpleSearch && simpleSearchIsError) ||
    (isAdvancedSearch && advancedSearchIsError) ||
    !hasCriteria
  ) {
    Object.keys(searchScope).map((scope) => {
      estimates[scope] = '-'
      return null
    })
  }

  // Get the estimates for a simple search if there are no errors
  if (isSimpleSearch && !simpleSearchIsError) {
    estimates = transformSimpleSearchEstimates(
      simpleSearchIsSuccess,
      simpleSearchData,
    )
  }

  // Get the estimates for an advanced search if there are no errors
  if (isAdvancedSearch && hasCriteria && !advancedSearchIsError) {
    estimates = transformAdvancedSearchEstimates(
      advancedSearchIsSuccess,
      advancedSearchData,
      queryTab,
    )
  }

  // If performing a simple search, check if the current tab has results
  if (isSimpleSearch && !simpleSearchIsError) {
    if (estimates[tab] === 0) {
      const tabWithResults = redirectToTabWithResults(
        simpleSearchData,
        state,
        tab,
      )
      if (tabWithResults !== null) {
        navigate({
          pathname: pathname.replace(tab, tabWithResults),
          search: search.toString(),
        })
      }
    }
  }

  if (Object.keys(estimates).length === 0) {
    Object.keys(searchScope).map((key) => {
      estimates[key] = '-'
      return null
    })
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
                  key === tab && isAdvancedSearch ? 'active' : ''
                }`}
              >
                <StyledLink
                  to={`/view/results/${key}?${
                    isAdvancedSearch && !urlParams.has('qt') && key !== queryTab
                      ? `${urlParams.toString()}&qt=${tab}`
                      : urlParams.toString()
                  }`}
                  className={({ isActive }) =>
                    `link ${isAdvancedSearch ? 'advanced' : 'simple'}${
                      isActive ? ' active' : ''
                    }`
                  }
                  onClick={() => {
                    pushSiteImproveEvent(
                      'Results Tab',
                      'Selected',
                      tabToLinkLabel[key],
                    )
                    if (isAdvancedSearch && key !== tab) {
                      dispatch(resetState())
                      dispatch(resetHelpTextState())
                    }
                  }}
                  data-testid={`${key}-results-tab-button`}
                >
                  {tabToLinkLabel[key]} (
                  {(isSimpleSearch && simpleSearchIsLoading) ||
                  simpleSearchIsFetching ||
                  (isAdvancedSearch && advancedSearchIsLoading) ? (
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
