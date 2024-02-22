import config, { getDataApiBaseUrl } from '../../../../../config/config'
import {
  getCriteriaFromHalLink,
  getResultTabFromHalLink,
  getScopeFromHalLink,
} from '../../../../../lib/parse/search/halLinkHelper'

describe('halLinkHelper', () => {
  config.env.dataApiBaseUrl = getDataApiBaseUrl()

  describe('getCriteriaFromHalLink', () => {
    it('returns formatted HAL link', () => {
      const mockHalLink = `${config.env.dataApiBaseUrl}api/facets/item?q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D&name=itemProductionDate`

      expect(getCriteriaFromHalLink(mockHalLink, 'facets')).toStrictEqual({
        producedBy: {
          id: 'https://endpoint.yale.edu/data/person/34f4eec7-7a03-49c8-b1be-976c2f6ba6ba',
        },
      })
    })
  })

  describe('getScopeFromHalLink', () => {
    it('returns the scope', () => {
      const mockHalLink = `${config.env.dataApiBaseUrl}api/related-list/concept?&name=relatedToAgent&uri=https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba`
      expect(getScopeFromHalLink(mockHalLink)).toEqual('concept')
    })
  })

  describe('getResultTabFromHalLink', () => {
    it('returns true if user is coming from landing page', () => {
      const mockHalLink = `${config.env.dataApiBaseUrl}api/facets/work?q=%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%5D%7D&name=workCreationDate`
      expect(getResultTabFromHalLink(mockHalLink)).toEqual('works')
    })
  })
})
