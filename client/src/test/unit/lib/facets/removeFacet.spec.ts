import {
  removeFacet,
  removeFacetFromQuery,
} from '../../../../lib/facets/removeFacet'
import { getParamPrefix } from '../../../../lib/util/params'

// Mock getParamPrefix
jest.mock('../../../../lib/util/params', () => ({
  __esModule: true,
  getParamPrefix: jest.fn(() => 'a'),
}))

describe('removeFacet exported functions', () => {
  describe('removeFacet function', () => {
    beforeEach(async () => {
      // Call getParamPrefix mock
      const prefix = getParamPrefix as jest.MockedFunction<
        typeof getParamPrefix
      >
      prefix.mockImplementation(() => 'a')
    })

    it('returns new query string', () => {
      const targetFacet = 'itemTypeId'
      const targetValue = 'https://endpoint.yale.edu/data/test1'
      const search =
        '?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&sq=andy+warhol&ip=1&facetRequest=true&if=%7B%22AND%22%3A%5B%7B%22classification%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%test%2F1%22%7D%7D%5D%7D'
      const facetQuery = {
        AND: [
          {
            classification: {
              id: targetValue,
            },
          },
          {
            producedBy: {
              id: 'https://endpoint.yale.edu/data/test2',
            },
          },
        ],
      }
      const newQueryString =
        'q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&sq=andy+warhol&ip=1&facetRequest=true&if=%7B%22AND%22%3A%5B%7B%22classification%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%25test%2F1%22%7D%7D%5D%7D&af=%7B%22AND%22%3A%5B%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Ftest2%22%7D%7D%5D%7D&ap=1'

      expect(
        removeFacet(
          targetFacet,
          targetValue,
          search,
          facetQuery,
          'item',
          'objects',
        ),
      ).toEqual(newQueryString)
    })
  })

  describe('removeFacetFromQuery', () => {
    it('returns a new object after removing date facets', () => {
      const targetFacet = 'itemProductionDate'
      const targetValue = '1800 to 1900'
      const facetQuery = {
        AND: [
          {
            classification: {
              id: 'testId',
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
        ],
      }
      const scope = 'item'
      const removeFromQuery = removeFacetFromQuery(
        targetFacet,
        targetValue,
        facetQuery,
        scope,
      )
      expect(removeFromQuery).toEqual({
        AND: [
          {
            classification: {
              id: 'testId',
            },
          },
        ],
      })
    })

    it('returns a new object when given a valid targetFacet', () => {
      const targetFacet = 'itemTypeId'
      const targetValue = 'https://endpoint.yale.edu/data/test-id-1'
      const facetQuery = {
        AND: [
          {
            classification: {
              id: 'https://endpoint.yale.edu/data/test-id-1',
            },
          },
          {
            producedBy: {
              id: 'https://endpoint.yale.edu/data/test-id-2',
            },
          },
        ],
      }
      const scope = 'item'
      const removeFromQuery = removeFacetFromQuery(
        targetFacet,
        targetValue,
        facetQuery,
        scope,
      )
      expect(removeFromQuery).toEqual({
        AND: [
          {
            producedBy: {
              id: 'https://endpoint.yale.edu/data/test-id-2',
            },
          },
        ],
      })
    })

    it('returns a new object when removing a collection or unit', () => {
      const targetFacet = 'responsibleCollections'
      const targetValue = 'https://endpoint.yale.edu/data/test-id-2'
      const facetQuery = {
        AND: [
          {
            classification: {
              id: 'https://endpoint.yale.edu/data/test-id-1',
            },
          },
          {
            OR: [
              {
                memberOf: {
                  curatedBy: {
                    memberOf: {
                      id: 'https://endpoint.yale.edu/data/test-id-2',
                    },
                  },
                },
              },
              {
                memberOf: {
                  curatedBy: {
                    id: 'https://endpoint.yale.edu/data/test-id-2',
                  },
                },
              },
            ],
          },
        ],
      }
      const scope = 'item'
      const removeFromQuery = removeFacetFromQuery(
        targetFacet,
        targetValue,
        facetQuery,
        scope,
      )
      expect(removeFromQuery).toEqual({
        AND: [
          {
            classification: {
              id: 'https://endpoint.yale.edu/data/test-id-1',
            },
          },
        ],
      })
    })

    it('returns a new object when removing a boolean value', () => {
      const targetFacet = 'itemHasDigitalImage'
      const targetValue = 1
      const facetQuery = {
        AND: [
          {
            classification: {
              id: 'https://endpoint.yale.edu/data/test-id-1',
            },
          },
          {
            hasDigitalImage: 1,
          },
        ],
      }
      const scope = 'item'
      const removeFromQuery = removeFacetFromQuery(
        targetFacet,
        targetValue,
        facetQuery,
        scope,
      )
      expect(removeFromQuery).toEqual({
        AND: [
          {
            classification: {
              id: 'https://endpoint.yale.edu/data/test-id-1',
            },
          },
        ],
      })
    })

    it('returns null', () => {
      const targetFacet = 'itemProductionDate'
      const targetValue = ''
      const facetQuery = {}
      const scope = 'item'
      const removeFromQuery = removeFacetFromQuery(
        targetFacet,
        targetValue,
        facetQuery,
        scope,
      )
      expect(removeFromQuery).toBeNull()
    })
  })
})
