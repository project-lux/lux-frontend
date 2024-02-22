import { searchScope } from '../../config/searchTypes'

export const getParamPrefix = (tab: string): string =>
  searchScope[tab].slice(0, 1)

/**
 * Function to format the requests for search estimates on each tab.
 * It returns an object with keys pertaining to the results tabs and their search criteria with any facets.
 * @param {Record<string, any>} criteria the search criteria from the q param in the url
 * @param {URLSearchParams} urlParams the search params from the current url
 * @returns {Record<string, string>}
 */
export const getFacetParamsForSimpleSearchEstimatesRequest = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  criteria: Record<string, any> | null,
  urlParams: URLSearchParams,
): Record<string, string> | null => {
  if (criteria) {
    const searchEstimatesParams: Record<string, string> = {}
    Object.entries(searchScope).map(([key, value]) => {
      const facetsParam = `${value.slice(0, 1)}f`
      if (urlParams.has(facetsParam)) {
        searchEstimatesParams[key] = `{"AND":[${JSON.stringify(
          criteria,
        )},${urlParams.get(facetsParam)}]}`
      } else {
        searchEstimatesParams[key] = JSON.stringify(criteria)
      }
      return null
    })

    return searchEstimatesParams
  }

  return null
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
  criteria: Record<string, any> | null,
  urlParams: URLSearchParams,
  queryTab: string,
): string | null => {
  if (criteria) {
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

  return null
}
