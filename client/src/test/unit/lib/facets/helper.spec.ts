import config from '../../../../config/config'
import {
  buildQuery,
  getFacetValues,
  getLabel,
} from '../../../../lib/facets/helper'
import { facets as mockFacets } from '../../../data/facets'

describe('facet helper functions', () => {
  describe('getLabel', () => {
    it('returns facet label', () => {
      const label = getLabel('agent', 'agentHasDigitalImage', 'facetLabel', 1)
      expect(label).toEqual('Yes')
    })

    it('returns selected label', () => {
      const label = getLabel(
        'agent',
        'agentHasDigitalImage',
        'selectedLabel',
        1,
      )
      expect(label).toEqual('Has Digital Image')
    })
  })

  describe('buildQuery', () => {
    it('returns query', () => {
      const label = buildQuery('agent', 'agentHasDigitalImage', 1)
      expect(label).toEqual({ hasDigitalImage: 1 })
    })
  })

  describe('getFacetValues', () => {
    it('returns values array', () => {
      const values = getFacetValues(mockFacets)
      expect(values).toStrictEqual([
        `${config.env.dataApiBaseUrl}data/group/d07b9b86-0a1e-4026-aa4c-8ecba8bbd9c9`,
      ])
    })
  })
})
