import { ISearchResults } from '../../types/ISearchResults'
import { ITimelinesTransformed, ITransformedData } from '../../types/ITimelines'
import { getCriteriaFromHalLink } from '../parse/search/halLinkHelper'
import {
  addSearchTagToFacetValues,
  getSearchTagFromFacetedSearch,
} from '../parse/search/timelineParser'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchTimelineData = (
  uri: string,
): Promise<{ [x: string]: any } | Error> =>
  fetch(uri)
    .then((response) =>
      response
        .text()
        .then((translatedString) => ({ [uri]: JSON.parse(translatedString) })),
    )
    .catch((e) => new Error('The requested facets could not be returned.'))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTimelines = (
  hrefs: Array<string>,
): Promise<{ data: (Error | { [x: string]: any })[] }> => {
  const promises = hrefs.map((href: string) => fetchTimelineData(href))
  return Promise.all(promises).then((result) => ({ data: result }))
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
 * Returns the sorted years with years that were not returned with the data in order to fill gaps in between years
 * @param {Array<string>} years; the sorted years
 * @returns {Array<string>}
 */
export const addYearsWithNoData = (years: Array<string>): Array<string> => {
  const allYears: Array<string> = []
  years.map((year, ind) => {
    const prevIndex = ind - 1
    const prevVal = parseInt(years[prevIndex], 10)
    const currVal = parseInt(year, 10)

    const gapBetweenYears = currVal - prevVal
    if (!isNaN(prevVal) && gapBetweenYears !== 1) {
      // eslint-disable-next-line no-plusplus
      for (let i = 1; i < gapBetweenYears; i++) {
        const emptyYear = (prevVal + i).toString()
        allYears.push(emptyYear)
      }
    }
    allYears.push(year)
    return null
  })
  return allYears
}

/**
 * Adds the correct year label to the string year
 * @param {string} year; the year to add the label
 * @returns {string}
 */
export const getYearWithLabel = (year: string): string =>
  year.includes('-') ? `${year.substring(1)} B.C.E.` : `${year} C.E.`
