/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNumber, isString } from 'lodash'

import { IDateObj } from '../../facets/dateParser'

export default class LuxDate {
  date: string | number

  constructor(d?: string | number) {
    // if a number, multiply by 1000
    if (isNumber(d)) {
      this.date = (d * 1000).toString()
    }

    // default to empty string
    this.date = d || ''
  }

  getLuxDate(): string {
    const { day } = this.getDateObject()
    return day
  }

  getLuxMonth(): string {
    const { month } = this.getDateObject()
    return month
  }

  getLuxYear(): string {
    const { year } = this.getDateObject()
    return year
  }

  /**
   * Returns a loosely formatted ISO string that would not be valid for the Date object but is valid for parsing and rendering purposes
   * @param {string} date; the day selected
   * @param {string} month; the month selected
   * @param {string} year; the year selected
   * @returns {string}
   */
  // Used by facets, advanced search, and timelines
  getLuxISOString(): string {
    const { month, day, year } = this.getDateObject()
    return `${year}-${month}-${day}T00:00:00.000Z`
  }

  /**
   * Returns the year in the correct format for ISO date strings
   * @param {string} year; the year to be converted
   * @returns {string}
   */
  // Used by timelines, facets, and advanced search
  convertYearToISOYear(year: string): string {
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
  // Used by advanced search and getLUXTimestamp
  convertLuxISODateToISODate(date: string): Date {
    const { year, month, day } = this.getISOYearMonthDay(date)
    const dateObj = new Date(getLuxISOString(year, month, day))
    return dateObj
  }

  /**
   * Returns the year, month, and day based on what the user has selected
   * @param {string} date; the date string in a loose ISO format
   * @returns {IDateObj}
   */
  // Used by convertLuxISODateToISODate
  getISOYearMonthDay(): IDateObj {
    let month = '0'
    let day = '1'
    let year = ''

    const [dateString] = this.date.split('T')
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
  // Used by facets and advanced search
  getDateObject(): IDateObj {
    if (isString(this.date) && this.date === '') {
      return {
        month: '1',
        day: '1',
        year: '',
      }
    }

    return this.getISOYearMonthDay()
  }
}
