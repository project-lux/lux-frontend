import { getColumnWidth } from '../../../../lib/util/ui'

describe('ui exported functions', () => {
  describe('getColumnWidth', () => {
    it('returns array with column class names when false', () => {
      expect(getColumnWidth(false)).toStrictEqual(['col-md-9', 'col-md-3'])
    })

    it('returns array with column class names when true', () => {
      expect(getColumnWidth(true)).toStrictEqual(['col-md-12', 'col-md-12'])
    })
  })
})
