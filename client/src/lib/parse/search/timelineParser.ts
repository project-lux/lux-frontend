/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import { IAdvancedSearchState } from '../../../redux/slices/advancedSearchSlice'
import { IOrderedItems, ISearchResults } from '../../../types/ISearchResults'
import {
  ITimelinesTransformed,
  ITransformedData,
} from '../../../types/ITimelines'
import { convertYearToISOYear, getLuxISOString } from '../../facets/dateParser'

import { getCriteriaFromHalLink } from './halLinkHelper'

/**
 * Returns the year from the date string provided
 * @param {string} facetValue; the date provided by the data as a string
 * @returns {string | null}
 */
export const getYearFromSingleFacetValue = (
  facetValue: string,
): string | null => {
  const valueStr = String(facetValue)
  const date = new Date(valueStr)
  const utcFullYear = date.getUTCFullYear()
  if (!isNaN(utcFullYear)) {
    return utcFullYear.toString()
  }

  return null
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

/**
 * Returns the transformed timeline data for rendering
 * @param {Array<{[key: string]: ISearchResults}>} data; the data from the HAL link requests
 * @returns {ITimelinesTransformed}
 */
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

/**
 * Returns sorted object of timeline data based on the keys/years
 * @param {ITimelinesTransformed} timeline; the transformed timeline data
 * @returns {Array<string>}
 */
export const sortTimelineData = (
  timeline: Record<string, any>,
): Array<string> =>
  Object.keys(timeline).sort(
    (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
  )

/**
 * Adds the correct year label to the string year
 * @param {string} year; the year to add the label
 * @returns {string}
 */
export const getYearWithLabel = (year: string): string =>
  year.includes('-') ? `${year.substring(1)} B.C.E.` : `${year} C.E.`

export const formatDateJsonSearch = (
  year: string,
  searchTerm: string,
  criteria: any,
): string => {
  const earliestISODate = getLuxISOString(
    convertYearToISOYear(year),
    '01',
    '01',
  )
  const latestISODate = getLuxISOString(convertYearToISOYear(year), '12', '31')

  return JSON.stringify({
    AND: [
      criteria,
      { [searchTerm]: latestISODate, _comp: '<=' },
      { [searchTerm]: earliestISODate.toString(), _comp: '>=' },
    ],
  })
}
