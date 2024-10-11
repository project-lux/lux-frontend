import config from '../../../config/config'
import {
  capitalizeLabels,
  containsSpecificNote,
  forceArray,
  getClassifiedAs,
  getIdentifiedByContent,
  transformDate,
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
  getNestedCarriedOutBy,
  getEquivalentFromClassifiedAsArray,
  addOneToBceYear,
  getEndOfTheEnd,
  getBeginOfTheBegin,
} from '../../../lib/parse/data/helper'
import IAttribution from '../../../types/data/IAttribution'
import IEntity from '../../../types/data/IEntity'
import ITimeSpan from '../../../types/data/ITimeSpan'
import { entity as mockEntity } from '../../data/entity'
import ILinks from '../../../types/data/ILinks'
import { IHalLinks } from '../../../types/IHalLinks'
import { IImages } from '../../../types/IImages'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'
import {
  displayName,
  englishLanguage,
  first,
  primaryName,
  visitors,
} from '../../data/helperObjects'

describe('helper functions', () => {
  describe('capitalizeLabels', () => {
    it('returns transformed string', () => {
      const text = 'anDy Warhol is COol, too'
      expect(capitalizeLabels(text)).toEqual('Andy Warhol Is Cool, Too')
    })
  })

  describe('containsSpecificNote', () => {
    it('returns true', () => {
      const mockAat = config.aat.descriptionStatement
      const mockNotes: IContentWithLanguage = {
        'https://endpoint.yale.edu/data/concept/1': [
          {
            content: 'test 1',
          },
        ],
        'https://endpoint.yale.edu/data/concept/2': [
          {
            content: 'test 2',
            equivalent: [mockAat],
          },
        ],
      }
      const hasNote = containsSpecificNote(mockNotes, mockAat)
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

  describe('getNestedCarriedOutBy', () => {
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
      const data = getNestedCarriedOutBy(mockAttributedBy)
      expect(data).toEqual([
        `${config.env.dataApiBaseUrl}data/person/carried-out-by`,
      ])
    })
  })

  describe('getClassifiedAs', () => {
    it('returns array of ids', () => {
      const mockClassifiers: Array<IEntity> = [
        {
          type: 'Type',
          id: `${config.env.dataApiBaseUrl}data/concept/662260fa-f882-4174-b720-0791e45f7dca`,
        },
        ...first,
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

  describe('getContentByClassifiedAs', () => {
    it('returns array of matching objects', () => {
      const mockEquivalentId = config.aat.imprintStatement
      const entity = [
        {
          type: 'Name',
          content: 'some name',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/classified-as`,
              type: 'type',
              _label: 'test',
              equivalent: [
                {
                  id: mockEquivalentId,
                  type: 'type',
                  _label: 'test',
                },
              ],
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
      const arr = getContentByClassifiedAs(entity, mockEquivalentId)
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

  describe('getBeginOfTheBegin', () => {
    it('returns the ISO date from epoch', () => {
      const mockTimespan = {
        id: '',
        type: 'TimeSpan',
        _seconds_since_epoch_begin_of_the_begin: -1306627200,
        _seconds_since_epoch_end_of_the_end: -1306540801,
      }
      const date = getBeginOfTheBegin(mockTimespan)
      expect(date).toEqual('1928-08-06T00:00:00.000Z')
    })

    it('returns the ISO date from string', () => {
      const mockTimespan = {
        id: '',
        type: 'TimeSpan',
        begin_of_the_begin: '1928-03-04T00:00:00',
        end_of_the_end: '1928-12-31T23:59:59Z',
      }
      const date = getBeginOfTheBegin(mockTimespan)
      expect(date).toEqual('1928-03-04T05:00:00.000Z')
    })

    it('returns an empty string', () => {
      const mockTimespan = {
        id: '',
        type: 'TimeSpan',
      }
      const date = getBeginOfTheBegin(mockTimespan)
      expect(date).toEqual('')
    })
  })

  describe('getEndOfTheEnd', () => {
    it('returns the ISO date from epoch', () => {
      const mockTimespan = {
        id: '',
        type: 'TimeSpan',
        _seconds_since_epoch_begin_of_the_begin: 540950400,
        _seconds_since_epoch_end_of_the_end: 541036799,
      }
      const date = getEndOfTheEnd(mockTimespan)
      expect(date).toEqual('1987-02-22T23:59:59.000Z')
    })

    it('returns the ISO date from string', () => {
      const mockTimespan = {
        id: '',
        type: 'TimeSpan',
        begin_of_the_begin: '1950-03-04T00:00:00',
        end_of_the_end: '1950-12-31T23:59:59Z',
      }
      const date = getEndOfTheEnd(mockTimespan)
      expect(date).toEqual('1950-12-31T23:59:59.000Z')
    })

    it('returns an empty string', () => {
      const mockTimespan = {
        id: '',
        type: 'TimeSpan',
      }
      const date = getEndOfTheEnd(mockTimespan)
      expect(date).toEqual('')
    })
  })

  describe('transformedDate', () => {
    it('returns transformed dates AD', () => {
      const date = transformDate('1997-05-13T23:59:59Z')
      expect(date).toEqual('5/13/1997')
    })

    it('returns transformed dates BCE', () => {
      const date = transformDate('-1997-05-13T23:59:59Z')
      expect(date).toEqual('5/13/1998 BCE')
    })

    it('returns transformed empty string if year is greater than or equal to 9999', () => {
      const date = transformDate('9999-05-13T23:59:59Z')
      expect(date).toEqual('')
    })

    it('returns transformed empty string if year is less than or equal to -9999', () => {
      const date = transformDate('-9999-05-13T23:59:59Z')
      expect(date).toEqual('')
    })
  })

  describe('addOneToBceYear', () => {
    it('returns BCE year plus one', () => {
      const date = addOneToBceYear(1000)
      expect(date).toEqual(1001)
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
          language: englishLanguage,
          classified_as: primaryName,
        },
      ]
      const name = getName(obj, config.aat.langen)
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
          language: englishLanguage,
          classified_as: displayName,
        },
      ]
      const name = getName(obj, config.aat.langspa)
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
          classified_as: primaryName,
        },
      ]
      const name = getName(obj, config.aat.langen)
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
          language: englishLanguage,
        },
        {
          type: 'Name',
          content: 'Steiglitz, Alfred',
          classified_as: displayName,
        },
      ]
      const name = getName(obj, config.aat.langen)
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
      const name = getName(mockObject, config.aat.langen)
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
    const mockObject = primaryName

    it('returns true', () => {
      const classifierMatches = validateClassifiedAsIdMatches(mockObject, [
        config.aat.primaryName,
      ])
      expect(classifierMatches).toBeTruthy()
    })

    it('returns false', () => {
      const classifierMatches = validateClassifiedAsIdMatches(mockObject, [
        config.aat.displayName,
      ])
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
            classified_as: visitors,
            _content_html:
              "<a href='https://britishart.yale.edu/visit'>Plan Your Visit</a>",
          },
        ],
      }
      const data = getSpecificReferredToBy(mockData, config.aat.visitors)
      expect(data).toStrictEqual([
        {
          content: 'Plan Your Visit',
          _content_html:
            "<a href='https://britishart.yale.edu/visit'>Plan Your Visit</a>",
        },
      ])
    })

    it('returns empty array', () => {
      const mockData = {}
      const data = getSpecificReferredToBy(mockData, 'test')
      expect(data.length).toEqual(0)
    })
  })

  describe('getMultipleSpecificReferredToBy', () => {
    it('returns data', () => {
      const mockClassifiedAs = visitors
      const mockData = {
        referred_to_by: [
          {
            type: 'LinguisticObject',
            content: 'Plan Your Visit',
            classified_as: mockClassifiedAs,
            _content_html:
              "<a href='https://britishart.yale.edu/visit'>Plan Your Visit</a>",
          },
          {
            type: 'LinguisticObject',
            content: 'Plan Your Visit to the gallery',
            classified_as: mockClassifiedAs,
            _content_html:
              "<a href='https://gallery.yale.edu/visit'>Plan Your Visit to the gallery</a>",
          },
        ],
      }

      const data = getMultipleSpecificReferredToBy(
        mockData,
        config.aat.visitors,
      )
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

  describe('getEquivalentFromClassifiedAsArray', () => {
    const mockEquivalentOne = {
      id: config.aat.primaryName,
      type: 'aat',
      _label: 'primary name',
    }

    const mockEquivalentTwo = {
      id: config.aat.displayName,
      type: 'aat',
      _label: 'display name',
    }

    const mockEquivalentThree = {
      id: config.aat.archive,
      type: 'aat',
      _label: 'archive',
    }

    it('returns the array of equivalent objects', () => {
      const mockObject = {
        id: '',
        classified_as: [
          {
            id: 'classifiedAsOne',
            type: 'classified as',
            equivalent: [mockEquivalentOne, mockEquivalentTwo],
          },
          {
            id: 'classifiedAsTwo',
            type: 'classified as',
            equivalent: [mockEquivalentThree],
          },
        ],
      }
      const data = getEquivalentFromClassifiedAsArray(mockObject.classified_as)
      expect(data).toStrictEqual([
        mockEquivalentOne,
        mockEquivalentTwo,
        mockEquivalentThree,
      ])
    })
  })
})
