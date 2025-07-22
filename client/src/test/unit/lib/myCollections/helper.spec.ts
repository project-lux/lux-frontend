import config from '../../../../config/config'
import { addToCollectionObject } from '../../../../lib/myCollections/helper'
import { set as mockSet } from '../../../data/set'

describe('helper', () => {
  describe('addToCollectionObject', () => {
    it('returns broader ids', () => {
      const mockRecordToAdd = `${config.env.dataApiBaseUrl}data/set/12345`
      const newCollection = addToCollectionObject(mockSet, [mockRecordToAdd])
      expect(newCollection).toHaveProperty('containing')
    })
  })
})
