import {
  formatDateJsonSearch,
  formatYear,
  getYearFromSingleFacetValue,
  // getYearsFromFacetValues,
} from '../../../../lib/facets/dateParser'
// import { IOrderedItems } from '../../../../types/ISearchResults'

describe('dateParser functions', () => {
  // const mockFacetValues: Array<IOrderedItems> = [
  //   {
  //     id: 'id',
  //     type: 'OrderedCollection',
  //     totalItems: 22,
  //     first: { id: 'first', type: 'test' },
  //     value: '1983-01-01T00:00:00Z',
  //   },
  //   {
  //     id: 'id',
  //     type: 'OrderedCollection',
  //     totalItems: 19,
  //     first: { id: 'first', type: 'test' },
  //     value: '-1980-01-01T00:00:00Z',
  //   },
  //   {
  //     id: 'id',
  //     type: 'OrderedCollection',
  //     totalItems: 18,
  //     first: { id: 'first', type: 'test' },
  //     value: '1977-01-01T00:00:00Z',
  //   },
  //   {
  //     id: 'id',
  //     type: 'OrderedCollection',
  //     totalItems: 17,
  //     first: { id: 'first', type: 'test' },
  //     value: '-1974-01-01T00:00:00Z',
  //   },
  //   {
  //     id: 'id',
  //     type: 'OrderedCollection',
  //     totalItems: 15,
  //     first: { id: 'first', type: 'test' },
  //     value: '1982-01-01T00:00:00Z',
  //   },
  // ]

  // describe('getYearsFromFacetValues', () => {
  //   it('returns sorted years from facetValues', () => {
  //     const years = getYearsFromFacetValues(mockFacetValues)
  //     expect(years).toEqual([-1980, -1974, 1977, 1982, 1983])
  //   })
  // })

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

  describe('formatYear', () => {
    it('returns a 4 digit year when passed a negative number', () => {
      const year = '-45'
      const formattedYear = formatYear(year)
      expect(formattedYear).toEqual('-0045')
    })

    it('returns a 4 digit year when passed a positive number', () => {
      const year = '4'
      const formattedYear = formatYear(year)
      expect(formattedYear).toEqual('0004')
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

    it('returns string with formatted search when given array of searchTerms', () => {
      const mockCriteria = {
        producedBy: {
          id: 'https://endpoint.yale.edu/data/person/783e7e6f-6863-4978-8aa3-9e6cd8cd8e83',
        },
      }
      const formattedYear = formatDateJsonSearch(
        '1980',
        ['producedDate', 'encounteredDate'],
        mockCriteria,
      )
      expect(formattedYear).toEqual(
        '{"AND":[{"producedBy":{"id":"https://endpoint.yale.edu/data/person/783e7e6f-6863-4978-8aa3-9e6cd8cd8e83"}},[{"AND":[{"producedDate":"1981","_comp":"<"},{"producedDate":"1979","_comp":">"}]},{"AND":[{"encounteredDate":"1981","_comp":"<"},{"encounteredDate":"1979","_comp":">"}]}]]}',
      )
    })
  })
})
