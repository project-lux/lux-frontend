/* eslint-disable @typescript-eslint/no-non-null-assertion,
@typescript-eslint/no-non-null-asserted-optional-chain */
import ObjectParser from '../../../lib/parse/data/ObjectParser'
import mockPhysicalObject from '../../data/object'
import { digitalObject as mockDigitalObject } from '../../data/digitalObject'
import config from '../../../config/config'
import IObject from '../../../types/data/IObject'
import { callNumberId, typeOfPartId } from '../../data/helperObjects'

describe('ObjectParser', () => {
  describe('getCurrentLocation', () => {
    it('returns current location', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const location = object.getCurrentLocation()
      expect(location).toEqual(
        `${config.env.dataApiBaseUrl}data/set/current-location-unit-1`,
      )
    })
  })

  describe('getProductionEvent', () => {
    it('returns production event for physical object', () => {
      const event = new ObjectParser(mockPhysicalObject).getProductionEvent()

      expect(event).toEqual({
        agents: [
          {
            role: `${config.env.dataApiBaseUrl}data/concept/production-part-classified-as`,
            id: `${config.env.dataApiBaseUrl}data/person/production-carried-out-by`,
            references: [],
          },
        ],
        dates: ['1983'],
        locations: [
          `${config.env.dataApiBaseUrl}data/place/production-took-place-at`,
        ],
        techniques: [
          `${config.env.dataApiBaseUrl}data/concept/production-technique`,
        ],
        timePeriods: [
          `${config.env.dataApiBaseUrl}data/activity/production-occurred-during`,
        ],
        references: [],
        influences: [],
        label: null,
      })
    })

    it('returns production event for digital object', () => {
      const object = new ObjectParser(mockDigitalObject)
      const event = object.getProductionEvent()
      expect(event).toEqual({
        agents: [
          {
            id: `${config.env.dataApiBaseUrl}data/group/f7248add-0daa-476e-b1d5-4011eee76667`,
            references: [],
            role: `${config.env.dataApiBaseUrl}data/concept/7686a91b-9f6a-4533-8616-29e98698c231`,
          },
          {
            id: `${config.env.dataApiBaseUrl}data/group/214e3c24-b5e9-4482-8295-5bd52813b210`,
            references: [],
            role: `${config.env.dataApiBaseUrl}data/concept/7686a91b-9f6a-4533-8616-29e98698c231`,
          },
          {
            id: `${config.env.dataApiBaseUrl}data/person/c6561167-bf69-42db-8cf5-7e99807fc43d`,
            references: [],
            role: `${config.env.dataApiBaseUrl}data/concept/083b5d2e-655f-4928-aa8a-37f580867a14`,
          },
        ],
        dates: [],
        techniques: [],
        locations: [],
        timePeriods: [],
        influences: [],
        references: [],
        label: null,
      })
    })

    it('returns production event agent', () => {
      const agent = new ObjectParser(
        mockPhysicalObject,
      ).getAgentFromProductionEvent()
      expect(agent).toEqual(
        `${config.env.dataApiBaseUrl}data/person/production-carried-out-by`,
      )
    })

    it('returns production event date', () => {
      const date = new ObjectParser(
        mockPhysicalObject,
      ).getDateFromProductionEvent()
      expect(date).toEqual('1983')
    })

    it('returns production event location', () => {
      const date = new ObjectParser(
        mockPhysicalObject,
      ).getLocationFromProductionEvent()
      expect(date).toEqual(
        `${config.env.dataApiBaseUrl}data/place/production-took-place-at`,
      )
    })
  })

  describe('getEncounteredBy', () => {
    it('returns encountered by event', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const event = object.getEncounteredBy()
      expect(event).toEqual([
        {
          agents: [
            {
              role: 'additional',
              id: `${config.env.dataApiBaseUrl}data/person/encounter-carried-out-by`,
              references: [],
            },
          ],
          dates: ['1891'],
          techniques: [],
          locations: [
            `${config.env.dataApiBaseUrl}data/place/encounter-took-place-at`,
          ],
          timePeriods: [],
          influences: [],
          references: [],
          label: null,
        },
      ])
    })
  })

  describe('getPublicationEvent', () => {
    it('returns event data', () => {
      const element = new ObjectParser(mockPhysicalObject)
      const event = element.getPublicationEvent()
      expect(event).toEqual([
        {
          agents: [],
          dates: ['2009'],
          locations: [],
          techniques: [],
          timePeriods: [],
          references: [],
          influences: [],
          label: `${config.env.dataApiBaseUrl}data/concept/d1d83293-3374-4fba-916a-ce79c31184d3`,
        },
      ])
    })
  })

  describe('getWorks', () => {
    it('returns original works', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const works = object.getWorks()
      expect(works).toEqual([
        `${config.env.dataApiBaseUrl}data/text/original-work-1`,
        `${config.env.dataApiBaseUrl}data/text/original-work-2`,
      ])
    })
  })

  describe('getAccessPoints', () => {
    it('returns access point with content', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const accessPoints = object.getAccessPoints()
      expect(accessPoints).toEqual([
        {
          content: 'Online dataset',
          id: 'https://yale.test.org/test?URL=testing.com',
        },
      ])
    })
  })

  describe('getRawProductionEventSnippet', () => {
    it('returns physical object production event', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const rawEventSnippet = object.getRawProductionEventSnippet()
      expect(rawEventSnippet).toEqual(mockPhysicalObject.produced_by)
    })

    it('returns digital object production event', () => {
      const object = new ObjectParser(mockDigitalObject)
      const rawEventSnippet = object.getRawProductionEventSnippet()
      expect(rawEventSnippet).toEqual(mockDigitalObject.created_by)
    })

    it('returns physical object production event from encountered_by', () => {
      const mockObject: IObject = {
        type: 'HumanMadeObject',
        encountered_by: [
          {
            id: '',
            type: 'Encounter',
            _label: 'Collecting Event',
            timespan: {
              id: '',
              type: 'TimeSpan',
              identified_by: [
                {
                  id: '',
                  type: 'Name',
                  content: '1891',
                },
              ],
              end_of_the_end: '1891-12-31T23:59:59Z',
              begin_of_the_begin: '1891-01-01T00:00:00Z',
            },
            took_place_at: [
              {
                id: `${config.env.dataApiBaseUrl}data/place/4f1d9eee-1c8a-4e24-a8ef-f56759987029`,
                type: 'Place',
                _label:
                  'North America. USA. Wyoming. Niobrara County. Lightning Creek. ceratopsian locality 19, near top of bluff on the north side of Lightning Creek, about 2 miles southeast of the mouth, in the bottom and near the extreme head of a small, dry watercourse.',
              },
            ],
            carried_out_by: [
              {
                id: `${config.env.dataApiBaseUrl}data/person/cbe10ead-6035-4dd3-9ce5-4910994b8a43`,
                type: 'Person',
                _label: 'Collector',
              },
            ],
          },
        ],
      }

      const object = new ObjectParser(mockObject)
      const rawEventSnippet = object.getRawProductionEventSnippet()
      expect(rawEventSnippet).toEqual(mockObject.encountered_by![0])
    })
  })

  describe('getRawProductionEvent', () => {
    it('returns physical object production event', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const rawEvent = object.getRawProductionEvent()
      expect(rawEvent).toEqual(mockPhysicalObject.produced_by)
    })

    it('returns digital object production event', () => {
      const object = new ObjectParser(mockDigitalObject)
      const rawEvent = object.getRawProductionEvent()
      expect(rawEvent).toEqual(mockDigitalObject.created_by)
    })
  })

  describe('getDigitallyCarries', () => {
    it('returns array of ids', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const digitallyCarries = object.getDigitallyCarries()
      expect(digitallyCarries).toEqual([
        `${config.env.dataApiBaseUrl}data/text/carries`,
      ])
    })
  })

  describe('getDigitallyShows', () => {
    it('returns array of ids', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const digitallyShows = object.getDigitallyShows()
      expect(digitallyShows).toEqual([
        `${config.env.dataApiBaseUrl}data/text/shows`,
      ])
    })
  })

  describe('getCallNumber', () => {
    it('returns call number', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const callNumber = object.getCallNumber()
      expect(callNumber).toEqual({
        label: callNumberId,
        identifier: ['Mock Call Number'],
        carriedOutBy: [],
        equivalent: [config.aat.callNumber],
      })
    })

    it('returns an identifier if there is no call number', () => {
      const mockObject: IObject = {
        type: 'HumanMadeObject',
        identified_by: [
          {
            type: 'Identifier',
            content: 'Another identifier',
            classified_as: [
              {
                id: `${config.env.dataApiBaseUrl}data/concept/not-call-number`,
                type: 'Type',
                _label: 'Accession Number',
              },
            ],
          },
        ],
      }
      const object = new ObjectParser(mockObject)
      const identifier = object.getCallNumber()
      expect(identifier).toEqual({
        label: `${config.env.dataApiBaseUrl}data/concept/not-call-number`,
        identifier: ['Another identifier'],
        carriedOutBy: [],
        equivalent: [],
      })
    })
  })

  describe('getDimensions', () => {
    it('returns dimensions', () => {
      const object = new ObjectParser(mockPhysicalObject)
      const dimensions = object.getDimensions()
      expect(dimensions).toEqual([
        {
          label: `${config.env.dataApiBaseUrl}data/concept/dimension-classified-as-1`,
          value: 90.25,
          unit: `${config.env.dataApiBaseUrl}data/concept/unit-1`,
        },
        {
          label: `${config.env.dataApiBaseUrl}data/concept/dimension-classified-as-2`,
          value: 91.44,
          unit: `${config.env.dataApiBaseUrl}data/concept/unit-2`,
        },
        {
          label: typeOfPartId,
          value: 100,
          unit: '',
        },
      ])
    })
  })
})
