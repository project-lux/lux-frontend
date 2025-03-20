import { checkForStopWords } from '../../../../lib/util/translate'

describe('translate', () => {
  describe('checkForStopWords', () => {
    it('returns search string with quotes', () => {
      const mockQueryString = 'within from, (without)'
      expect(checkForStopWords(mockQueryString)).toEqual(`"${mockQueryString}"`)
    })

    it('returns the original string', () => {
      const mockQueryString = 'people eat apples.'
      expect(checkForStopWords(mockQueryString)).toEqual(mockQueryString)
    })
  })
})
