import config from '../../../../../config/config'
import {
  getEstimates,
  getOrderedItemsIds,
} from '../../../../../lib/parse/search/searchResultParser'
import { activityStreams } from '../../../../data/results'

const mockEndpoint = 'data/object/12345'
const mockTotal = 10
const mockResults = activityStreams(mockEndpoint, mockTotal)

describe('searchResultParser', () => {
  describe('getEstimates', () => {
    it('converts related lists results correctly', () => {
      const estimate = getEstimates(mockResults)
      expect(estimate).toEqual(10)
    })
  })

  describe('getOrderedItemsIds', () => {
    it('returns array of strings', () => {
      const arr = getOrderedItemsIds(mockResults)
      expect(arr).toEqual([`${config.env.dataApiBaseUrl}${mockEndpoint}`])
    })

    it('returns empty array if data is null', () => {
      const arr = getOrderedItemsIds(null)
      expect(arr.length).toBe(0)
    })
  })
})
