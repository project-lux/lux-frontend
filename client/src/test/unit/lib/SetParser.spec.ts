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
})
