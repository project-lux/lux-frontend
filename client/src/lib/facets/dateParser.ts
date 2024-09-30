/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */

import { IOrderedItems } from '../../types/ISearchResults'

export interface IDateObj {
  month: string
  day: string
  year: string
}

/**
 * Returns the year in the correct format for ISO date strings
 * @param {string} year; the year to be converted
 * @returns {string}
 */
export const convertYearToISOYear = (year: string): string => {
  const isoYear =
    year[0] === '-'
      ? `-${year.substring(1).padStart(6, '0')}`
      : year.padStart(4, '0')
  return isoYear
}

/**
 * Returns the date in the Javascript accepted ISO string format
 * @param {string} date; the date in LuxISOString format
 * @returns {string}
 */
export const convertLuxISODateToISODate = (date: string): Date => {
  const { year, month, day } = getISOYearMonthDay(date)
  const dateObj = new Date(getLuxISOString(year, month, day))
  return dateObj
}

/**
 * Returns the date in the Javascript accepted date timestamp
 * @param {string} date; the date in LuxISOString format
 * @returns {string}
 */
export const getLUXTimestamp = (luxISODate: string): number => {
  const dateObj = convertLuxISODateToISODate(luxISODate)
  if (isValidDateObject(dateObj)) {
    return dateObj.getTime()
  }
  return 0
}

// Advanced search functions (for now)

/**
 * Returns the number of days for a selected month and year
 * @param {number} m; the month selected
 * @param {number} y; the year selected
 * @returns {number}
 */
export const daysInMonth = (m: number, y: number): number => {
  // m starting index is 1, range is 1-12
  switch (m) {
    case 2:
      return (y % 4 === 0 && y % 100) || y % 400 === 0 ? 29 : 28
    case 9:
    case 4:
    case 6:
    case 11:
      return 30
    default:
      return 31
  }
}

/**
 * Checks if the day selected exists within the month selected and returns true/false
 * @param {number} d; the day selected
 * @param {number} m; the month selected
 * @param {number} y; the year selected
 * @returns {boolean}
 */
export const isValid = (d: number, m: number, y: number): boolean =>
  m >= 1 && m <= 12 && d > 0 && d <= daysInMonth(m, y)

/**
 * Returns the year, month, and day based on what the user has selected
 * @param {string} date; the date string in a loose ISO format
 * @returns {IDateObj}
 */
export const getISOYearMonthDay = (date: string): IDateObj => {
  let month = '0'
  let day = '1'
  let year = ''

  const [dateString] = date.split('T')
  // parse a BCE date
  if (dateString[0] === '-') {
    const temp = dateString.split('-')
    // if a user enters a negative plus a number
    if (temp.length === 4) {
      year = `-${temp[1]}`
      month = temp[2]
      day = temp[3]
      // user has no input in the year input
    } else {
      year = temp[0]
      month = temp[1]
      day = temp[2]
    }
  } else {
    ;[year, month, day] = dateString.split('-')
  }

  const isoYear =
    year !== '' && year !== '-' ? convertYearToISOYear(year) : year
  // have to add 1 to the value
  const isoMonth = month.padStart(2, '0')
  const isoDay = day.padStart(2, '0')

  return {
    month: isoMonth,
    day: isoDay,
    year: isoYear,
  }
}

/**
 * Returns the year, month, and day based on what the user has selected or the default values
 * @param {string} date; the date string in a loose ISO format or an empty string
 * @returns {IDateObj}
 */
export const getDefaultDate = (date: string): IDateObj => {
  if (date === '') {
    return {
      month: '1',
      day: '1',
      year: '',
    }
  }

  return getISOYearMonthDay(date)
}

/**
 * Validates the year and returns the appropriate value for displaying the year within the form
 * @param {string} year; the year selected
 * @returns {string}
 */
export const getLuxYear = (year: string): string => {
  if (year === '' || year === '-') {
    return year
  }

  // Check if year entered is 0
  const yearInt = parseInt(year, 10)
  if (yearInt === 0) {
    return '1'
  }

  return year
}

export const getDaysInMonthArray = (
  month: string,
  year: string,
): Array<string> => {
  const days = daysInMonth(parseInt(month, 10), parseInt(year, 10))
  const arr = []
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= days; i++) {
    arr.push(i.toString())
  }
  return arr
}

/**
 * Returns a loosely formatted ISO string that would not be valid for the Date object but is valid for parsing and rendering purposes
 * @param {string} date; the day selected
 * @param {string} month; the month selected
 * @param {string} year; the year selected
 * @returns {string}
 */
export const getLuxISOString = (
  year: string,
  month: string,
  date: string,
): string => `${year}-${month}-${date}T00:00:00.000Z`

/**
 * Returns the month with padded zeros
 * @param {string} month; the month selected
 * @returns {string}
 */
export const getISOMonth = (month: string): string => month.padStart(2, '0')

/**
 * Returns the day with padded zeros
 * @param {string} date; the day selected
 * @returns {string}
 */
export const getISODay = (date: string): string => date.padStart(2, '0')
/**
 * Checks if date is valid
 * @param {string | Date} date; the day selected
 * @returns {boolean}
 */
export const isValidDateObject = (dateObj: string | Date): boolean =>
  dateObj instanceof Date && !isNaN(dateObj.getTime())

/**
 * Checks if value given has leading 0s and displays appropriate number as a string
 * @param {string} value; the month or day to check
 * @returns {string}
 */
export const isDayOrMonthToLuxNumberAsString = (dayOrMonth: string): string =>
  dayOrMonth[0] === '0' ? dayOrMonth.substring(1) : dayOrMonth

/**
 * Returns a year without preceding zeros
 * @param {string} value; the month or day to check
 * @returns {string}
 */
export const getYearToDisplay = (year: string): string => {
  if (year === '' || year === '-') {
    return year
  }

  return parseInt(year, 10).toString()
}

// Facets functions (for now)

/**
 * Compares 2 values to determine if they are greater or less than each other
 * @param {IDateObj} a; the date to check
 * @param {IDateObj} b; the date to check
 * @returns {number}
 */
const sortByYears = (a: IDateObj, b: IDateObj): number => {
  const aInt = parseInt(a.year, 10)
  const bInt = parseInt(b.year, 10)

  if (aInt < bInt) {
    return -1
  }

  if (aInt > bInt) {
    return 1
  }

  return 0
}

/**
 * Returns an array of objects containing sorted dates
 * @param {Array<IOrderedItems>} facetValues; array of ordered items containing facet values
 * @returns {Array<IDateObj>}
 */
export const getDatesFromFacetValues = (
  facetValues: Array<IOrderedItems>,
): Array<IDateObj> => {
  const dates = facetValues
    .filter((facet) => facet.value !== null)
    .map((facet) => {
      const { value } = facet
      return getDefaultDate(String(value))
    })

  return dates.sort((a: IDateObj, b: IDateObj) => sortByYears(a, b))
}

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
