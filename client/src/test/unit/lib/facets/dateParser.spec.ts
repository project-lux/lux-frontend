import {
  formatDateJsonSearch,
  formatYear,
  getYearFromSingleFacetValue,
} from '../../../../lib/facets/dateParser'

describe('dateParser functions', () => {
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
  })
})
