import { getParamPrefix } from '../../../../lib/util/params'

describe('params', () => {
  describe('getParamPrefix', () => {
    it('returns first letter of search type', () => {
      const mockTab = 'people'
      expect(getParamPrefix(mockTab)).toEqual('a')
    })
  })
})
