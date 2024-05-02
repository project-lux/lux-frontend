import config from '../../../config/config'
import {
  capitalizeLabels,
  containsSpecificNote,
  forceArray,
  getAttributedBy,
  getClassifiedAs,
  getIdentifiedByContent,
  isSpecimen,
  transformDate,
  getClassifiedAsWithMatchingClassifier,
  getContentByClassifiedAs,
  getDateContent,
  getLabelBasedOnEntityType,
  getName,
  hasHalLinks,
  replaceBaseUrl,
  stripYaleIdPrefix,
  validateClassifiedAsIdMatches,
  getIconFromUri,
  sortDataSources,
  hasData,
  getWikiDataImageName,
  getWikidataImage,
  getSpecificReferredToBy,
  transformStringForTestId,
  getMultipleSpecificReferredToBy,
} from '../../../lib/parse/data/helper'
import IAttribution from '../../../types/data/IAttribution'
import IEntity from '../../../types/data/IEntity'
import ITimeSpan from '../../../types/data/ITimeSpan'
import { entity as mockEntity } from '../../data/entity'
import ILinks from '../../../types/data/ILinks'
import { IHalLinks } from '../../../types/IHalLinks'
import { IImages } from '../../../types/IImages'

describe('helper functions', () => {
  describe('capitalizeLabels', () => {
    it('returns transformed string', () => {
      const text = 'anDy Warhol is COol, too'
      expect(capitalizeLabels(text)).toEqual('Andy Warhol Is Cool, Too')
    })
  })

  describe('containsSpecificNote', () => {
    it('returns true', () => {
      const notes = {
        'https://endpoint.yale.edu/data/concept/1': [],
        'https://endpoint.yale.edu/data/concept/2': [],
      }
      const hasNote = containsSpecificNote(
        notes,
        'https://endpoint.yale.edu/data/concept/2',
      )
      expect(hasNote).toBeTruthy()
    })

    it('returns false', () => {
      const notes = {
        'https://endpoint.yale.edu/data/concept/1': [],
        'https://endpoint.yale.edu/data/concept/2': [],
      }
      const hasNote = containsSpecificNote(
        notes,
        'https://endpoint.yale.edu/data/concept/3',
      )
      expect(hasNote).toBeFalsy()
    })
  })

  describe('forceArray', () => {
    it('returns array', () => {
      const text = 'anDy Warhol is COol, too'
      const arr = forceArray(text)
      expect(arr).toEqual([text])
    })

    it('returns empty array', () => {
      const arr = forceArray(null)
      expect(arr).toEqual([])
    })

    it('returns array if given an array', () => {
      const text = ['anDy Warhol is COol, too']
      const arr = forceArray(text)
      expect(arr).toEqual(text)
    })
  })

  describe('getAttributedBy', () => {
    it('returns array of agents', () => {
      const mockAttributedBy: Array<IAttribution> = [
        {
          type: 'concept',
          carried_out_by: [
            {
              id: `${config.env.dataApiBaseUrl}data/person/carried-out-by`,
              type: 'Person',
            },
          ],
        },
      ]
      const data = getAttributedBy(mockAttributedBy)
      expect(data).toEqual([
        `${config.env.dataApiBaseUrl}data/person/carried-out-by`,
      ])
    })
  })

  describe('getClassifiedAs', () => {
    it('returns array of ids', () => {
      const mockClassifiers: Array<IEntity> = [
        {
          type: 'test',
          id: `${config.env.dataApiBaseUrl}data/concept/662260fa-f882-4174-b720-0791e45f7dca`,
        },
        {
          type: 'test',
          id: config.dc.first,
        },
        {
          type: 'test',
        },
      ]
      const classifiedAsId = getClassifiedAs(mockClassifiers)
      expect(classifiedAsId).toEqual([
        `${config.env.dataApiBaseUrl}data/concept/662260fa-f882-4174-b720-0791e45f7dca`,
      ])
    })
  })

  describe('isSpecimen', () => {
    it('returns true', () => {
      const specimenType = [
        config.dc.fossil,
        config.dc.animalSpecimens,
        config.dc.plantSpecimens,
        config.dc.biologicalSpecimens,
      ]
      const specimen = isSpecimen(
        specimenType[Math.floor(Math.random() * specimenType.length)],
      )
      expect(specimen).toBeTruthy()
    })

    it('returns false', () => {
      const specimen = isSpecimen('not a specimen')
      expect(specimen).toBeFalsy()
    })
  })

  describe('getIdentifiedByContent', () => {
    it('returns true', () => {
      const identifiedBy = [
        {
          type: 'Name',
          content: 'some name',
        },
        {
          type: 'Identifier',
          content: 'abcd1234',
        },
      ]
      const arr = getIdentifiedByContent(identifiedBy)
      expect(arr).toEqual(['some name', 'abcd1234'])
    })
  })

  describe('getClassifiedAsWithMatchingClassifier', () => {
    it('returns array of matching objects', () => {
      const idToMatch = `${config.env.dataApiBaseUrl}data/concept/matching`
      const entity = [
        {
          type: 'Name',
          content: 'some name',
          classified_as: [
            {
              id: idToMatch,
              type: 'type',
            },
          ],
        },
        {
          type: 'Identifier',
          content: 'abcd1234',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/not-matching`,
              type: 'type',
            },
          ],
        },
      ]
      const arr = getClassifiedAsWithMatchingClassifier(entity, idToMatch)
      expect(arr).toEqual([
        {
          type: 'Name',
          content: 'some name',
          classified_as: [
            {
              id: idToMatch,
              type: 'type',
            },
          ],
        },
      ])
    })
  })

  describe('getContentByClassifiedAs', () => {
    it('returns array of matching objects', () => {
      const idToMatch = `${config.env.dataApiBaseUrl}data/concept/matching`
      const entity = [
        {
          type: 'Name',
          content: 'some name',
          classified_as: [
            {
              id: idToMatch,
              type: 'type',
            },
          ],
        },
        {
          type: 'Identifier',
          content: 'abcd1234',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/not-matching`,
              type: 'type',
            },
          ],
        },
      ]
      const arr = getContentByClassifiedAs(entity, idToMatch)
      expect(arr).toEqual(['some name'])
    })
  })

  describe('getDateContent', () => {
    it('returns array of matching objects', () => {
      const entity: ITimeSpan = {
        type: 'TimeSpan',
        classified_as: [
          {
            id: `${config.env.dataApiBaseUrl}data/concept/classified-as`,
            type: 'type',
          },
        ],
        identified_by: [
          {
            id: `${config.env.dataApiBaseUrl}data/concept/identified-by`,
            type: 'type',
            content: '1900-2000',
          },
        ],
        end_of_the_end: '1980-01-27T23:59:59Z',
        begin_of_the_end: '1980-01-27T00:00:00Z',
        end_of_the_begin: '1979-11-20T23:59:59Z',
        begin_of_the_begin: '1979-11-20T00:00:00Z',
      }
      const arr = getDateContent(entity)
      expect(arr).toEqual(['1900-2000'])
    })

    it('returns an empty array', () => {
      const arr = getDateContent(undefined)
      expect(arr).toEqual([])
    })
  })

  describe('transformedDate', () => {
    it('returns transformed dates AD', () => {
      const date = transformDate('1997-05-13T23:59:59Z')
      expect(date).toEqual('5/13/1997')
    })

    it('returns transformed dates BCE', () => {
      const date = transformDate('-1997-05-13T23:59:59Z')
      expect(date).toEqual('5/13/1997 BCE')
    })
  })

  describe('getLabelBasedOnEntityType', () => {
    it('returns title label', () => {
      const paths = [
        '/view/object',
        '/view/digital',
        '/view/visual',
        '/view/text',
        '/view/set',
      ]
      const arr = getLabelBasedOnEntityType(
        paths[Math.floor(Math.random() * paths.length)],
      )
      expect(arr).toEqual('Titles')
    })

    it('returns name label', () => {
      const arr = getLabelBasedOnEntityType('/view/person')
      expect(arr).toEqual('Name')
    })
  })

  describe('getName', () => {
    it('returns name matching the language and is a primary name', () => {
      const obj = [
        {
          type: 'Name',
          content: 'Steiglitz, Alfred',
        },
        {
          type: 'Name',
          content: 'Alfred Stieglitz',
          language: [
            {
              id: config.dc.langen,
              type: 'Language',
              _label: 'English',
            },
          ],
          classified_as: [
            {
              id: config.dc.primaryName,
              type: 'Type',
              _label: 'Primary Name',
            },
          ],
        },
      ]
      const name = getName(obj, config.dc.langen)
      expect(name).toEqual('Alfred Stieglitz')
    })

    it('returns name that is classified_as something other than primary name and does not have a matching language', () => {
      const obj = [
        {
          type: 'Name',
          content: 'Steiglitz, Alfred',
        },
        {
          type: 'Name',
          content: 'Alfred Stieglitz',
          language: [
            {
              id: config.dc.langen,
              type: 'Language',
              _label: 'English',
            },
          ],
          classified_as: [
            {
              id: config.dc.displayName,
              type: 'Type',
              _label: 'Display Name',
            },
          ],
        },
      ]
      const name = getName(obj, config.dc.langspa)
      expect(name).toEqual('Alfred Stieglitz')
    })

    it('returns name that is classified_as primary but does not have a language', () => {
      const obj = [
        {
          type: 'Name',
          content: 'Steiglitz, Alfred',
        },
        {
          type: 'Name',
          content: 'Alfred Stieglitz',
          classified_as: [
            {
              id: config.dc.primaryName,
              type: 'Type',
              _label: 'Primary Name',
            },
          ],
        },
      ]
      const name = getName(obj, config.dc.langen)
      expect(name).toEqual('Alfred Stieglitz')
    })

    it('returns name that matches the language requested but does not have classified_as', () => {
      const obj = [
        {
          type: 'Name',
          content: 'Steiglitz, Alfred',
        },
        {
          type: 'Name',
          content: 'Alfred Stieglitz',
          language: [
            {
              id: config.dc.langen,
              type: 'Language',
              _label: 'English',
            },
          ],
        },
        {
          type: 'Name',
          content: 'Steiglitz, Alfred',
          classified_as: [
            {
              id: config.dc.displayName,
              type: 'Type',
              _label: 'Display Name',
            },
          ],
        },
      ]
      const name = getName(obj, config.dc.langen)
      expect(name).toEqual('Alfred Stieglitz')
    })

    it('returns name with no classified_as or language', () => {
      const mockObject = [
        {
          type: 'Name',
          content: 'Steiglitz, Alfred',
        },
        {
          type: 'Name',
          content: 'Alfred Steiglitz',
        },
      ]
      const name = getName(mockObject, config.dc.langen)
      expect(name).toEqual('Steiglitz, Alfred')
    })
  })

  describe('hasHalLinks', () => {
    it('returns true', () => {
      const mockHalLinks: ILinks = mockEntity._links as ILinks
      const mockConfig: IHalLinks = {
        item: {
          searchTag: 'lux:testHalLink1',
        },
        work: {
          searchTag: 'lux:testHalLink2',
        },
      }
      const hasLinks = hasHalLinks(mockConfig, mockHalLinks)
      expect(hasLinks).toBeTruthy()
    })

    it('returns false', () => {
      const mockHalLinks: ILinks = mockEntity._links as ILinks
      const mockConfig: IHalLinks = {
        item: {
          searchTag: 'lux:testHalLink1',
        },
        work: {
          searchTag: 'lux:testHalLink3',
        },
      }
      const hasLinks = hasHalLinks(mockConfig, mockHalLinks)
      expect(hasLinks).toBeFalsy()
    })
  })

  describe('replaceBaseUrl', () => {
    it('returns array of agents', () => {
      const url = replaceBaseUrl(
        `${config.env.dataApiBaseUrl}data/concept/test`,
      )
      expect(url).toEqual('data/concept/test')
    })
  })

  describe('stripYaleIdPrefix', () => {
    it('returns array of agents', () => {
      const url = stripYaleIdPrefix(
        `${config.env.dataApiBaseUrl}data/concept/test`,
      )
      expect(url).toEqual('concept/test')
    })
  })

  describe('validateClassifiedAsIdMatches', () => {
    it('returns true', () => {
      const mockObject = {
        id: config.dc.primaryName,
        type: 'name',
      }
      const classifierMatches = validateClassifiedAsIdMatches(
        mockObject,
        config.dc.primaryName,
      )
      expect(classifierMatches).toBeTruthy()
    })

    it('returns false', () => {
      const mockObject = {
        id: config.dc.primaryName,
        type: 'name',
      }
      const classifierMatches = validateClassifiedAsIdMatches(
        mockObject,
        config.dc.displayName,
      )
      expect(classifierMatches).toBeFalsy()
    })
  })

  describe('getIconFromUri', () => {
    it('returns array with icon and alt text', () => {
      const icons = getIconFromUri('/data/object/')
      expect(icons).toEqual(['objects.svg', 'Physical Item'])
    })

    it('returns empty array', () => {
      const icons = getIconFromUri('/data/event/')
      expect(icons).toEqual([])
    })
  })

  describe('sortDataSources', () => {
    it('returns sorted array', () => {
      const sources = sortDataSources([
        'https://linked-art.library.yale.edu/node/785f455a-3847-4838-9f7b-74ebba897f9a',
        'https://media.art.yale.edu/content/lux/agt/2851.json',
        'https://linked-art.library.yale.edu/node/105426f8-1f1b-4f84-81e7-bc96130b4d94',
      ])
      expect(sources).toEqual([
        'https://linked-art.library.yale.edu/node/105426f8-1f1b-4f84-81e7-bc96130b4d94',
        'https://linked-art.library.yale.edu/node/785f455a-3847-4838-9f7b-74ebba897f9a',
        'https://media.art.yale.edu/content/lux/agt/2851.json',
      ])
    })
  })

  describe('hasData', () => {
    it('returns data if it contains array data', () => {
      const mockData = {
        names: [],
        types: ['has types'],
      }
      const data = hasData(mockData)
      expect(data).toEqual({
        names: [],
        types: ['has types'],
      })
    })

    it('returns data if there is a string value', () => {
      const mockData = {
        types: [],
        name: 'name exists',
      }
      const data = hasData(mockData)
      expect(data).toEqual(mockData)
    })

    it('returns data if there is an object', () => {
      const mockData = {
        types: [],
        name: '',
        event: {
          agent: ['agent'],
        },
      }
      const data = hasData(mockData)
      expect(data).toEqual(mockData)
    })

    it('returns null', () => {
      const mockData = {
        types: [],
        name: '',
        event: {},
      }
      const data = hasData(mockData)
      expect(data).toBeNull()
    })
  })

  describe('getWikiDataImageName', () => {
    it('returns the transformed string', () => {
      const mockUrl = `${config.env.wikidataImagePathname}andy Warhol-is just tooCool.jpg`

      const image = getWikiDataImageName(mockUrl)
      expect(image).toEqual('andy_Warhol-is_just_tooCool.jpg')
    })
  })

  describe('getWikiDataImage', () => {
    it('returns the transformed string', () => {
      const mockImage = `${config.env.wikidataImagePathname}andy Warhol-is just tooCool.jpg`
      const mockData: Array<IImages> = [
        {
          imageUrls: ['non-wikidata image 1'],
          attribution: '',
        },
        {
          imageUrls: ['non-wikidata image 2', mockImage],
          attribution: '',
        },
      ]

      const image = getWikidataImage(mockData)
      expect(image).toEqual(mockImage)
    })
  })

  describe('getSpecificReferredToBy', () => {
    it('returns data', () => {
      const mockData = {
        referred_to_by: [
          {
            type: 'LinguisticObject',
            content: 'Plan Your Visit',
            classified_as: [
              {
                id: config.dc.visitors,
                type: 'Type',
                _label: "Visitors' Statement",
              },
            ],
            _content_html:
              "<a href='https://britishart.yale.edu/visit'>Plan Your Visit</a>",
          },
        ],
      }
      const data = getSpecificReferredToBy(mockData, config.dc.visitors)
      expect(data).toEqual({
        content: 'Plan Your Visit',
        _content_html:
          "<a href='https://britishart.yale.edu/visit'>Plan Your Visit</a>",
      })
    })

    it('returns null', () => {
      const mockData = {}
      const data = getSpecificReferredToBy(mockData, 'test')
      expect(data).toBeNull()
    })
  })

  describe('getMultipleSpecificReferredToBy', () => {
    it('returns data', () => {
      const mockData = {
        referred_to_by: [
          {
            type: 'LinguisticObject',
            content: 'Plan Your Visit',
            classified_as: [
              {
                id: config.dc.visitors,
                type: 'Type',
                _label: "Visitors' Statement",
              },
            ],
            _content_html:
              "<a href='https://britishart.yale.edu/visit'>Plan Your Visit</a>",
          },
          {
            type: 'LinguisticObject',
            content: 'Plan Your Visit to the gallery',
            classified_as: [
              {
                id: config.dc.visitors,
                type: 'Type',
                _label: "Visitors' Statement",
              },
            ],
            _content_html:
              "<a href='https://gallery.yale.edu/visit'>Plan Your Visit to the gallery</a>",
          },
        ],
      }

      const data = getMultipleSpecificReferredToBy(mockData, config.dc.visitors)
      expect(data).toEqual([
        {
          content: 'Plan Your Visit',
          _content_html:
            "<a href='https://britishart.yale.edu/visit'>Plan Your Visit</a>",
        },
        {
          content: 'Plan Your Visit to the gallery',
          _content_html:
            "<a href='https://gallery.yale.edu/visit'>Plan Your Visit to the gallery</a>",
        },
      ])
    })
  })

  describe('transformStringForTestId', () => {
    it('returns the correct string', () => {
      const text = 'this is a string'
      const data = transformStringForTestId(text)
      expect(data).toEqual('this-is-a-string')
    })
  })
})
