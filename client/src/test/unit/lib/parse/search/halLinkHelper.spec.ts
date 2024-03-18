import config, { getDataApiBaseUrl } from '../../../../../config/config'
import {
  formatFacetedSearchJson,
  getAllParamsFromHalLink,
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

  describe('getAllParamsFromHalLink', () => {
    it('returns formatted HAL link', () => {
      const mockParams = `q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D&name=itemProductionDate`
      const mockHalLink = `${config.env.dataApiBaseUrl}api/facets/item?${mockParams}`

      expect(getAllParamsFromHalLink(mockHalLink, 'facets')).toEqual(mockParams)
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

  describe('formatFacetedSearchJson', () => {
    it('returns the criteria string', () => {
      const mockCriteria = {
        OR: [
          {
            classification: {
              id: `${config.env.dataApiBaseUrl}data/concept/bf572421-ad85-4b8b-9d14-d631371375df`,
            },
          },
          {
            language: {
              id: `${config.env.dataApiBaseUrl}data/concept/bf572421-ad85-4b8b-9d14-d631371375df`,
            },
          },
          {
            aboutConcept: {
              id: `${config.env.dataApiBaseUrl}data/concept/bf572421-ad85-4b8b-9d14-d631371375df`,
            },
          },
        ],
      }
      const mockSearchTerm = 'aboutAgent'
      const mockUri = `${config.env.dataApiBaseUrl}data/person/664d8608-156f-44cc-874e-a1afa70d960a`
      const mockResult =
        '{"AND":[{"OR":[{"classification":{"id":"https://endpoint.yale.edu/data/concept/bf572421-ad85-4b8b-9d14-d631371375df"}},{"language":{"id":"https://endpoint.yale.edu/data/concept/bf572421-ad85-4b8b-9d14-d631371375df"}},{"aboutConcept":{"id":"https://endpoint.yale.edu/data/concept/bf572421-ad85-4b8b-9d14-d631371375df"}}]},{"aboutAgent":{"id":"https://endpoint.yale.edu/data/person/664d8608-156f-44cc-874e-a1afa70d960a"}}]}'
      expect(
        formatFacetedSearchJson(mockCriteria, mockSearchTerm, mockUri),
      ).toEqual(mockResult)
    })
  })
})
