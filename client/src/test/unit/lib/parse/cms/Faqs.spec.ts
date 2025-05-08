import { FaqGroupKey } from '../../../../../config/cms'
import { Faqs } from '../../../../../lib/parse/cms/Faqs'

const mockData = {
  title: 'When would I want to use Advanced Search?',
  body: '<p>Advanced Search allows you to pinpoint records...</p>',
  group: '3' as FaqGroupKey,
  sortWeight: -22,
}

const mockStore = {
  1: [],
  2: [],
  3: [mockData],
  4: [],
  5: [],
}

describe('Faqs exported functions', () => {
  describe('getFaqGroups', () => {
    const mockReturned = [
      {
        faqs: [mockData],
        key: '3',
        title: 'Advanced Search',
      },
    ]

    it('returns faq data', () => {
      const faqs = new Faqs()
      faqs.store = mockStore
      const data = faqs.getFaqGroups()
      expect(data).toEqual(mockReturned)
    })
  })

  describe('addToGroup', () => {
    it('returns faq data', () => {
      const faqs = new Faqs()
      faqs.addToGroup('3' as FaqGroupKey, mockData)
      expect(faqs.store).toEqual(mockStore)
    })
  })
})
