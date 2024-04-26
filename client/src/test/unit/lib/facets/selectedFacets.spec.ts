import { getSelectedFacets } from '../../../../lib/facets/selectedFacets'

describe('selectedFacets functions', () => {
  describe('getSelectedFacets', () => {
    it('returns', () => {
      const criteria = {
        AND: [
          {
            classification: {
              id: 'https://endpoint.yale.edu/data/test-id-1',
            },
          },
          {
            producedDate: '1800',
            _comp: '>=',
          },
          {
            producedDate: '1900',
            _comp: '<=',
          },
          {
            memberOf: { id: 'https://endpoint.yale.edu/data/test-id-3' },
          },
          {
            memberOf: {
              curatedBy: {
                OR: [
                  {
                    memberOf: {
                      id: 'https://endpoint.yale.edu/data/test-id-3',
                    },
                  },
                  {
                    id: 'https://endpoint.yale.edu/data/test-id-3',
                  },
                ],
              },
            },
          },
          {
            hasDigitalImage: 1,
          },
        ],
      }
      const criteriaMapJson = {
        responsibleUnits: new Set(['https://endpoint.yale.edu/data/test-id-3']),
        responsibleCollections: new Set([
          'https://endpoint.yale.edu/data/test-id-3',
        ]),
        itemTypeId: new Set(['https://endpoint.yale.edu/data/test-id-1']),
        itemHasDigitalImage: new Set([1]),
        itemProductionDate: new Set(['1800 to 1900']),
      }
      const criteriaMap = new Map(Object.entries(criteriaMapJson))
      const selected = getSelectedFacets(criteria, 'item')
      expect(selected).toEqual(criteriaMap)
    })
  })
})
