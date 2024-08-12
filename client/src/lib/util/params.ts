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
    Object.keys(searchScope).map((key) => {
      searchEstimatesParams[key] = JSON.stringify(criteria)
      return null
    })

    return searchEstimatesParams
  }

  return null
}
