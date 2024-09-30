import config from '../../../../../config/config'
import {
  addSearchTagToFacetValues,
  formatDateJsonSearch,
  getSearchTagFromFacetedSearch,
  getYearFromSingleFacetValue,
  getYearWithLabel,
  sortTimelineData,
  transformTimelineData,
} from '../../../../../lib/parse/search/timelineParser'
import {
  timelineResults as mockTimelineResults,
  itemProductionDateFacetsTransformed as mockItemFacetsTransformed,
  itemProductionDateFacets as mockItemFacets,
  productionDateCriteria as mockCriteria,
  transformedTimelineFacets as mockTransformedResults,
} from '../../../../data/timelineResults'

describe('timelineParser', () => {
  describe('addSearchTagToFacetValues', () => {
    it('converts related lists results correctly', () => {
      const transformedResults = addSearchTagToFacetValues(
        mockItemFacets,
        mockCriteria,
        'itemProductionDate',
      )
      expect(transformedResults).toStrictEqual(mockItemFacetsTransformed)
    })
  })

  describe('getSearchTagFromFacetedSearch', () => {
    it('returns the search tag', () => {
      const mockSearchTag = 'itemProductionDate'
      const mockHalLink = `${config.env.dataApiBaseUrl}api/facets/item?q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D&name=${mockSearchTag}`

      expect(getSearchTagFromFacetedSearch(mockHalLink)).toEqual(mockSearchTag)
    })
  })

  describe('transformTimelineData', () => {
    it('converts related lists results correctly', () => {
      const translatedResults = transformTimelineData(mockTimelineResults)
      expect(translatedResults).toStrictEqual(mockTransformedResults)
    })
  })

  describe('sortTimelineData', () => {
    it('returns the sorted years', () => {
      const mockData = {
        '1': 'test',
        '4': 'test',
        '1000': 'test',
        '-40': 'test',
        '-20': 'test',
        '0': 'test',
      }

      const mockSortedData = ['-40', '-20', '0', '1', '4', '1000']
      expect(sortTimelineData(mockData)).toStrictEqual(mockSortedData)
    })
  })

  describe('getYearWithLabel', () => {
    it('returns the negative year with label', () => {
      const mockYear = '-2024'

      expect(getYearWithLabel(mockYear)).toEqual('2024 B.C.E.')
    })

    it('returns the positive year with label', () => {
      const mockYear = '2024'

      expect(getYearWithLabel(mockYear)).toEqual('2024 C.E.')
    })
  })

  describe('formatDateJsonSearch', () => {
    it('returns string with formatted search when given single searchTerm', () => {
      const mockJsonCriteria = {
        producedBy: {
          id: 'https://endpoint.yale.edu/data/person/783e7e6f-6863-4978-8aa3-9e6cd8cd8e83',
        },
      }
      const formattedYear = formatDateJsonSearch(
        '1980',
        'producedDate',
        mockJsonCriteria,
      )
      expect(formattedYear).toEqual(
        '{"AND":[{"producedBy":{"id":"https://endpoint.yale.edu/data/person/783e7e6f-6863-4978-8aa3-9e6cd8cd8e83"}},{"producedDate":"1980-12-31T00:00:00.000Z","_comp":"<="},{"producedDate":"1980-01-01T00:00:00.000Z","_comp":">="}]}',
      )
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
})
