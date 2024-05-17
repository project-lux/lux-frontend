import config from '../../../../../config/config'
import {
  addSearchTagToFacetValues,
  getSearchTagFromFacetedSearch,
} from '../../../../../lib/parse/search/timelineParser'
import {
  itemProductionDateFacetsTransformed as mockItemFacetsTransformed,
  itemProductionDateFacets as mockItemFacets,
  productionDateCriteria as mockCriteria,
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
})
