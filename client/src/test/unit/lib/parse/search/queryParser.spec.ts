import config, { getDataApiBaseUrl } from '../../../../../config/config'
import {
  isFromLandingPage,
  formatHalLink,
} from '../../../../../lib/parse/search/queryParser'

describe('queryParser', () => {
  config.env.dataApiBaseUrl = getDataApiBaseUrl()

  describe('formatHalLink', () => {
    it('returns formatted HAL link', () => {
      const mockHalLink =
        'https://endpoint.yale.edu/api/search/item?q=%7B%22OR%22%3A%5B%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F783e7e6f-6863-4978-8aa3-9e6cd8cd8e83%22%7D%7D%2C%7B%22encounteredBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F783e7e6f-6863-4978-8aa3-9e6cd8cd8e83%22%7D%7D%5D%7D'

      expect(formatHalLink(mockHalLink, 'item')).toEqual(
        '?q=%7B%22OR%22%3A%5B%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F783e7e6f-6863-4978-8aa3-9e6cd8cd8e83%22%7D%7D%2C%7B%22encounteredBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F783e7e6f-6863-4978-8aa3-9e6cd8cd8e83%22%7D%7D%5D%7D',
      )
    })
  })

  describe('isFromLandingPage', () => {
    it('returns true if user is coming from landing page', () => {
      const mockRouterState = { fromLandingPage: true }
      expect(isFromLandingPage(mockRouterState)).toBeTruthy()
    })

    it('returns false if user is coming from landing page', () => {
      const mockRouterState = { fromLandingPage: false }
      expect(isFromLandingPage(mockRouterState)).toBeFalsy()
    })
  })
})
