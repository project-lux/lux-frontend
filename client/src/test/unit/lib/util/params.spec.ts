import { getPageLength, getParamPrefix } from '../../../../lib/util/params'

describe('params', () => {
  describe('getParamPrefix', () => {
    it('returns first letter of search type', () => {
      const mockTab = 'people'
      expect(getParamPrefix(mockTab)).toEqual('a')
    })
  })

  describe('getPageLength', () => {
    it('returns the pageLength param when it is a positive whole number', () => {
      expect(getPageLength(new URLSearchParams('pageLength=45'))).toEqual(45)
    })

    it('returns 100 when the pageLength param is greater than 100', () => {
      expect(getPageLength(new URLSearchParams('pageLength=100'))).toEqual(100)
      expect(getPageLength(new URLSearchParams('pageLength=101'))).toEqual(100)
      expect(getPageLength(new URLSearchParams('pageLength=5000'))).toEqual(100)
    })

    it('returns 20 when the pageLength param is missing', () => {
      expect(getPageLength(new URLSearchParams('q=test'))).toEqual(20)
    })

    it('returns 20 when the pageLength param is invalid', () => {
      ;['abc', '20abc', '', '0', '-5', '2.5'].forEach((value) => {
        expect(
          getPageLength(new URLSearchParams(`pageLength=${value}`)),
        ).toEqual(20)
      })
    })
  })
})
