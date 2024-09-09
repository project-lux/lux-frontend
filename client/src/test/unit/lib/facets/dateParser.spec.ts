import {
  formatDateJsonSearch,
  getYearFromSingleFacetValue,
  getYearsFromFacetValues,
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
      value: '-001980-01-01T00:00:00Z',
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
      value: '-001974-01-01T00:00:00Z',
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
      const year = getYearFromSingleFacetValue('-002017-10-20T00:00:00')
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
})
