/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import { IAdvancedSearchState } from '../../../redux/slices/advancedSearchSlice'
import { IOrderedItems, ISearchResults } from '../../../types/ISearchResults'
import { ITimelinesTransformed } from '../../../types/ITimelines'
import { getYearFromSingleFacetValue } from '../../facets/dateParser'

import { getCriteriaFromHalLink } from './halLinkHelper'

export interface ITransformedData {
  value: string | null
  totalItems: number
  searchTag: string
  criteria: IAdvancedSearchState
}

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

export const transformTimelineData = (
  data: Array<{
    [key: string]: ISearchResults
  }>,
): ITimelinesTransformed => {
  let transformedData: Array<ITransformedData> = []

  for (const result of data) {
    // the key is the api endpoint to retreive the facet values
    for (const key of Object.keys(result)) {
      const { orderedItems } = result[key]
      const criteria = getCriteriaFromHalLink(key, 'facets')
      const searchTag = getSearchTagFromFacetedSearch(key)

      if (orderedItems !== null && orderedItems.length > 0) {
        transformedData = [
          ...transformedData,
          ...addSearchTagToFacetValues(orderedItems, criteria, searchTag),
        ]
      }
    }
  }

  transformedData.filter((value) => value !== null)

  const dateCounts: { [key: string]: any } = {}
  for (const tData of transformedData) {
    const { value, totalItems, searchTag, criteria } = tData as ITransformedData
    const date = String(value)
    if (dateCounts.hasOwnProperty(date)) {
      dateCounts[date].total += totalItems
      if (!dateCounts[date].hasOwnProperty(searchTag)) {
        dateCounts[date][searchTag] = {
          totalItems,
          criteria,
        }
      }
    } else {
      dateCounts[date] = {
        total: totalItems,
        [searchTag]: {
          totalItems,
          criteria,
        },
      }
    }
  }

  return dateCounts
}

export const sortTimelineData = (
  timeline: Record<string, any>,
): Array<string> =>
  Object.keys(timeline).sort(
    (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  )
