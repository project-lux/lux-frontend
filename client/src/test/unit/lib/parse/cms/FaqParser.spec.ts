import { FaqGroupKey } from '../../../../../config/cms'
import { FaqParser } from '../../../../../lib/parse/cms/FaqParser'
import { IFaqsResponse } from '../../../../../redux/api/cmsApi'

const mockParser: IFaqsResponse = {
  data: [
    {
      attributes: {
        title: 'How do I use Advanced Search?',
        body: '<p>Advanced Search requires you to select a record type to begin the search.</p>',
        field_faq_tag: '3',
        field_sort_weight: -21,
      },
    },
    {
      attributes: {
        title: 'When would I want to use Advanced Search?',
        body: '<p>Advanced Search allows you to pinpoint records...</p>',
        field_faq_tag: '3',
        field_sort_weight: -22,
      },
    },
    {
      attributes: {
        title: 'How do I search LUX?',
        body: '<p>Enter one or more search terms.</p>',
        field_faq_tag: '2',
        field_sort_weight: -23,
      },
    },
  ],
}

const mockResult = [
  {
    faqs: [
      {
        title: 'When would I want to use Advanced Search?',
        body: '<p>Advanced Search allows you to pinpoint records...</p>',
        group: '3',
        sortWeight: -22,
      },
      {
        title: 'How do I use Advanced Search?',
        body: '<p>Advanced Search requires you to select a record type to begin the search.</p>',
        group: '3',
        sortWeight: -21,
      },
    ],
    key: '3',
    title: 'Advanced Search',
  },
]

describe('FaqParser exported functions', () => {
  describe('getFaqs', () => {
    it('returns faq data', () => {
      const parser = new FaqParser(mockParser)
      const data = parser.getFaqs([FaqGroupKey.ADVANCED_SEARCH])
      expect(data).toEqual(mockResult)
    })
  })
})
