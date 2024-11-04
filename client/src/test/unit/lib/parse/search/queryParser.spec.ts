import config, { getDataApiBaseUrl } from '../../../../../config/config'
import {
  isFromLandingPage,
  formatHalLink,
  convertToANDQuery,
} from '../../../../../lib/parse/search/queryParser'

describe('queryParser', () => {
  config.env.dataApiBaseUrl = getDataApiBaseUrl()

  describe('convertToANDQuery', () => {
    it('returns string wrapped in AND query', () => {
      const mockCriteria = `{"OR":[{"AND":[{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/6aab25df-680d-4ab7-8994-20418e10d4af"}},{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}}]},{"AND":[{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/6aab25df-680d-4ab7-8994-20418e10d4af"}},{"aboutAgent":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}}]},{"AND":[{"aboutAgent":{"id":"${config.env.dataApiBaseUrl}data/person/6aab25df-680d-4ab7-8994-20418e10d4af"}},{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}}]},{"AND":[{"aboutAgent":{"id":"${config.env.dataApiBaseUrl}data/person/6aab25df-680d-4ab7-8994-20418e10d4af"}},{"aboutAgent":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}}]}]}`

      expect(convertToANDQuery(mockCriteria)).toEqual(
        `{"AND":[{"OR":[{"AND":[{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/6aab25df-680d-4ab7-8994-20418e10d4af"}},{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}}]},{"AND":[{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/6aab25df-680d-4ab7-8994-20418e10d4af"}},{"aboutAgent":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}}]},{"AND":[{"aboutAgent":{"id":"${config.env.dataApiBaseUrl}data/person/6aab25df-680d-4ab7-8994-20418e10d4af"}},{"createdBy":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}}]},{"AND":[{"aboutAgent":{"id":"${config.env.dataApiBaseUrl}data/person/6aab25df-680d-4ab7-8994-20418e10d4af"}},{"aboutAgent":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}}]}]}]}`,
      )
    })

    it('returns criteria string', () => {
      const mockCriteria = `{"AND":[{"producedBy":{"id":"${config.env.dataApiBaseUrl}data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba"}},{"material":{"id":"https://lux-front-tst.collections.yale.edu/data/concept/f9412911-af4c-45c9-86f1-d2dac953dff9"}}]}`

      expect(convertToANDQuery(mockCriteria)).toEqual(mockCriteria)
    })
  })

  describe('formatHalLink', () => {
    it('returns formatted HAL link', () => {
      const mockHalLink = `${config.env.dataApiBaseUrl}api/search/item?q=%7B%22OR%22%3A%5B%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F783e7e6f-6863-4978-8aa3-9e6cd8cd8e83%22%7D%7D%2C%7B%22encounteredBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F783e7e6f-6863-4978-8aa3-9e6cd8cd8e83%22%7D%7D%5D%7D`

      expect(formatHalLink(mockHalLink, 'item')).toEqual(
        'q=%7B%22AND%22%3A%5B%7B%22OR%22%3A%5B%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F783e7e6f-6863-4978-8aa3-9e6cd8cd8e83%22%7D%7D%2C%7B%22encounteredBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F783e7e6f-6863-4978-8aa3-9e6cd8cd8e83%22%7D%7D%5D%7D%5D%7D',
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
