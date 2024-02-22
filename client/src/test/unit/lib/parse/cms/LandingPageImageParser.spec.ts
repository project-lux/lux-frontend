import {
  ILandingPageImage,
  LandingPageImageParser,
} from '../../../../../lib/parse/cms/LandingPageImageParser'

const mockCmsImageArray: Array<ILandingPageImage> = [
  {
    type: 'landing_page_image',

    attributes: {
      title: 'A really cool image 1',
      field_chit_unit: ['2'],
      field_iiif_image: {
        uri: 'https://images.edu/iiif/2/image-1',
      },
      field_url_path: '/view/object/12345',
    },
  },
  {
    type: 'landing_page_image',

    attributes: {
      title: 'A really cool image 2',
      field_chit_unit: ['1'],
      field_iiif_image: {
        uri: 'https://images.edu/iiif/2/image-2',
      },
      field_url_path: '/view/object/54321',
    },
  },
  {
    type: 'landing_page_image',

    attributes: {
      title: 'A really cool image 3',
      field_chit_unit: ['4'],
      field_iiif_image: {
        uri: 'https://images.edu/iiif/2/image-3',
      },
      field_url_path: '/view/object/abcde',
    },
  },
]

describe('LandingPageImageParser', () => {
  describe('getHeroImage', () => {
    it('returns object containing hero image data', () => {
      const parser = new LandingPageImageParser(mockCmsImageArray)
      const data = parser.getHeroImage(1)
      expect(data).toEqual({
        url: 'https://images.edu/iiif/2/image-2',
        altText: 'A really cool image 2',
        caption: 'A really cool image 2',
        recordUrl: '/view/object/54321',
      })
    })
  })
})
