/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import { IAdvancedSearchState } from '../../../redux/slices/advancedSearchSlice'
import { IOrderedItems } from '../../../types/ISearchResults'
import {
  ITransformedData,
  TimelineSearchResult,
} from '../../../types/ITimelines'
import { getCriteriaFromHalLink } from '../search/halLinkHelper'

export default class TimelineParser {
  timeline: TimelineSearchResult

  constructor(data: TimelineSearchResult) {
    this.timeline = data
  }

  /**
   * Adds the correct year label to the string year
   * @param {string} year; the year to add the label
   * @returns {string}
   */
  static getYearWithLabel(year: string): string {
    return year.includes('-') ? `${year.substring(1)} B.C.E.` : `${year} C.E.`
  }

  /**
   * Returns the year from the date string provided
   * @param {string} facetValue; the date provided by the data as a string
   * @returns {string | null}
   */
  static getYearFromSingleFacetValue(facetValue: string): string | null {
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
  static addSearchTagToFacetValues(
    items: Array<IOrderedItems>,
    criteria: IAdvancedSearchState,
    searchTag: string,
  ): Array<ITransformedData> {
    const transformedFacets: Array<ITransformedData> = []
    for (const item of items) {
      const { value, totalItems } = item
      if (value !== null) {
        transformedFacets.push({
          value: TimelineParser.getYearFromSingleFacetValue(value as string),
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
  static getSearchTagFromFacetedSearch(halLink: string): string {
    const re = new RegExp(`${config.env.dataApiBaseUrl}api/facets/.*\\?`)
    const search = halLink.replace(re, '')

    const urlParams = new URLSearchParams(search)
    const searchTag = urlParams.get('name') || ''
    return searchTag
  }

  /**
   * Returns the sorted years with years that were not returned with the data in order to fill gaps in between years
   * @param {Array<string>} years; the sorted years
   * @returns {Array<string>}
   */
  static addYearsWithNoData(years: Array<string>): Array<string> {
    const allYears: Array<string> = []
    years.map((year, ind) => {
      const prevIndex = ind - 1
      const prevVal = parseInt(years[prevIndex], 10)
      const currVal = parseInt(year, 10)

      const gapBetweenYears = currVal - prevVal
      if (!isNaN(prevVal) && gapBetweenYears !== 1) {
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
   * Returns the transformed timeline data for rendering
   * @param {Array<{[key: string]: ISearchResults}>} data; the data from the HAL link requests
   * @returns {ITimelinesTransformed}
   */
  getTransformedTimelineData(): { [key: string]: any } {
    let transformedData: Array<ITransformedData> = []

    for (const result of this.timeline) {
      // the key is the api endpoint to retreive the facet values
      for (const key of Object.keys(result)) {
        const { orderedItems } = result[key]
        const criteria = getCriteriaFromHalLink(key, 'facets')
        const searchTag = TimelineParser.getSearchTagFromFacetedSearch(key)

        if (orderedItems !== null && orderedItems.length > 0) {
          transformedData = [
            ...transformedData,
            ...TimelineParser.addSearchTagToFacetValues(
              orderedItems,
              criteria,
              searchTag,
            ),
          ]
        }
      }
    }

    transformedData.filter((value) => value !== null)

    const dateCounts: { [key: string]: any } = {}
    for (const tData of transformedData) {
      const { value, totalItems, searchTag, criteria } =
        tData as ITransformedData
      const date = String(value)
      if (dateCounts.hasOwnProperty(date)) {
        dateCounts[date].total += totalItems
        if (!dateCounts[date].hasOwnProperty(searchTag)) {
          dateCounts[date][searchTag] = {
            totalItems,
            criteria,
          }
        } else {
          dateCounts[date][searchTag].totalItems += totalItems
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
   * Gets the data to be displayed in the About section
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getSortedTimelineYears(): Array<string> {
    return Object.keys(this.getTransformedTimelineData()).sort(
      (a: string, b: string) => parseInt(a, 10) - parseInt(b, 10),
    )
  }

  /**
   * Gets the data to be displayed in the About section
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getYearsForTimelineGraph(): Array<string> {
    const sortedYears = this.getSortedTimelineYears()
    const allYears: Array<string> = []
    sortedYears.map((year, ind) => {
      const prevIndex = ind - 1
      const prevVal = parseInt(sortedYears[prevIndex], 10)
      const currVal = parseInt(year, 10)

      const gapBetweenYears = currVal - prevVal
      if (!isNaN(prevVal) && gapBetweenYears !== 1) {
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
}
