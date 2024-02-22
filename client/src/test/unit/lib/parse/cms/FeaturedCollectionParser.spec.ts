import { FeaturedCollectionParser } from '../../../../../lib/parse/cms/FeaturedCollectionParser'
import { featuredBlockCmsResponse as mockCms } from '../../../../data/landingPageCmsResponse'

describe('FeaturedCollectionParser', () => {
  describe('getCollections', () => {
    it('returns an array', () => {
      const collections = new FeaturedCollectionParser(mockCms)
      const data = collections.getCollections([2, 4, 3, 5])
      expect(data).toEqual([
        {
          imageUrl: 'https://YPM-image-url.jpeg',
          imageAlt: 'field IIIF image title',
          title: 'YPM attributes title',
          bodyHtml: 'YPM body',
          searchUrl: 'field url path',
        },
        {
          imageUrl: 'https://YUL-image-url.jpeg',
          imageAlt: 'field IIIF image title',
          title: 'YUL attributes title',
          bodyHtml: 'YUL body',
          searchUrl: 'field url path',
        },
        {
          imageUrl: 'https://YUAG-image-url.jpeg',
          imageAlt: 'field IIIF image title',
          title: 'YUAG attributes title',
          bodyHtml: 'YUAG body',
          searchUrl: 'field url path',
        },
      ])
    })
  })
})
