import { buildQuery, getLabel } from '../../../../lib/facets/helper'

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
})
