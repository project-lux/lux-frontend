import { getPath } from '../../../../lib/util/uri'

describe('uri exported functions', () => {
  describe('getPath', () => {
    it('returns only pathname', () => {
      expect(
        getPath(
          'http://enpoint.yale.edu/view/set/7fab7de6-da35-4b50-bffe-b2b5e7bafff8',
        ),
      ).toEqual('set/7fab7de6-da35-4b50-bffe-b2b5e7bafff8')
    })
  })
})
