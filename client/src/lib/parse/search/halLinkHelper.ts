import config from '../../../config/config'
import { searchScope } from '../../../config/searchTypes'
import { IAdvancedSearchState } from '../../../redux/slices/advancedSearchSlice'

/**
 * Returns the search criteria from the HAL link as JSON
 * @param {string} halLink; the HAL link
 * @param {string} endpoint; the endpoint to remove
 * @returns {string}
 */
export const getAllParamsFromHalLink = (
  halLink: string,
  endpoint: string,
): string => {
  const re = new RegExp(`${config.env.dataApiBaseUrl}api/${endpoint}/.*\\?`)
  const search = halLink.replace(re, '')

  return search
}

/**
 * Returns the search criteria from the HAL link as JSON
 * @param {string} halLink; the HAL link
 * @param {string} endpoint; the endpoint to remove
 * @returns {IAdvancedSearchState}
 */
export const getCriteriaFromHalLink = (
  halLink: string,
  endpoint: string,
): IAdvancedSearchState => {
  const search = getAllParamsFromHalLink(halLink, endpoint)

  const urlParams = new URLSearchParams(search)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const criteria = JSON.parse(urlParams.get('q')!)
  return criteria
}

/**
 * Returns the search criteria from the HAL link
 * @param {string} halLink; the HAL link
 * @returns {IAdvancedSearchState}
 */
export const getScopeFromHalLink = (halLink: string): string => {
  for (const key of Object.keys(searchScope)) {
    if (halLink.includes(`/${searchScope[key]}`)) {
      return searchScope[key]
    }
  }

  return ''
}

/**
 * Returns the search criteria from the HAL link
 * @param {string} halLink; the HAL link
 * @returns {IAdvancedSearchState}
 */
export const getResultTabFromHalLink = (halLink: string): string => {
  for (const key of Object.keys(searchScope)) {
    if (halLink.includes(`/${searchScope[key]}`)) {
      return key
    }
  }

  return ''
}

/**
 * Returns the search criteria from the HAL link for a faceted search within an accordion
 * @param {string} criteria; the HAL link
 * @param {string | Array<string>} searchTerm; the search term(s) to append to the query
 * @param {relatedUri} string; the uri of the entity related to the current one being viewed
 * @returns {string}
 */
export const formatFacetedSearchJson = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  criteria: any,
  searchTerm: string | Array<string>,
  uri: string,
): string => {
  if (Array.isArray(searchTerm)) {
    const children = searchTerm.map((term) => ({
      [term]: {
        id: uri,
      },
    }))
    return JSON.stringify({
      AND: [
        criteria,
        {
          OR: children,
        },
      ],
    })
  }

  return JSON.stringify({
    AND: [
      criteria,
      {
        [searchTerm]: {
          id: uri,
        },
      },
    ],
  })
}
