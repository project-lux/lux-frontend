/* eslint-disable @typescript-eslint/no-non-null-assertion */
import config from '../../../config/config'
import EventParser from '../../../lib/parse/data/EventParser'
import { event as mockEvent } from '../../data/event'
import {
  productionEvent as mockProductionEvent,
  productionEventWithAttributedBy as mockEventWithAttributedBy,
  productionEventWithParts as mockEventWithParts,
  productionEventWithCarriedOutBy as mockEventWithCarriedOutBy,
  productionEventWithAllAgentDataPoints as mockEventWithAllAgents,
  carriedOutByTransformed,
  partTransformed,
  attributedByTransformed,
} from '../../data/productionEvent'

describe('EventParser', () => {
  describe('getCarriedOutBy', () => {
    it('returns array of agent data', () => {
      const event = new EventParser(mockEventWithCarriedOutBy)
      const agent = event.getCarriedOutBy()
      expect(agent).toEqual([carriedOutByTransformed])
    })

    it('returns an empty array', () => {
      const event = new EventParser(mockProductionEvent)
      const agent = event.getCarriedOutBy()
      expect(agent).toEqual([])
    })
  })

  describe('getDates', () => {
    it('returns dates', () => {
      const event = new EventParser(mockEvent)
      const dates = event.getDates()
      expect(dates).toEqual(['1988-01-01 - 1988-07-24'])
    })
  })

  describe('getLocations', () => {
    it('returns locations', () => {
      const event = new EventParser(mockEvent)
      const locations = event.getLocations()
      expect(locations).toEqual([
        `${config.env.dataApiBaseUrl}data/place/took-place-at-1`,
        `${config.env.dataApiBaseUrl}data/place/took-place-at-2`,
      ])
    })
  })

  describe('getPart', () => {
    it('returns parts', () => {
      const event = new EventParser(mockEvent)
      const parts = event.getPart()
      expect(parts).toEqual([
        {
          Activity: {
            date: ['1900-01-01 - 2000-01-01'],
            transfer: [
              `${config.env.dataApiBaseUrl}data/concept/transferred-title-of`,
            ],
          },
        },
      ])
    })
  })

  describe('getLinkToUnitSite', () => {
    it('returns link', () => {
      const event = new EventParser(mockEvent)
      const link = event.getLinkToUnitSite()
      expect(link).toEqual([
        {
          content: 'Homepage for Exhibition Record',
          link: 'https://artgallery.yale.edu/exhibitions/exhibition/test-unit-link',
        },
      ])
    })
  })

  describe('getProductionEvent', () => {
    it('returns production event object', () => {
      const event = new EventParser(mockEvent)
      const obj = event.getProductionEvent()
      expect(obj).toEqual({
        agents: [
          {
            role: 'additional',
            id: `${config.env.dataApiBaseUrl}data/group/carried-out-by-1`,
            references: [],
          },
          {
            role: 'additional',
            id: `${config.env.dataApiBaseUrl}data/group/part-carried-out-by`,
            references: [],
          },
        ],
        dates: ['1988-01-01 - 1988-07-24'],
        locations: [
          `${config.env.dataApiBaseUrl}data/place/took-place-at-1`,
          `${config.env.dataApiBaseUrl}data/place/took-place-at-2`,
        ],
        techniques: [],
        timePeriods: [],
        references: [
          {
            type: `${config.env.dataApiBaseUrl}data/concept/referred-to-by-classified-as-1`,
            content: 'referred_to_by mock 1',
          },
        ],
        influences: [],
        label: `${config.env.dataApiBaseUrl}data/concept/mock-concept`,
      })
    })
  })

  describe('getAgentMap', () => {
    it('returns array of all agent data', () => {
      const event = new EventParser(mockEventWithAllAgents)
      const agentMap = event.getAgentMap()
      expect(agentMap).toEqual([
        carriedOutByTransformed,
        partTransformed,
        ...attributedByTransformed,
      ])
    })
  })

  describe('getPartAgent', () => {
    it('returns agent data from part when parsing classified_as', () => {
      const event = new EventParser(mockEventWithParts)
      const partAgent = event.getPartAgent(mockEventWithParts.part![0], true)
      expect(partAgent).toEqual([partTransformed])
    })

    it('returns agent data from part when not parsing classified_as', () => {
      const event = new EventParser(mockEventWithParts)
      const partAgent = event.getPartAgent(mockEventWithParts.part![0], false)
      expect(partAgent).toEqual([
        {
          role: 'additional',
          id: `${config.env.dataApiBaseUrl}data/person/part-agent-1`,
          references: [
            {
              type: `${config.env.dataApiBaseUrl}data/concept/part-creator-description`,
              content: 'Artist: Part Agent 1',
            },
          ],
        },
      ])
    })
  })

  describe('getAttributors', () => {
    it('returns completed production agent data from /attributed_by', () => {
      const event = new EventParser(mockEventWithAttributedBy)
      const attributors = event.getAttributors(
        mockEventWithAttributedBy.attributed_by![0],
      )
      expect(attributors).toEqual(attributedByTransformed[0])
    })

    it('returns production agent data with missing data from /attributed_by', () => {
      const mockAttributedBy = {
        type: 'AttributeAssignment',
        assigned: [
          {
            type: 'Production',
            carried_out_by: [
              {
                id: `${config.env.dataApiBaseUrl}data/person/thomas-danforth-II`,
                type: 'Person',
                _label: 'Thomas Danforth II',
              },
            ],
          },
        ],
      }
      const event = new EventParser(mockProductionEvent)
      const attributors = event.getAttributors(mockAttributedBy)
      expect(attributors).toEqual({
        role: '',
        id: `${config.env.dataApiBaseUrl}data/person/thomas-danforth-II`,
        references: [],
      })
    })
  })

  describe('getAgentIds', () => {
    it('returns a uuid', () => {
      const event = new EventParser(mockEventWithAllAgents)
      const agentIds = event.getAgentIds()
      expect(agentIds).toEqual(
        `${config.env.dataApiBaseUrl}data/person/carried-out-agent`,
      )
    })

    it('returns null', () => {
      const event = new EventParser(mockProductionEvent)
      const agentIds = event.getAgentIds()
      expect(agentIds).toBeNull()
    })
  })

  describe('getInfluences', () => {
    it('returns array of uuids', () => {
      const event = new EventParser(mockProductionEvent)
      const references = event.getInfluences()
      expect(references).toEqual([
        `${config.env.dataApiBaseUrl}data/concept/influence`,
      ])
    })
  })

  describe('getTechinques', () => {
    it('returns array of uuids', () => {
      const event = new EventParser(mockProductionEvent)
      const references = event.getTechniques()
      expect(references).toEqual([
        `${config.env.dataApiBaseUrl}data/concept/technique`,
      ])
    })
  })

  describe('getTimePeriods', () => {
    it('returns array of uuids', () => {
      const event = new EventParser(mockProductionEvent)
      const references = event.getTimePeriods()
      expect(references).toEqual([
        `${config.env.dataApiBaseUrl}data/concept/occurred-during`,
      ])
    })
  })

  describe('getReferences', () => {
    it('returns array of references', () => {
      const event = new EventParser(mockProductionEvent)
      const references = event.getReferences()
      expect(references).toEqual([
        {
          type: `${config.env.dataApiBaseUrl}data/concept/event-description`,
          content: 'Made in Middletown, Connecticut,  or Stepney, Connecticut',
        },
        {
          type: '',
          content: 'Reference without classified_by',
        },
      ])
    })
  })

  describe('getEventLabel', () => {
    it('returns a string label', () => {
      const event = new EventParser(mockProductionEvent)
      const label = event.getEventLabel()
      expect(label).toEqual(
        `${config.env.dataApiBaseUrl}data/concept/production`,
      )
    })
  })
})
