import {
  CmsResponseParser,
  ICmsResponse,
} from '../../../../../lib/parse/cms/Parser'

const returnedData = {
  type: 'type',
  attributes: {
    test: '',
  },
}

const mockParserData: ICmsResponse = {
  data: returnedData,
}

describe('CmsResponseParser', () => {
  describe('getLandingPage', () => {
    it('returns data from an array', () => {
      const mockParserDataWithArray: ICmsResponse = {
        data: [returnedData],
      }

      const parser = new CmsResponseParser(mockParserDataWithArray)
      expect(parser.getLandingPage()).toEqual(returnedData)
    })

    it('returns data from an object', () => {
      const parser = new CmsResponseParser(mockParserData)
      expect(parser.getLandingPage()).toEqual(returnedData)
    })
  })

  describe('getLandingPageImages', () => {
    it('returns array of images', () => {
      const parser = new CmsResponseParser(mockParserData)
      expect(parser.getLandingPageImages()).toEqual(returnedData)
    })
  })
})
