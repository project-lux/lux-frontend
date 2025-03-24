import { vi } from 'vitest'

import config from '../../../../config/config'
import {
  currentUriInHierarchy,
  hasHierarchyHalLinks,
  getNextConceptUris,
  getNextPlaceUris,
  getNextSetUris,
  getParentData,
  isEntityAnArchive,
  isInHierarchy,
  removeViewFromPathname,
} from '../../../../lib/util/hierarchyHelpers'
import { concept as mockConcept } from '../../../data/concept'
import { place as mockPlace } from '../../../data/place'
import { physicalObject as mockObject } from '../../../data/object'
import { reusableMinimalEntity as mockEntity } from '../../../data/reusableMinimalEntity'

describe('hierarchyHelpers', () => {
  const mockAncestors = [
    'https://endpoint.yale.edu/data/set/b7ebbee8-a302-4d07-a91a-399a060e6d1f',
    'https://endpoint.yale.edu/data/set/13349366-80a1-454f-b17a-9490f70c9ad9',
  ]
  const mockUri =
    'https://endpoint.yale.edu/data/set/13349366-80a1-454f-b17a-9490f70c9ad9'
  const mockPathname = '/view/set/13349366-80a1-454f-b17a-9490f70c9ad9'

  describe('isInHiearchy', () => {
    it('returns true', () => {
      expect(isInHierarchy(mockUri, mockAncestors)).toBeTruthy()
    })
  })

  describe('removeViewFromPathname', () => {
    it('returns a string uri', () => {
      expect(removeViewFromPathname(mockPathname)).toEqual(
        'set/13349366-80a1-454f-b17a-9490f70c9ad9',
      )
    })
  })

  describe('currentUriInHierarchy', () => {
    vi.mock('../../../../lib/util/hierarchyHelpers', async () => {
      const actual = await vi.importActual(
        '../../../../lib/util/hierarchyHelpers',
      )
      return {
        ...actual,
        removeViewFromPathname: vi
          .fn()
          .mockReturnValue('set/13349366-80a1-454f-b17a-9490f70c9ad9'),
      }
    })

    it('returns true', () => {
      expect(currentUriInHierarchy(mockUri, mockPathname)).toBeTruthy()
    })
  })

  describe('hasHierarchyHalLinks', () => {
    const mockLinks = {
      self: {
        href: 'current uri',
      },
      curies: [
        {
          name: 'test',
          href: 'test',
          templated: true,
        },
      ],
      'lux:random': {
        href: 'https://endpoint.yale.edu/api/facets/set?q=%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fset%2F918f20d8-5f94-4eb6-a498-fc3876a25623%22%7D&name=responsibleUnits',
        _estimate: 1,
      },
      'lux:objectOrSetMemberOfSet': {
        href: 'https://endpoint.yale.edu/api/search/multi?q=%7B%22memberOf%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fset%2F358fab7f-df9e-4a01-90bb-c73ce4ec4e8d%22%7D%7D',
        _estimate: 1,
      },
    }

    const links = hasHierarchyHalLinks(mockLinks).sort()
    const comparativeLinks = [
      'https://endpoint.yale.edu/api/facets/work?q=%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fset%2F918f20d8-5f94-4eb6-a498-fc3876a25623%22%7D&name=responsibleUnits',
      'https://endpoint.yale.edu/api/search/item?q=%7B%22memberOf%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fset%2F358fab7f-df9e-4a01-90bb-c73ce4ec4e8d%22%7D%7D',
    ].sort()

    it('returns array of strings', () => {
      expect(links).toStrictEqual(comparativeLinks)
    })
  })

  describe('getNextConceptUris', () => {
    it('returns array', () => {
      expect(getNextConceptUris(mockConcept)).toStrictEqual([
        `${config.env.dataApiBaseUrl}data/concept/broader-1`,
      ])
    })

    it('returns empty array', () => {
      expect(getNextConceptUris(mockEntity('Mock Concept'))).toStrictEqual([])
    })
  })

  describe('getNextPlaceUris', () => {
    it('returns array', () => {
      expect(getNextPlaceUris(mockPlace)).toStrictEqual([
        `${config.env.dataApiBaseUrl}data/place/mock-place-parent-entity`,
      ])
    })

    it('returns empty array', () => {
      expect(getNextPlaceUris(mockEntity('Mock Place'))).toStrictEqual([])
    })
  })

  describe('getNextSetUris', () => {
    it('returns array', () => {
      expect(getNextSetUris(mockObject)).toStrictEqual([
        `${config.env.dataApiBaseUrl}data/set/member-of-collection-1`,
        `${config.env.dataApiBaseUrl}data/set/member-of-collection-2`,
        `${config.env.dataApiBaseUrl}data/set/member-of-unit-1`,
      ])
    })

    it('returns empty array', () => {
      expect(getNextSetUris(mockEntity('Mock Object'))).toStrictEqual([])
    })
  })

  describe('getParentData', () => {
    it('returns null', () => {
      expect(getParentData([])).toBeNull()
    })

    it('returns filtered entity', () => {
      expect(getParentData([mockObject], isEntityAnArchive)).toStrictEqual(
        mockObject,
      )
    })

    it('returns data', () => {
      expect(getParentData([mockObject, mockPlace])).toStrictEqual(mockObject)
    })
  })
})
