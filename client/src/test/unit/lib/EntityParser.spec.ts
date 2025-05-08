import { vi } from 'vitest'

import config from '../../../config/config'
import { unit } from '../../../config/objectsSearchTags'
import EntityParser from '../../../lib/parse/data/EntityParser'
import * as helperFunctions from '../../../lib/parse/data/helper'
import IDigitalObject from '../../../types/data/IDigitalObject'
import { entity as mockEntity } from '../../data/entity'
import {
  alternateName,
  animalSpecimensId,
  archivesId,
  copyrightStatement,
  displayName,
  displayNameId,
  englishLanguageId,
  frenchLanguage,
  frenchLanguageId,
  invertedTerms,
  primaryName,
  primaryNameId,
} from '../../data/helperObjects'
import physicalObject, { physicalObject as mockObject } from '../../data/object'

describe('EntityParser', () => {
  describe('getWebPages', () => {
    it('returns array of web pages', () => {
      const parser = new EntityParser(mockEntity)
      const webPages = parser.getWebPages()

      expect(webPages).toEqual([
        'https://test.yale.edu/site/link/2',
        'https://test.yale.edu/site/link/1',
      ])
    })
  })

  describe('getPrimaryName', () => {
    it('calls the getName function', () => {
      const parser = new EntityParser(mockEntity)
      const spy = vi
        .spyOn(helperFunctions, 'getName')
        .mockImplementation(() => 'primary name')

      parser.getPrimaryName(config.aat.langen)
      expect(spy).toHaveBeenCalledWith(
        mockEntity.identified_by,
        config.aat.langen,
      )
      spy.mockRestore()
    })

    it('returns the primary name', () => {
      const parser = new EntityParser(mockEntity)
      const primary = parser.getPrimaryName(config.aat.langen)
      expect(primary).toEqual('Mock Entity')
    })
  })

  describe('getNames', () => {
    it('returns all of the names in an entity', () => {
      const parser = new EntityParser(mockEntity)
      const names = parser.getNames()
      expect(names).toEqual({
        [`${config.env.dataApiBaseUrl}data/concept/primary-name`]: [
          {
            content: 'Mock Entity',
            language: englishLanguageId,
          },
          {
            content: 'animal de compagnie',
            language: frenchLanguageId,
          },
        ],
        [`${config.env.dataApiBaseUrl}data/concept/display-name`]: [
          {
            content: 'Name with no language',
            language: '',
          },
        ],
      })
    })

    it('returns all of the names minus the primary name', () => {
      const parser = new EntityParser(mockEntity)
      const names = parser.getNames(true)
      expect(names).toEqual({
        [`${config.env.dataApiBaseUrl}data/concept/primary-name`]: [
          {
            content: 'animal de compagnie',
            language: frenchLanguageId,
          },
        ],
        [`${config.env.dataApiBaseUrl}data/concept/display-name`]: [
          {
            content: 'Name with no language',
            language: '',
          },
        ],
      })
    })

    it('returns all of the names minus ones classified as inverted term', () => {
      const parser = new EntityParser({
        id: 'test',
        type: 'HumanMadeObject',
        identified_by: [
          {
            id: '',
            type: 'Name',
            content: 'This should be returned 1',
            classified_as: [...primaryName, ...invertedTerms],
          },
          {
            id: '',
            type: 'Name',
            content: 'This should NOT be returned 1',
            classified_as: [...invertedTerms],
          },
          {
            id: '',
            type: 'Name',
            content: 'This should be returned 2',
            classified_as: [...displayName, ...invertedTerms],
          },
          {
            id: '',
            type: 'Name',
            content: 'This should be returned 3',
            identified_by: [
              {
                id: '',
                type: 'content',
                content: 'Identified By Label',
              },
            ],
          },
          {
            id: '',
            content: 'This should NOT be returned 2',
            type: 'Identifier',
          },
          {
            id: '',
            content: 'This should be returned 4',
            type: 'Name',
          },
        ],
      })
      const names = parser.getNames()
      expect(names).toEqual({
        [primaryNameId]: [
          {
            content: 'This should be returned 1',
            language: '',
          },
        ],
        [displayNameId]: [
          {
            content: 'This should be returned 2',
            language: '',
          },
        ],
        'Identified By Label': [
          {
            content: 'This should be returned 3',
            language: '',
          },
        ],
        '': [
          {
            content: 'This should be returned 4',
            language: '',
          },
        ],
      })
    })

    it('returns all of the names minus the primary name that is not classified_as primary name', () => {
      const parser = new EntityParser({
        id: 'test',
        type: 'HumanMadeObject',
        identified_by: [
          {
            id: '',
            type: 'Name',
            content: 'animal de compagnie',
            classified_as: [...alternateName],
            language: [...frenchLanguage],
          },
          {
            id: '',
            type: 'Name',
            content: 'Name with no language',
            classified_as: [...displayName],
          },
        ],
      })
      const names = parser.getNames(true)
      expect(names).toEqual({
        [displayNameId]: [
          {
            content: 'Name with no language',
            language: '',
          },
        ],
      })
    })

    it('filters a key value pair if value is empty array', () => {
      const mockData = {
        id: 'mock id',
        type: 'HumanMadeObject',
        '@context': 'https://linked.art/ns/v1/data.json',
        _label: 'Test Object',
        identified_by: [
          {
            id: '',
            type: 'Name',
            content: 'Mock Entity',
            classified_as: [...primaryName],
          },
          {
            id: '',
            type: 'Name',
            content: 'animal de compagnie',
            language: [...frenchLanguage],
          },
        ],
      }

      const parser = new EntityParser(mockData)
      const names = parser.getNames(true)
      expect(names).toEqual({
        '': [
          {
            content: 'animal de compagnie',
            language: frenchLanguageId,
          },
        ],
      })
    })

    it('returns null if an array is empty', () => {
      const mockData = {
        id: 'mock id',
        type: 'HumanMadeObject',
        '@context': 'https://linked.art/ns/v1/data.json',
        _label: 'Test Object',
        identified_by: [
          {
            id: '',
            type: 'Name',
            content: 'Mock Entity',
            classified_as: [...primaryName],
          },
        ],
      }

      const parser = new EntityParser(mockData)
      const names = parser.getNames(true)
      expect(names).toBeNull()
    })
  })

  describe('getRepresents', () => {
    it('calls the getClassifiedAs function', () => {
      const parser = new EntityParser(mockEntity)
      const spy = vi
        .spyOn(helperFunctions, 'getClassifiedAs')
        .mockImplementation(() => ['id1', 'id2'])

      parser.getRepresents()
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    it('returns the array of uuids', () => {
      const parser = new EntityParser(mockEntity)
      const represents = parser.getRepresents()
      expect(represents).toEqual([
        `${config.env.dataApiBaseUrl}data/concept/represents-1`,
        `${config.env.dataApiBaseUrl}data/concept/represents-2`,
      ])
    })
  })

  describe('getAbout', () => {
    it('calls the getClassifiedAs function', () => {
      const parser = new EntityParser(mockEntity)
      const spy = vi
        .spyOn(helperFunctions, 'getClassifiedAs')
        .mockImplementation(() => ['id1', 'id2'])

      parser.getAbout()
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })

    it('returns the array of uuids', () => {
      const parser = new EntityParser(mockEntity)
      const about = parser.getAbout()
      expect(about).toEqual([
        `${config.env.dataApiBaseUrl}data/concept/about-1`,
        `${config.env.dataApiBaseUrl}data/concept/about-2`,
      ])
    })
  })

  describe('getType', () => {
    it('returns the type', () => {
      const parser = new EntityParser(mockEntity)
      const type = parser.getType()
      expect(type).toEqual('HumanMadeObject')
    })
  })

  describe('getTypes', () => {
    it('returns all of the types', () => {
      const parser = new EntityParser(mockEntity)
      const types = parser.getTypes()
      expect(types).toEqual([
        `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
        archivesId,
        animalSpecimensId,
      ])
    })
  })

  describe('getMemberOf', () => {
    it('returns array of strings', () => {
      const parser = new EntityParser(mockEntity)
      const types = parser.getMemberOf()
      expect(types).toEqual([
        `${config.env.dataApiBaseUrl}data/concept/member-of-1`,
        `${config.env.dataApiBaseUrl}data/concept/member-of-2`,
      ])
    })
  })

  describe('getDataSources', () => {
    it('returns data sources organized and in alphabetical order', () => {
      const element = new EntityParser(mockEntity)
      const equivalent = element.getDataSources()
      expect(equivalent).toMatchObject({
        'External Contributing Records': [
          'https://d-nb.info/gnd/118500856',
          'https://viaf.org/viaf/3145857035722921320',
          'http://viaf.org/viaf/5811159477600927990004',
          'http://vocab.getty.edu/ulan/500404158',
        ],
        'IIIF Manifest': [
          'https://manifests.collections.yale.edu/unit/obj/12345',
        ],
        'This Record': [`${config.env.dataApiBaseUrl}data/object/1`],
        'Yale Contributing Records': [
          'https://linked-art.library.yale.edu/node/test',
        ],
      })
    })
  })

  describe('getCopyrightLicensingStatement', () => {
    it('returns the content with no html content', () => {
      const parser = new EntityParser(mockEntity)
      const types = parser.getCopyrightLicensingStatement()
      expect(types).toEqual([
        {
          _content_html: undefined,
          content: 'Copyright licensing statement',
        },
      ])
    })

    it('returns the html content if content is undefined', () => {
      const parser = new EntityParser({
        type: 'object',
        referred_to_by: [
          {
            id: `${config.env.dataApiBaseUrl}data/text/copyright-licensing-statement`,
            type: 'LinguisticObject',
            _content_html: '<span>Copyright licensing statement</span>',
            classified_as: [...copyrightStatement],
          },
        ],
      })
      const types = parser.getCopyrightLicensingStatement()
      expect(types).toEqual([
        {
          _content_html: '<span>Copyright licensing statement</span>',
          content: '',
        },
      ])
    })
  })

  describe('getPlanYourVisitLink', () => {
    it('returns the content with no html content', () => {
      const parser = new EntityParser(mockObject)
      const types = parser.getPlanYourVisitLink()
      expect(types).toEqual([
        {
          _content_html:
            "<a href='https://britishart.yale.edu/visit'>Plan Your Visit</a>",
          content: 'Plan Your Visit',
        },
      ])
    })
  })

  describe('getImages', () => {
    it('returns image data', () => {
      const parser = new EntityParser(mockEntity)
      const imageReps = parser.getImages()

      expect(imageReps).toEqual([
        {
          imageUrls: [
            'http://commons.wikimedia.org/wiki/Special:FilePath/Alfred%20Stieglitz%20self-portrait%2C%20freienwald%2C%201886.jpg',
          ],
          attribution: '',
        },
        {
          imageUrls: [
            'https://commons.wikimedia.org/wiki/Special:Filepath/Alfred_Stieglitz_self-portrait,_freienwald,_1886.jpg',
          ],
          attribution: 'by Jack Mitchell',
        },
      ])
    })
  })

  describe('getNotes', () => {
    it('returns notes with filtered notes', () => {
      const element = new EntityParser(mockEntity)
      const notes = element.getNotes()
      expect(notes).toEqual({
        Attributed: [
          {
            content: '',
            language: '',
            equivalent: [],
            _content_html:
              '<span class="lux_data"><a href="https://artgallery.yale.edu/print-study-room">By appointment, Duffy Study Room</a></span>',
          },
        ],
        'https://endpoint.yale.edu/data/concept/classified-as-2': [
          {
            content: 'Note 2',
            language: englishLanguageId,
            _content_html: undefined,
            equivalent: [],
          },
        ],
      })
    })
  })

  describe('getSupertypeIcon', () => {
    it('returns array with icon and alt text', () => {
      const element = new EntityParser({
        type: 'Person',
      })
      const icons = element.getSupertypeIcon()
      expect(icons).toEqual([
        '/src/resources/images/entity/people-orgs.svg',
        'person and group',
      ])
    })

    it('returns array with icon and alt text of specimen', () => {
      const element = new EntityParser(mockEntity)
      const icons = element.getSupertypeIcon()
      expect(icons).toEqual([
        "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='48'%20height='48'%20viewBox='0%200%2048%2048'%3e%3cg%20fill='none'%20fill-rule='evenodd'%20stroke='%2300356B'%20stroke-width='2'%20transform='translate(4%2011)'%3e%3cpath%20d='M19.194%206.04C16.177%203.062.554%201.19.008%209.74c-.216%203.38%204.24%204.407%205.944%205.098%201.704.69.983%203.513%203.35%203.513M20.806%206.04c3.017-2.979%2018.64-4.851%2019.186%203.7.216%203.38-4.24%204.407-5.944%205.098-1.704.69-.983%203.513-3.35%203.513'/%3e%3cpath%20stroke-linecap='round'%20d='M17.592%200c0%201.904%201.165%205.746%202.601%205.746%201.437%200%202.601-3.842%202.601-5.746'/%3e%3cellipse%20cx='20.19'%20cy='12.93'%20rx='2.6'%20ry='7.18'/%3e%3cpath%20d='M20.193%2020.111c-1.523%203.88-4.882%207.805-9.129%203.395-4.246-4.41.134-14.437%206.754-14.437-.845%206.685.556%2010.593%202.375%2011.042z'/%3e%3cpath%20d='M19.788%2020.111c1.523%203.88%204.882%207.805%209.129%203.395%204.246-4.41-.134-14.437-6.754-14.437.845%206.685-.556%2010.593-2.375%2011.042z'/%3e%3c/g%3e%3c/svg%3e",
        'specimen',
      ])
    })
  })

  describe('getAllSiteLinks', () => {
    it('returns links that are web pages', () => {
      const element = new EntityParser(mockEntity)
      const links = element.getAllSiteLinks()
      expect(links).toEqual([
        { contentIdentifier: '', link: 'https://test.yale.edu/site/link/2' },
        {
          contentIdentifier: 'site link identified by',
          link: 'https://test.yale.edu/site/link/1',
        },
      ])
    })
  })

  describe('getHowDoISeeItLinks', () => {
    it('returns links without web pages or IIIF manifests', () => {
      const element = new EntityParser(mockEntity)
      const links = element.getHowDoISeeItLinks()
      expect(links).toEqual([
        {
          contentIdentifier: 'Name of non-web page link',
          link: 'https://www.not-a-web-page.com/',
        },
      ])
    })
  })

  describe('getIdentifiers', () => {
    it('returns array of identifier data', () => {
      const parser = new EntityParser(mockEntity)
      const identifiers = parser.getIdentifiers()
      expect(identifiers).toEqual([
        {
          label: `${config.env.dataApiBaseUrl}data/concept/classified-as`,
          identifier: ['12345abcde'],
          carriedOutBy: [
            `${config.env.dataApiBaseUrl}data/group/carried-out-by-library`,
          ],
          equivalent: [],
        },
      ])
    })
  })

  describe('getIdentifiedByAgent', () => {
    it('returns array of agents corresponding to the idenfitiers', () => {
      const parser = new EntityParser(mockEntity)
      const identifiers = parser.getIdentifiers()
      expect(identifiers).toEqual([
        {
          label: `${config.env.dataApiBaseUrl}data/concept/classified-as`,
          identifier: ['12345abcde'],
          carriedOutBy: [
            `${config.env.dataApiBaseUrl}data/group/carried-out-by-library`,
          ],
          equivalent: [],
        },
      ])
    })
  })

  describe('getHalLinks', () => {
    it('returns HAL link object from data', () => {
      const parser = new EntityParser(mockEntity)
      const halLinks = parser.getHalLinks()

      expect(halLinks).toEqual(mockEntity._links)
    })

    it('returns null', () => {
      const parser = new EntityParser({
        type: 'HumanMadeObject',
      })
      const halLinks = parser.getHalLinks()

      expect(halLinks).toBeNull()
    })
  })

  describe('getHalLink', () => {
    it('returns requested HAL link href', () => {
      const parser = new EntityParser(mockEntity)
      const halLink = parser.getHalLink(unit.searchTag)

      expect(halLink).toEqual(mockEntity._links![unit.searchTag].href)
    })

    it('returns null', () => {
      const parser = new EntityParser(mockEntity)
      const halLink = parser.getHalLink('fake tag')

      expect(halLink).toBeNull()
    })
  })

  describe('isClassifiedAs', () => {
    it('returns true', () => {
      const parser = new EntityParser(mockEntity)
      const value = parser.isClassifiedAs(config.aat.archive)

      expect(value).toBeTruthy()
    })

    it('returns false', () => {
      const parser = new EntityParser(mockEntity)
      const value = parser.isClassifiedAs('fake classification')

      expect(value).toBeFalsy()
    })
  })

  describe('isIIIFManifest', () => {
    it('returns true', () => {
      const parser = new EntityParser({
        id: '',
        type: 'LinguisticObject',
        _label: 'IIIF v3 manifest',
        conforms_to: [
          {
            id: 'http://iiif.io/api/presentation/3/context.json',
            type: 'InformationObject',
          },
        ],
        access_point: [
          {
            id: 'https://manifests.collections.yale.edu/unit/obj/12345',
            type: 'DigitalObject',
          },
        ],
      } as IDigitalObject)
      const isManifest = parser.isIIIFManifest()

      expect(isManifest).toBeTruthy()
    })

    it('returns false', () => {
      const parser = new EntityParser({
        id: '',
        type: 'LinguisticObject',
        _label: 'IIIF v3 manifest',
        access_point: [
          {
            id: 'https://manifests.collections.yale.edu/unit/obj/12345',
            type: 'DigitalObject',
          },
        ],
      } as IDigitalObject)
      const isManifest = parser.isIIIFManifest()

      expect(isManifest).toBeFalsy()
    })
  })

  describe('isInLanguage', () => {
    it('returns true', () => {
      const parser = new EntityParser(mockEntity)
      const isLanguage = parser.isInLanguage(config.aat.langen)

      expect(isLanguage).toBeTruthy()
    })

    it('returns false', () => {
      const parser = new EntityParser(mockEntity)
      const isLanguage = parser.isInLanguage(config.aat.langdut)

      expect(isLanguage).toBeFalsy()
    })
  })

  describe('getAccessStatement', () => {
    it('returns access statement from notes', () => {
      const object = new EntityParser(physicalObject)
      const accessStatement = object.getAccessStatement()
      expect(accessStatement).toEqual([
        {
          content: 'On view',
          _content_html: undefined,
        },
      ])
    })
  })
})
