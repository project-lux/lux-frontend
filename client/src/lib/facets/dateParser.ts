/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */

import { IOrderedItems } from '../../types/ISearchResults'

const sortYears = (a: number, b: number): number => {
  if (a < b) {
    return -1
  }

  if (a > b) {
    return 1
  }

  return 0
}

const sortFullDates = (a: string, b: string): number => {
  const date1 = new Date(a).getTime()
  const date2 = new Date(b).getTime()

  if (date1 < date2) {
    return -1
  }

  if (date1 > date2) {
    return 1
  }

  return 0
}

/* eslint-disable consistent-return */
export const getDatesFromFacetValues = (
  facetValues: IOrderedItems[],
): string[] => {
  const dates = facetValues
    .filter((facet) => facet.value !== null)
    .map((facet) => {
      const { value } = facet
      return getDateFromSingleFacetValue(String(value))
    })

  return dates
    .filter((date): date is string => date !== undefined)
    .sort((a: string, b: string) => sortFullDates(a, b))
}

export const getDateFromSingleFacetValue = (facetValue: string): string => {
  let month
  let day
  let year
  const valueStr = String(facetValue)
  if (valueStr[0] === '-') {
    const date = new Date(valueStr.substring(1))
    month = date.getUTCMonth() + 1
    day = date.getUTCDate()
    year = `-${date.getUTCFullYear()}`
    return `${month}/${day}/${year}`
  }

  const date = new Date(valueStr)
  month = date.getUTCMonth() + 1
  day = date.getUTCDate()
  year = date.getUTCFullYear()
  return `${month}/${day}/${year}`
}

/* eslint-disable consistent-return */
export const getYearsFromFacetValues = (
  facetValues: IOrderedItems[],
): number[] => {
  const years = facetValues
    .filter((facet) => facet.value !== null)
    .map((facet) => {
      const { value } = facet
      const transformedYear = getYearFromSingleFacetValue(String(value))
      return transformedYear !== null
        ? parseInt(transformedYear, 10)
        : undefined
    })

  return years
    .filter((year): year is number => year !== undefined)
    .sort((a: any, b: any) => sortYears(a, b))
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
