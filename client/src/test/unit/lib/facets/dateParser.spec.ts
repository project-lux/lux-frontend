import { numbersToMonths } from '../../../../config/advancedSearch/inputTypes'
import {
  daysInMonth,
  formatDateJsonSearch,
  getDaysInMonthArray,
  getDefaultAdvancedSearchDate,
  getLuxISOString,
  getLuxYear,
  getYearFromSingleFacetValue,
  getYearMonthDay,
  getYearToDisplay,
  getYearsFromFacetValues,
  isDayOrMonthToLuxNumberAsString,
  isValid,
  isValidDateObject,
} from '../../../../lib/facets/dateParser'
import { IOrderedItems } from '../../../../types/ISearchResults'

describe('dateParser functions', () => {
  const mockFacetValues: Array<IOrderedItems> = [
    {
      id: 'id',
      type: 'OrderedCollection',
      totalItems: 22,
      first: { id: 'first', type: 'test' },
      value: '1983-01-01T00:00:00Z',
    },
    {
      id: 'id',
      type: 'OrderedCollection',
      totalItems: 19,
      first: { id: 'first', type: 'test' },
      value: '-1980-01-01T00:00:00Z',
    },
    {
      id: 'id',
      type: 'OrderedCollection',
      totalItems: 18,
      first: { id: 'first', type: 'test' },
      value: '1977-01-01T00:00:00Z',
    },
    {
      id: 'id',
      type: 'OrderedCollection',
      totalItems: 17,
      first: { id: 'first', type: 'test' },
      value: '-1974-01-01T00:00:00Z',
    },
    {
      id: 'id',
      type: 'OrderedCollection',
      totalItems: 15,
      first: { id: 'first', type: 'test' },
      value: '1982-01-01T00:00:00Z',
    },
  ]

  describe('getYearsFromFacetValues', () => {
    it('returns sorted years from facetValues', () => {
      const years = getYearsFromFacetValues(mockFacetValues)
      expect(years).toEqual([-1980, -1974, 1977, 1982, 1983])
    })
  })

  describe('getYearFromSingleFacetValue', () => {
    it('returns BC year', () => {
      const year = getYearFromSingleFacetValue('-2017-10-20T00:00:00')
      expect(year).toEqual('-2017')
    })

    it('returns year', () => {
      const year = getYearFromSingleFacetValue('2017-10-20T00:00:00')
      expect(year).toEqual('2017')
    })
  })

  describe('formatDateJsonSearch', () => {
    it('returns string with formatted search when given single searchTerm', () => {
      const mockCriteria = {
        producedBy: {
          id: 'https://endpoint.yale.edu/data/person/783e7e6f-6863-4978-8aa3-9e6cd8cd8e83',
        },
      }
      const formattedYear = formatDateJsonSearch(
        '1980',
        'producedDate',
        mockCriteria,
      )
      expect(formattedYear).toEqual(
        '{"AND":[{"producedBy":{"id":"https://endpoint.yale.edu/data/person/783e7e6f-6863-4978-8aa3-9e6cd8cd8e83"}},{"producedDate":"1981","_comp":"<"},{"producedDate":"1979","_comp":">"}]}',
      )
    })
  })

  describe('daysInMonth', () => {
    it('returns February days in leap years', () => {
      const numberOfDays = daysInMonth(2, 2000)
      expect(numberOfDays).toEqual(29)
    })

    it('returns February in non-leap years', () => {
      const numberOfDays = daysInMonth(2, 2001)
      expect(numberOfDays).toEqual(28)
    })

    it('returns 30 days for specified months', () => {
      const monthsWithThirtyDays = [4, 6, 9, 11]
      const index = Math.floor(Math.random() * monthsWithThirtyDays.length)
      const month = monthsWithThirtyDays[index]
      const numberOfDays = daysInMonth(month, 2000)
      expect(numberOfDays).toEqual(30)
    })

    it('returns 31 days for specified months', () => {
      const monthsWithThirtyOneDays = [1, 3, 5, 7, 8, 10, 12]
      const index = Math.floor(Math.random() * monthsWithThirtyOneDays.length)
      const month = monthsWithThirtyOneDays[index]
      const numberOfDays = daysInMonth(month, 2000)
      expect(numberOfDays).toEqual(31)
    })
  })

  describe('isValid', () => {
    it('returns true', () => {
      // January has 31 days
      const valid = isValid(31, 1, 2000)
      expect(valid).toBeTruthy()
    })

    it('returns false', () => {
      // February does not have 31 days
      const valid = isValid(31, 2, 2000)
      expect(valid).toBeFalsy()
    })
  })

  describe('getYearMonthDay', () => {
    it('returns valid BCE values', () => {
      const bceDate = '-2-05-05T00:00:00.000Z'
      const values = getYearMonthDay(bceDate)
      expect(values).toStrictEqual({
        month: '05',
        day: '05',
        year: '-2',
      })
    })

    it('returns valid values if there is no year input or if there is only a negative symbol', () => {
      const emptyYear = '-05-05T00:00:00.000Z'
      const values = getYearMonthDay(emptyYear)
      expect(values).toStrictEqual({
        month: '05',
        day: '05',
        year: '',
      })
    })

    it('returns valid CE values', () => {
      const ceDate = '9-05-05T00:00:00.000Z'
      const values = getYearMonthDay(ceDate)
      expect(values).toStrictEqual({
        month: '05',
        day: '05',
        year: '9',
      })
    })
  })

  describe('getDefaultAdvancedSearchDate', () => {
    it('returns default values', () => {
      const bceDate = ''
      const values = getDefaultAdvancedSearchDate(bceDate)
      expect(values).toStrictEqual({
        month: '1',
        day: '1',
        year: '2024',
      })
    })
  })

  describe('getLuxYear', () => {
    it('returns empty string', () => {
      const year = ''
      const value = getLuxYear(year)
      expect(value).toEqual(year)
    })

    it('returns negative symbol', () => {
      const year = '-'
      const value = getLuxYear(year)
      expect(value).toEqual(year)
    })

    it('returns 1 if year entered is 0', () => {
      const year = '0'
      const value = getLuxYear(year)
      expect(value).toEqual('1')
    })

    it('returns year', () => {
      const year = '2024'
      const value = getLuxYear(year)
      expect(value).toEqual(year)
    })
  })

  describe('getDaysInMonthArray', () => {
    it('returns array of numbers', () => {
      const months = Object.keys(numbersToMonths)
      const index = Math.floor(Math.random() * months.length)
      const month = months[index]
      const mockYear = '2002'
      const numberOfDays = daysInMonth(
        parseInt(month, 10),
        parseInt(mockYear, 10),
      )
      const arr = getDaysInMonthArray(month, mockYear)
      expect(arr.length).toEqual(numberOfDays)
    })
  })

  describe('getLuxISOString', () => {
    it('returns ISO string', () => {
      const string = getLuxISOString('200', '5', '14')
      expect(string).toEqual('200-5-14T00:00:00.000Z')
    })
  })

  describe('isValidDateObject', () => {
    it('returns true', () => {
      const dateObj = new Date('0200-05-01T00:00:00.000Z')
      const isValidDate = isValidDateObject(dateObj)
      expect(isValidDate).toBeTruthy()
    })

    it('returns false', () => {
      const dateObj = new Date('200-5-1T00:00:00.000Z')
      const isValidDate = isValidDateObject(dateObj)
      expect(isValidDate).toBeFalsy()
    })
  })

  describe('isDayOrMonthToLuxNumberAsString', () => {
    it('returns number without preceding zeros', () => {
      const day = isDayOrMonthToLuxNumberAsString('01')
      expect(day).toEqual('1')
    })

    it('returns number', () => {
      const mockDay = '1'
      const day = isDayOrMonthToLuxNumberAsString(mockDay)
      expect(day).toEqual(mockDay)
    })
  })

  describe('getYearToDisplay', () => {
    it('returns the empty year', () => {
      const mockYear = ''
      const year = getYearToDisplay(mockYear)
      expect(year).toEqual(mockYear)
    })

    it('returns the year with only the negative symbol', () => {
      const mockYear = '-'
      const year = getYearToDisplay(mockYear)
      expect(year).toEqual(mockYear)
    })

    it('returns the year', () => {
      const mockYear = '-002024'
      const year = getYearToDisplay(mockYear)
      expect(year).toEqual('-2024')
    })
  })
})
