/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */

import { isUndefined } from 'lodash'

import { IOrderedItems } from '../../types/ISearchResults'

// const sortFullDates = (a: string, b: string): number => {
//   const date1 = new Date(a).getTime()
//   const date2 = new Date(b).getTime()

//   if (date1 < date2) {
//     return -1
//   }

//   if (date1 > date2) {
//     return 1
//   }

//   return 0
// }

type dateFormat = 'yearMonthDay'
export const getFormattedDateFromTimestamp = (
  value: number,
  format?: dateFormat,
): string => {
  const date = new Date(value)
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  let year = date.getUTCFullYear().toString()

  if (year.length !== 4) {
    year = year.padStart(5 - year.length, '0')
  }

  if (!isUndefined(format) && format === 'yearMonthDay') {
    return `${year}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`
  }
  return `${month}/${day}/${year}`
}

// To be called when passing it to date input
export const getDateInputPlaceholder = (timestamp: number): string => {
  const date = new Date(timestamp)
  let year = date.getUTCFullYear().toString()

  if (year[0] === '-') {
    year = year.substring(1)
  }

  if (year.length !== 4) {
    year = year.padStart(4, '0')
  }

  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()
  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`
}

export const getTimestampFromFacetValue = (value: string): number => {
  if (value[0] === '-') {
    const splitDate = value.substring(1).split('-')
    splitDate[0] = splitDate[0].padStart(6, '0')
    const newDate = `-${splitDate.join('-')}`
    const date = new Date(newDate)
    return date.getTime()
  }

  const date = new Date(value)
  return date.getTime()
}

export const getTimestampsFromFacetValues = (
  facetValues: IOrderedItems[],
): number[] => {
  const dates = facetValues
    .filter((facet) => facet.value !== null)
    .map((facet) => {
      const { value } = facet
      return getTimestampFromFacetValue(String(value))
    })

  return dates
}

export const getYearFromSingleFacetValue = (
  facetValue: string,
): string | null => {
  const valueStr = String(facetValue)
  if (valueStr[0] === '-') {
    const date = new Date(valueStr.substring(1))
    const bcFullYear = date.getUTCFullYear()
    if (!isNaN(bcFullYear)) {
      const negativeYear = `-${bcFullYear.toString()}`
      return negativeYear
    }
  } else {
    const date = new Date(valueStr)
    const utcFullYear = date.getUTCFullYear()
    if (!isNaN(utcFullYear)) {
      return utcFullYear.toString()
    }
  }

  return null
}

export const formatYear = (year: number | string): string => {
  let stringYear = year.toString()
  if (stringYear[0] === '-') {
    stringYear = stringYear.replace('-', '')
    return `-${addLeadingZeros(stringYear)}`
  }

  return addLeadingZeros(stringYear)
}

const addLeadingZeros = (year: string): string => year.padStart(4, '0')

export const formatDateJsonSearch = (
  date: string,
  searchTerm: string,
  criteria: any,
): string => {
  // Add 1 to the given year to create a range of that given year from start to finish
  const laterDate = parseInt(date, 10) + 1
  // Subtract 1 to the given year to create a range of that given year from start to finish
  const earlierDate = parseInt(date, 10) - 1
  // TODO: uncomment when ML estimates are fixed
  // const end = parseInt(date, 10)
  // const start = parseInt(date, 10)

  return JSON.stringify({
    AND: [
      criteria,
      { [searchTerm]: laterDate.toString(), _comp: '<' },
      { [searchTerm]: earlierDate.toString(), _comp: '>' },
      // TODO: uncomment when ML estimates are fixed
      // {
      //   [searchTerm]: {
      //     start: start.toString(),
      //     end: end.toString(),
      //   },
      // },
    ],
  })
}

/**
 * Returns date range use selected to facet by
 * @param {string} facet the facet value which is formatted as "earliest to latest"
 * @returns {string}
 */
export const parseSelectedDateFacet = (facet: string): string => {
  const stringVal = facet as string
  return stringVal
  // const v = stringVal.split('to')
  // const e = v[0].trim()
  // const l = v[1].trim()
  // const earliestDate = getDateFromSingleFacetValue(e)
  // const latestDate = getDateFromSingleFacetValue(l)
  // return `${earliestDate} to ${latestDate}`
}

export const getEra = (timestamp: number): string => {
  const date = new Date(timestamp)
  const year = date.getUTCFullYear().toString()
  return year[0].includes('-') ? 'bce' : 'ce'
}
