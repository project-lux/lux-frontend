import { isUndefined } from 'lodash'

import {
  DEFAULT_PAGE_LENGTH,
  MAX_PAGE_LENGTH,
  searchScope,
} from '../../config/searchTypes'

export const getParamPrefix = (tab: string): string =>
  searchScope[tab].slice(0, 1)

/**
 * Returns the pageLength param from the url, falling back to the default
 * page length if it is missing or not a positive whole number, and capping
 * it at the max page length
 * @param {URLSearchParams} urlParams the current url params
 * @returns {number}
 */
export const getPageLength = (urlParams: URLSearchParams): number => {
  const pageLength = Number(urlParams.get('pageLength'))
  if (!Number.isInteger(pageLength) || pageLength <= 0) {
    return DEFAULT_PAGE_LENGTH
  }
  return Math.min(pageLength, MAX_PAGE_LENGTH)
}

/**
 * Function to format the requests for search estimates on each tab.
 * It returns an object with keys pertaining to the results tabs and their search criteria with any facets.
 * @param {Record<string, any>} criteria the search criteria from the q param in the url
 * @returns {Record<string, string>}
 */
export const getFacetParamsForSimpleSearchEstimatesRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  criteria: Record<string, any>,
  urlParams: URLSearchParams,
): Record<string, string> => {
  const searchEstimatesParams: Record<string, string> = {}
  Object.entries(searchScope).map(([key, value]) => {
    let newCriteria = JSON.stringify(criteria)
    // Add facets to criteria
    const facetsParam = `${value.slice(0, 1)}f`
    if (urlParams.has(facetsParam)) {
      newCriteria = `{"AND":[${JSON.stringify(
        criteria,
      )},${urlParams.get(facetsParam)}]}`
    }

    searchEstimatesParams[key] = newCriteria
    return null
  })

  return searchEstimatesParams
}

/**
 * Function to format the requests for search estimates on each tab.
 * It returns an object with keys pertaining to the results tabs and their search criteria with any facets.
 * @param {Record<string, any>} criteria the search criteria from the q param in the url
 * @param {URLSearchParams} urlParams the search params from the current url
 * @returns {Record<string, string>}
 */
export const getFacetParamsForAdvancedSearchEstimatesRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  criteria: Record<string, any>,
  urlParams: URLSearchParams,
  queryTab?: string,
): string => {
  if (isUndefined(queryTab)) {
    return ''
  }

  let searchEstimatesParams = ''
  const facetsParam = `${getParamPrefix(queryTab)}f`
  if (urlParams.has(facetsParam)) {
    searchEstimatesParams = `{"AND":[${JSON.stringify(
      criteria,
    )},${urlParams.get(facetsParam)}]}`
  } else {
    searchEstimatesParams = JSON.stringify(criteria)
  }
  return searchEstimatesParams
}

/**
 * Function that returns the current query and if it is a facet request
 * @param {URLSearchParams} urlParams the search params from the current url
 * @param {string} currentTab the current tab
 * @returns {Record<string, string | boolean>}
 */
export const getUrlState = (
  urlParams: URLSearchParams,
  currentTab: string,
): {
  qt: string
  facetRequest: boolean
  searchType: string
} => {
  const qt = urlParams.get('qt') || currentTab
  const facetRequest = urlParams.get('facetRequest') === 'true'
  const searchType = urlParams.get('searchType') || 'simple'
  return {
    qt,
    facetRequest,
    searchType,
  }
}
