/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import { IAdvancedSearchState } from '../../../redux/slices/advancedSearchSlice'
import { IOrderedItems } from '../../../types/ISearchResults'
import { ITransformedData } from '../../../types/ITimelines'
import { getYearFromSingleFacetValue } from '../../facets/dateParser'

/**
 * Returns an array of the timeline data transformed from the results for rendering
 * @param {Array<IOrderedItems>} items; the results array
 * @param {ICriteria} criteria; the HAL link
 * @param {string} searchTag; the HAL link
 * @returns {Array<ITransformedData}
 */
export const addSearchTagToFacetValues = (
  items: Array<IOrderedItems>,
  criteria: IAdvancedSearchState,
  searchTag: string,
): Array<ITransformedData> => {
  const transformedFacets: Array<ITransformedData> = []
  for (const item of items) {
    const { value, totalItems } = item
    if (value !== null) {
      transformedFacets.push({
        value: getYearFromSingleFacetValue(value as string),
        totalItems: totalItems as number,
        searchTag,
        criteria,
      })
    }
  }

  return transformedFacets
}

/**
 * Returns the search tag from the HAL link
 * @param {string} halLink; the HAL link
 * @returns {string}
 */
export const getSearchTagFromFacetedSearch = (halLink: string): string => {
  const re = new RegExp(`${config.env.dataApiBaseUrl}api/facets/.*\\?`)
  const search = halLink.replace(re, '')

  const urlParams = new URLSearchParams(search)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const searchTag = urlParams.get('name') || ''
  return searchTag
}
