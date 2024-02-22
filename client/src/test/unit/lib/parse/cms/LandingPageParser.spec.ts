import {
  ILandingPage,
  LandingPageParser,
} from '../../../../../lib/parse/cms/LandingPageParser'

const mockLandingPageData: ILandingPage = {
  type: 'type',
  attributes: {
    field_what_is_lu: 'field_what_is_lu',
    field_more_about_lux: 'field_more_about_lux',
    field_footer_blocks: ['field_footer_blocks'],
  },
}

describe('LandingPageParser', () => {
  describe('getWhatIsLux', () => {
    it('returns object containing hero image data', () => {
      const parser = new LandingPageParser(mockLandingPageData)
      expect(parser.getWhatIsLux()).toEqual('field_what_is_lu')
    })
  })

  describe('getMoreAboutLux', () => {
    it('returns object containing hero image data', () => {
      const parser = new LandingPageParser(mockLandingPageData)
      expect(parser.getMoreAboutLux()).toEqual('field_more_about_lux')
    })
  })

  describe('getFooterBlocks', () => {
    it('returns object containing hero image data', () => {
      const parser = new LandingPageParser(mockLandingPageData)
      expect(parser.getFooterBlocks()).toEqual(['field_footer_blocks'])
    })
  })
})
