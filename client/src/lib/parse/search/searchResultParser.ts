import { isUndefined } from 'lodash'

import { IPartOf, ISearchResults } from '../../../types/ISearchResults'
import { ISearchResponse } from '../../../types/ISearchResponse'

export const getEstimates = (data: ISearchResults): number => {
  const { partOf } = data
  if (partOf) {
    if (Array.isArray(partOf)) {
      for (const p of partOf) {
        if (p.totalItems) {
          return p.totalItems
        }
      }
    }

    if (typeof partOf === 'object') {
      const partOfObject = partOf as IPartOf
      if (partOfObject.totalItems) {
        return partOfObject.totalItems
      }
    }
  }
  return 0
}

/**
 * Returns the page number for the current results
 * @param {ISearchResults} data the data from the search results
 * @returns {number}
 */
export const getPageNumber = (data: ISearchResults): number => {
  const queryString = new URLSearchParams(data.id)
  return queryString.has('page') ? parseInt(queryString.get('page')!, 10) : 1
}

/**
 * Returns the list of UUIDs from the results
 * @param {ISearchResults} data the data from the search results
 * @returns {Array<string>}
 */
export const getOrderedItemsIds = (data?: ISearchResults): Array<string> => {
  if (isUndefined(data)) {
    return []
  }
  return data.orderedItems.map((item) => item.id)
}

/**
 * Determines if the requested results page no longer exists, for example after
 * the page length was increased while a later page was selected.
 * @param {ISearchResponse} searchResponse the response from the search request
 * @param {number} page the requested page
 * @param {number} pageLength the number of results per page
 * @returns {boolean}
 */
export const isPageOutOfRange = (
  searchResponse: ISearchResponse,
  page: number,
  pageLength: number,
): boolean => {
  const { data, isSuccess, isError, isFetching } = searchResponse
  // the first page always exists, and a response is needed to check later pages
  if (page <= 1 || isFetching) {
    return false
  }
  // the api may reject a page past the end, so treat an error on a later page as out of range
  if (isError) {
    return true
  }
  if (!isSuccess || !data) {
    return false
  }
  if (data.orderedItems.length === 0) {
    return true
  }
  const estimate = getEstimates(data)
  return estimate > 0 && page > Math.ceil(estimate / pageLength)
}
