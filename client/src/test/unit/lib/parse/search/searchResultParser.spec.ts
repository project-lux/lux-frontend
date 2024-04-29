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
    it('converts related lists results correctly', () => {
      const ids = getOrderedItemsIds(mockResults)
      expect(ids).toStrictEqual([`${config.env.dataApiBaseUrl}${mockEndpoint}`])
    })
  })
})
