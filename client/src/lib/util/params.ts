import { nestedPageLinks } from '../../config/myCollections/resultsTabs'
import { searchScope } from '../../config/searchTypes'

export const getParamPrefix = (tab: string): string =>
  searchScope[tab].slice(0, 1)

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
  isMyCollectionsNestedTab: boolean,
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

    if (key === 'collections' && isMyCollectionsNestedTab) {
      Object.keys(nestedPageLinks).map((page) => {
        searchEstimatesParams[page] = newCriteria
      })
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
  queryTab: string,
): string => {
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
  isFromSearchLink: boolean
} => {
  const qt = urlParams.get('qt') || currentTab
  const facetRequest = urlParams.get('facetRequest') === 'true'
  const isFromSearchLink = urlParams.has('searchLink')
  return {
    qt,
    facetRequest,
    isFromSearchLink,
  }
}
