import config from '../../../config/config'
import WorkParser from '../../../lib/parse/data/WorkParser'
import { englishLanguageId } from '../../data/helperObjects'
import { linguisticObject as mockObject } from '../../data/linguisticObject'

describe('WorkParser', () => {
  describe('getProductionEvent', () => {
    it('returns linguistic object production event object', () => {
      const work = new WorkParser(mockObject)
      const productionEvent = work.getProductionEvent()
      expect(productionEvent).toEqual({
        agents: [
          {
            role: 'https://endpoint.yale.edu/data/concept/created-by-classified-as-1',
            id: 'https://endpoint.yale.edu/data/group/created-by-carried-out-by-1',
            references: [],
          },
          {
            role: 'https://endpoint.yale.edu/data/concept/created-by-classified-as-2',
            id: 'https://endpoint.yale.edu/data/group/created-by-carried-out-by-2',
            references: [],
          },
        ],
        dates: ['2009-01-01'],
        locations: ['https://endpoint.yale.edu/data/place/mock-place-entity'],
        techniques: [
          'https://endpoint.yale.edu/data/concept/created-by-technique-1',
        ],
        timePeriods: [],
        influences: [],
        references: [],
        label: null,
      })
    })

    it('returns null', () => {
      const mockWorkWithoutEvent = {
        id: 'https://endpoint.yale.edu/data/text/3351ad0b-eb0a-409b-b359-fe2cc442dd81',
        type: 'LinguisticObject',
      }
      const work = new WorkParser(mockWorkWithoutEvent)
      const productionEvent = work.getProductionEvent()
      expect(productionEvent).toBeNull()
    })
  })

  describe('getPublicationEvent', () => {
    it('returns event data', () => {
      const element = new WorkParser(mockObject)
      const event = element.getPublicationEvent()
      expect(event).toEqual([
        {
          agents: [
            {
              role: 'additional',
              id: `${config.env.dataApiBaseUrl}data/person/carried-out-agent`,
              references: [],
            },
          ],
          dates: ['1780–1800'],
          locations: [
            `${config.env.dataApiBaseUrl}data/place/event-took-place-at`,
          ],
          techniques: [`${config.env.dataApiBaseUrl}data/concept/technique`],
          timePeriods: [
            `${config.env.dataApiBaseUrl}data/concept/occurred-during`,
          ],
          references: [
            {
              type: `${config.env.dataApiBaseUrl}data/concept/creator-description`,
              content: 'Artist: Unknown',
            },
          ],
          influences: [`${config.env.dataApiBaseUrl}data/concept/influence`],
          label: `${config.env.dataApiBaseUrl}data/concept/production`,
        },
      ])
    })
  })

  describe('getProductionAgent', () => {
    it('returns created_by agents', () => {
      const work = new WorkParser(mockObject)
      const createdByAgents = work.getProductionAgent()
      expect(createdByAgents).toEqual(
        'https://endpoint.yale.edu/data/group/created-by-carried-out-by-1',
      )
    })
  })

  describe('getPublicationAgent', () => {
    it('returns used_for agents', () => {
      const work = new WorkParser(mockObject)
      const usedForAgents = work.getPublicationAgent()
      expect(usedForAgents).toEqual(
        'https://endpoint.yale.edu/data/person/carried-out-agent',
      )
    })
  })

  describe('getProductionDate', () => {
    it('returns created_by date', () => {
      const work = new WorkParser(mockObject)
      const date = work.getProductionDate()
      expect(date).toEqual('2009-01-01')
    })
  })

  describe('getPublicationDate', () => {
    it('returns used_for date', () => {
      const work = new WorkParser(mockObject)
      const date = work.getPublicationDate()
      expect(date).toEqual('1780–1800')
    })
  })

  describe('getImprint', () => {
    it('returns array of content', () => {
      const work = new WorkParser(mockObject)
      const imprints = work.getImprint()
      expect(imprints).toEqual(['This is an imprint statement'])
    })
  })

  describe('getLanguages', () => {
    it('returns array of uuids', () => {
      const work = new WorkParser(mockObject)
      const languages = work.getLanguages()
      expect(languages).toEqual([englishLanguageId])
    })
  })

  describe('getLanguageNotes', () => {
    it('returns array of content', () => {
      const work = new WorkParser(mockObject)
      const languageNotes = work.getLanguageNotes()
      expect(languageNotes).toEqual(['This is in english'])
    })
  })

  describe('getPartOf', () => {
    it('returns array of uuids', () => {
      const work = new WorkParser(mockObject)
      const partOf = work.getPartOf()
      expect(partOf).toEqual([
        `${config.env.dataApiBaseUrl}data/concept/part-of`,
      ])
    })
  })

  describe('getSubjectTo', () => {
    it('returns array of objects', () => {
      const work = new WorkParser(mockObject)
      const subjectTo = work.getSubjectTo()
      expect(subjectTo).toEqual([
        {
          text: 'Public Domain',
          url: 'https://creativecommons.org/publicdomain/zero/1.0/',
        },
      ])
    })
  })
})
