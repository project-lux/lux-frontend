import SetParser from '../../../lib/parse/data/SetParser'
import { set as mockSet } from '../../data/set'
import { archive as mockArchive } from '../../data/archive'
import config from '../../../config/config'

describe('SetParser', () => {
  describe('getCreationEvent', () => {
    it('returns set event object', () => {
      const set = new SetParser(mockSet)
      const creationEvent = set.getCreationEvent()
      expect(creationEvent).toEqual({
        agents: [
          {
            role: 'additional',
            id: `${config.env.dataApiBaseUrl}data/person/mock-person`,
            references: [],
          },
        ],
        dates: ['1623-1960'],
        locations: [`${config.env.dataApiBaseUrl}data/place/mock-place`],
        techniques: [`${config.env.dataApiBaseUrl}data/concept/mock-concept`],
        timePeriods: [],
        influences: [],
        references: [],
        label: null,
      })
    })
  })

  describe('getSourceCreationEvent', () => {
    it('returns set event object', () => {
      const set = new SetParser(mockSet)
      const sourceCreationEvent = set.getSourceCreationEvent()
      expect(sourceCreationEvent).toEqual({
        agents: [
          {
            id: `${config.env.dataApiBaseUrl}data/person/mock-person`,
            references: [],
            role: 'additional',
          },
        ],
        dates: [],
        locations: [],
        references: [],
        techniques: [],
        timePeriods: [],
        influences: [],
        label: null,
      })
    })
  })

  describe('isArchive', () => {
    it('returns true', () => {
      const set = new SetParser(mockArchive)
      const isArchive = set.isArchive()
      expect(isArchive).toBeTruthy()
    })

    it('returns false', () => {
      const set = new SetParser({
        type: 'Set',
        classified_as: [
          {
            id: 'not an archive',
            type: 'Type',
            _label: 'Archive',
          },
        ],
      })
      const isArchive = set.isArchive()
      expect(isArchive).toBeFalsy()
    })
  })

  describe('hasChildren', () => {
    it('returns true', () => {
      const set = new SetParser({
        type: 'Set',
        _links: {
          curies: [
            {
              name: 'lux',
              href: `${config.env.dataApiBaseUrl}api/rels/{rel}`,
              templated: true,
            },
          ],
          self: {
            href: `${config.env.dataApiBaseUrl}data/object/3ba2c43e-e63d-49ba-8cae-46e1af2ebe48`,
          },
          'lux:setIncludedSets': {
            href: `${config.env.dataApiBaseUrl}api/facets/item?q=%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fobject%2F3ba2c43e-e63d-49ba-8cae-46e1af2ebe48%22%7D&name=responsibleCollections`,
            _estimate: 1,
          },
          'lux:setIncludedItems': {
            href: `${config.env.dataApiBaseUrl}api/facets/item?q=%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fobject%2F3ba2c43e-e63d-49ba-8cae-46e1af2ebe48%22%7D&name=responsibleUnits`,
            _estimate: 1,
          },
        },
      })
      const hasChildren = set.hasChildren()
      expect(hasChildren).toBeTruthy()
    })

    it('returns false', () => {
      const set = new SetParser({
        type: 'Set',
        _links: {
          curies: [
            {
              name: 'lux',
              href: `${config.env.dataApiBaseUrl}api/rels/{rel}`,
              templated: true,
            },
          ],
          self: {
            href: `${config.env.dataApiBaseUrl}data/object/3ba2c43e-e63d-49ba-8cae-46e1af2ebe48`,
          },
          'lux:itemArchive': {
            href: `${config.env.dataApiBaseUrl}api/search/work?q=%7B%22AND%22%3A%5B%7B%22classification%22%3A%7B%22identifier%22%3A%22http%3A%2F%2Fvocab.getty.edu%2Faat%2F300375748%22%7D%7D%2C%7B%22containing%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fobject%2F3ba2c43e-e63d-49ba-8cae-46e1af2ebe48%22%7D%7D%5D%7D`,
            _estimate: 1,
          },
        },
      })
      const hasChildren = set.hasChildren()
      expect(hasChildren).toBeFalsy()
    })
  })
})
