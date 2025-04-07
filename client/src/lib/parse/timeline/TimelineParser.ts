/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import { IOrderedItems } from '../../../types/ISearchResults'
import {
  ITimelinesTransformed,
  ITransformedData,
  TimelineSearchResult,
} from '../../../types/ITimelines'

export default class TimelineParser {
  timeline: TimelineSearchResult
  transformedTimelineData: { [key: string]: any } | null

  constructor(data: TimelineSearchResult) {
    this.timeline = data
    this.transformedTimelineData = null
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
   * @param {string} id; the id returned with each orderedItem
   * @returns {string}
   */
  static convertIdToSearchQueryParams(id: string): string {
    const idUrl = new URL(id)
    return idUrl.search
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
    searchTag: string,
  ): Array<ITransformedData> {
    const transformedFacets: Array<ITransformedData> = []
    for (const item of items) {
      const { value, totalItems, id } = item
      if (value !== null) {
        transformedFacets.push({
          value: TimelineParser.getYearFromSingleFacetValue(value as string),
          totalItems: totalItems as number,
          searchTag,
          id: this.convertIdToSearchQueryParams(id),
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
   * Returns the start and end index of the yearsRange to use for the timeline graph's brush.
   * Calculated based on Interquartile Range (IQR)
   *
   * @param { Array<string> } sortedKeys
   * @param { ITimelinesTransformed | null } transformedData
   * @param { Array<string> } yearsRange
   * @returns { initialStart: number; initialEnd: number }
   */
  static getStartAndEndIndex(
    sortedKeys: Array<string>,
    transformedData: ITimelinesTransformed | null,
    yearsRange: Array<string>,
  ): { initialStart: number; initialEnd: number } {
    // create an array of years where each year is repeated based on its total
    const proportionalYearArray = []
    for (const year of sortedKeys) {
      const totalForYear = transformedData ? transformedData[year].total : 0
      for (let i = 0; i < totalForYear; i++) {
        proportionalYearArray.push(year)
      }
    }

    // find the indexes that split the proportional data into lowest quarter and highest quarters
    const q1Index = Math.floor(proportionalYearArray.length / 4)
    const q3Index = Math.floor((proportionalYearArray.length / 4) * 3)

    // get the values at those indexes
    const q1 = parseInt(proportionalYearArray[q1Index], 10)
    const q3 = parseInt(proportionalYearArray[q3Index], 10)

    // calculate interquartile range (span of middle 50% of data)
    const iqr = q3 - q1

    // set a multiplication factor for iqr (larger means less datapoints are considered outliers, less means more data points are considered outliers)
    const factor = 1.5
    // calculate limits (quartiles +/- factor * iqr)
    const lowerLimit = Math.round(q1 - factor * iqr)
    const upperLimit = Math.round(q3 + factor * iqr)

    const earliestYear = parseInt(yearsRange[0], 10)
    const latestYear = parseInt(yearsRange[yearsRange.length - 1], 10)

    const output = {
      initialStart: lowerLimit < earliestYear ? 0 : lowerLimit - earliestYear,
      initialEnd:
        upperLimit > latestYear
          ? yearsRange.length - 1
          : upperLimit - earliestYear,
    }
    return output
  }

  /**
   * Returns the transformed timeline data for rendering
   * @param {Array<{[key: string]: ISearchResults}>} data; the data from the HAL link requests
   * @returns {ITimelinesTransformed}
   */
  getTransformedTimelineData(): { [key: string]: any } {
    // if we have already generated the transformedTimelineData, just return it
    if (this.transformedTimelineData !== null) {
      return this.transformedTimelineData
    }
    // otherwise, we haven't already generated the transformedTimelineData, we need to generated it

    let transformedData: Array<ITransformedData> = []

    for (const result of this.timeline) {
      // the key is the api endpoint to retreive the facet values
      for (const key of Object.keys(result)) {
        const { orderedItems } = result[key]
        const searchTag = TimelineParser.getSearchTagFromFacetedSearch(key)

        if (orderedItems !== null && orderedItems.length > 0) {
          transformedData = [
            ...transformedData,
            ...TimelineParser.addSearchTagToFacetValues(
              orderedItems,
              searchTag,
            ),
          ]
        }
      }
    }

    transformedData.filter((value) => value !== null)

    const dateCounts: { [key: string]: any } = {}
    for (const tData of transformedData) {
      const { value, totalItems, searchTag, id } = tData as ITransformedData
      const date = String(value)
      const individualDate = dateCounts[date]
      if (dateCounts.hasOwnProperty(date)) {
        individualDate.total += totalItems
        if (!individualDate.hasOwnProperty(searchTag)) {
          individualDate[searchTag] = {
            totalItems,
            searchParams: id,
          }
        } else {
          dateCounts[date][searchTag].totalItems += totalItems
        }
      } else {
        dateCounts[date] = {
          total: totalItems,
          [searchTag]: {
            totalItems,
            searchParams: id,
          },
        }
      }
    }

    this.transformedTimelineData = dateCounts
    return dateCounts
  }

  /**
   * Gets the sorted timeline years
   * @returns {Array<string>}
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
