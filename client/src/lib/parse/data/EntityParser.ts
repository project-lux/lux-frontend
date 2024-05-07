import config from '../../../config/config'
import {
  collectionsIcon,
  conceptsIcon,
  eventsIcon,
  objectsIcon,
  peopleOrgsIcon,
  placesIcon,
  softwareElectronicMediaIcon,
  specimensIcon,
  textualWorksIcon,
  visualWorksIcon,
} from '../../../config/resources'
import IEntity from '../../../types/data/IEntity'
import ILinks from '../../../types/data/ILinks'
import {
  IContentWithLanguage,
  INoteContent,
} from '../../../types/IContentWithLanguage'
import { IImages } from '../../../types/IImages'

import {
  isSpecimen,
  forceArray,
  getAttributedBy,
  getClassifiedAs,
  getIdentifiedByContent,
  getName,
  sortDataSources,
  validateClassifiedAsIdMatches,
  getSpecificReferredToBy,
  getMultipleSpecificReferredToBy,
} from './helper'

// Meant to be base class for other parsers
export default class EntityParser {
  json: IEntity

  constructor(json: IEntity) {
    this.json = json
  }

  /**
   * Returns an array of strings containing related web pages from /subject_of/digitally_carried_by/access_point
   * @returns {Array<string>}
   */
  getWebPages(): Array<string> {
    const urls: Array<string> = []
    const subjectOf = forceArray(this.json.subject_of)

    for (const depicting of subjectOf) {
      const digitallyCarriedBy = forceArray(depicting.digitally_carried_by)

      for (const digital of digitallyCarriedBy) {
        const d = new EntityParser(digital)
        if (d.isClassifiedAs(config.dc.webPage)) {
          const accessPoint = forceArray(digital.access_point)
          for (const p of accessPoint) {
            if (typeof p.id === 'string' && p.id.match(/^https?:\/\/.+/)) {
              urls.push(p.id)
            }
          }
        }
      }
    }
    return urls
  }

  /**
   * Returns the IIIF manfiest from /subject_of/digitally_carried_by/conforms_to/
   * @returns {string}
   */
  getManifestId(): string {
    const subjectOf = forceArray(this.json.subject_of)

    for (const depicting of subjectOf) {
      const digitallyCarriedBy = forceArray(depicting.digitally_carried_by)

      for (const digital of digitallyCarriedBy) {
        const conformsTo = forceArray(digital.conforms_to)

        for (const protocol of conformsTo) {
          if (
            protocol.id === 'http://iiif.io/api/presentation/3/context.json' ||
            protocol.id === 'http://iiif.io/api/presentation/2/context.json'
          ) {
            const accessPoint = forceArray(digital.access_point)

            if (accessPoint.length > 0) {
              return accessPoint[0].id
            }
          }
        }
      }
    }
    return ''
  }

  /**
   * Returns the parimary name from /identified_by
   * @param {string} lang the language of the name to retrieve
   * @returns {string}
   */
  getPrimaryName(lang: string): string {
    const identifiedBy = forceArray(this.json.identified_by)
    return getName(identifiedBy, lang) || ''
  }

  /**
   * Returns all of the names and their language provided in /identified_by
   * @param {boolean} removePrimaryName if true, will remove the primary name from the list of names
   * @returns {IContentWithLanguage | null}
   */
  getNames(removePrimaryName?: boolean): IContentWithLanguage | null {
    const identifiedBy = forceArray(this.json.identified_by)
    if (identifiedBy.length === 0) {
      return null
    }

    const data: IContentWithLanguage = {}

    identifiedBy
      .filter((identifier) => identifier.type === 'Name')
      .map((identifier) => {
        const classifiedAs = forceArray(identifier.classified_as)
        const identifiedByChild = forceArray(identifier.identified_by)
        const languages = forceArray(identifier.language)
        const language = languages.length > 0 ? languages[0].id : ''

        let label = ''
        if (classifiedAs.length > 0) {
          let ids = getClassifiedAs(classifiedAs)
          // check if there are multiple classifications for a name
          if (ids.length > 1) {
            // remove the sort label if there are more than one classifications
            ids = ids.filter((id) => id !== config.dc.sortName)
            // eslint-disable-next-line prefer-destructuring
            label = ids[0]
          } else if (ids.length === 1) {
            ;[label] = ids
          } else {
            label = ''
          }
        } else if (identifiedByChild.length > 0) {
          const content = getIdentifiedByContent(identifiedByChild)
          label = content.length > 0 ? content[0] : ''
        }

        // Only add the data to the returned object if there is content and the label is not a sort name
        if (identifier.content !== undefined && label !== config.dc.sortName) {
          if (data.hasOwnProperty(label)) {
            data[label].push({ content: identifier.content, language })
          } else {
            data[label] = [{ content: identifier.content, language }]
          }
        }
        return null
      })

    if (Object.keys(data).length === 0) {
      return null
    }

    // remove the primary name
    if (removePrimaryName) {
      const primaryName = this.getPrimaryName(config.dc.langen)
      Object.keys(data).map((names) =>
        // eslint-disable-next-line array-callback-return
        data[names].map((name) => {
          if (name.content === primaryName) {
            const ind = data[names].indexOf(name)
            data[names].splice(ind, 1)
          }
        }),
      )
    }

    // Filter any empty arrays
    Object.entries(data).map(([key, value]) => {
      if (value.length === 0) {
        delete data[key]
      }
      return null
    })

    if (Object.keys(data).length === 0) {
      return null
    }

    return data
  }

  /**
   * Returns array of uuids from /represents
   * @returns {Array<string>}
   */
  getRepresents(): Array<string> {
    const represents = forceArray(this.json.represents)
    return getClassifiedAs(represents)
  }

  /**
   * Returns array of uuids from /about
   * @returns {Array<string>}
   */
  getAbout(): Array<string> {
    const about = forceArray(this.json.about)
    return getClassifiedAs(about)
  }

  /**
   * Returns the entity type
   * @returns {string}
   */
  getType(): string {
    return this.json.type
  }

  /**
   * Returns an array of uuids from /classified_as
   * @returns {Array<string>}
   */
  getTypes(): Array<string> {
    const classifiedAs = forceArray(this.json.classified_as)

    return classifiedAs
      .filter((cl) => cl.type === 'Type')
      .map((cl) => cl.id)
      .filter((id) => id !== config.dc.collectionItem)
  }

  /**
   * Returns an array of uuids from /member_of
   * @returns {Array<string>}
   */
  getMemberOf(): Array<string> {
    const memberOf = forceArray(this.json.member_of)
    return memberOf.map((cl) => cl.id)
  }

  /**
   * Returns array of uuids from /part_of
   * @returns {Array<string>}
   */
  getPartOf(): Array<string> {
    const partOf = forceArray(this.json.part_of)
    return getClassifiedAs(partOf)
  }

  /**
   * Returns object with label as the key and array of urls as the value
   * Extract the record id, IIIF manifest, and /equivalent data
   * @returns {Record<string, Array<string>>}
   */
  getDataSources(): Record<string, Array<string>> {
    const yaleBaseUrls = [
      'https://ycba-lux.s3.amazonaws.com/v3/',
      'https://images.peabody.yale.edu/data/',
      'https://media.art.yale.edu/content/',
      'https://linked-art.library.yale.edu/node/',
    ]

    const equivalent = forceArray(this.json.equivalent)
    const endpoints = getClassifiedAs(equivalent)

    const manifest = this.getManifestId()
    const formattedManifest = {
      'IIIF Manifest': manifest !== '' ? [manifest] : [],
    }

    const recordId = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      'This Record': [this.json.id!],
    }

    const yaleRecords: Array<string> = []
    const externalRecords: Array<string> = []

    endpoints.map((endpoint) => {
      for (const baseUrl of yaleBaseUrls) {
        if (endpoint.includes(baseUrl)) {
          yaleRecords.push(endpoint)
          return null
        }
      }
      externalRecords.push(endpoint)
      return null
    })

    const yaleRecordsSorted = {
      'Yale Contributing Records': sortDataSources(yaleRecords),
    }

    const externalRecordsSorted = {
      'External Contributing Records': sortDataSources(externalRecords),
    }

    return {
      ...recordId,
      ...formattedManifest,
      ...yaleRecordsSorted,
      ...externalRecordsSorted,
    }
  }

  /**
   * Returns the copyright statement from /referred_to_by
   * @returns {INoteContent | null}
   */
  getCopyrightLicensingStatement(): INoteContent | null {
    return getSpecificReferredToBy(
      this.json,
      config.dc.copyrightLicensingStatement,
    )
  }

  /**
   * Returns the plan your visit link from /referred_to_by
   * @returns {INoteContent | null}
   */
  getPlanYourVisitLink(): Array<INoteContent> {
    return getMultipleSpecificReferredToBy(this.json, config.dc.visitors)
  }

  /**
   * Returns all Wikidata image data from /representation
   * @returns {Record<string, Array<string>>}
   */
  getImages(): Array<IImages> {
    const representation = forceArray(this.json.representation)
    if (representation.length === 0) {
      return []
    }

    const imageReps: IImages[] = []

    for (const rep of representation) {
      const digitallyShownBy = forceArray(rep.digitally_shown_by)
      const imageRep: IImages = {
        imageUrls: [],
        attribution: '',
      }

      for (const digital of digitallyShownBy) {
        const accessPoint = forceArray(digital.access_point)

        for (const point of accessPoint) {
          imageRep.imageUrls.push(point.id)
        }

        const copyrightStatement = new EntityParser(
          digital,
        ).getCopyrightLicensingStatement()
        imageRep.attribution =
          copyrightStatement !== null ? copyrightStatement.content : ''
        imageReps.push(imageRep)
      }
    }

    return imageReps
  }

  /**
   * Returns transformed note data from /referred_to_by
   * @returns {IContentWithLanguage | null}
   */
  getNotes(): IContentWithLanguage | null {
    if (this.json.referred_to_by === undefined) {
      return null
    }

    const referredToBy = forceArray(this.json.referred_to_by)

    const data: IContentWithLanguage = {}

    referredToBy.map((el: IEntity) => {
      let label
      const nestedElement = new EntityParser(el)
      const isEnglish = nestedElement.isInLanguage(config.dc.langen)
      const languages = forceArray(el.language)
      const language = languages.length > 0 ? languages[0].id : ''

      // used the /identified_by/[content] as the default label
      const nestedIdentifiedBy = forceArray(el.identified_by)
      if (nestedIdentifiedBy.length > 0) {
        label = nestedIdentifiedBy[0].content || undefined
      }

      // If the label is undefined, set it to the value of /classified_as/id
      if (label === undefined) {
        const nestedClassifiedAs = forceArray(el.classified_as)
        const labelClassifications = getClassifiedAs(nestedClassifiedAs)
        label =
          labelClassifications.length > 0
            ? labelClassifications[0]
            : 'Additional Notes'
      }

      const htmlContent = el._content_html
      const contentToDisplay = el.content
      if (contentToDisplay !== undefined || htmlContent !== undefined) {
        if (data.hasOwnProperty(label)) {
          // If the content has a language and it is english we want to push it to
          // the front of the array so it gets displayed first
          if (isEnglish) {
            data[label].unshift({
              content: contentToDisplay || '',
              language,
              _content_html: htmlContent,
            })
          } else {
            data[label].push({
              content: contentToDisplay || '',
              language,
              _content_html: htmlContent,
            })
          }
        } else {
          data[label] = [
            {
              content: contentToDisplay || '',
              language,
              _content_html: htmlContent,
            },
          ]
        }
      }

      return null
    })

    if (Object.keys(data).length === 0) {
      return null
    }

    // remove copyright statement and visitor statement
    Object.keys(data).map((key) => {
      if (
        key === config.dc.copyrightLicensingStatement ||
        key === config.dc.visitors
      ) {
        delete data[key]
      }
      return null
    })

    return data
  }

  /**
   * Returns the supertype icon to be displayed with the entity along with its alt text
   * @param {Array<string>} types types to be parsed when the entity is a HumanMadeObject
   * @returns {Array<string>}
   */
  getSupertypeIcon(types: Array<string>): Array<string> {
    const { type } = this.json
    switch (type) {
      case 'HumanMadeObject':
        if (types.some((typeIri) => isSpecimen(typeIri))) {
          return [specimensIcon, 'specimen']
        }

        return [objectsIcon, 'physical object']
      case 'DigitalObject':
        return [softwareElectronicMediaIcon, 'digital object']
      case 'VisualItem':
        return [visualWorksIcon, 'visual work']
      case 'Set':
        return [collectionsIcon, 'set and collection']
      case 'LinguisticObject':
        return [textualWorksIcon, 'linguistic object']
      case 'Person':
        return [peopleOrgsIcon, 'person and group']
      case 'Group':
        return [peopleOrgsIcon, 'person and group']
      case 'Place':
        return [placesIcon, 'place']
      case 'Currency':
        return [conceptsIcon, 'concept']
      case 'Language':
        return [conceptsIcon, 'concept']
      case 'Material':
        return [conceptsIcon, 'concept']
      case 'MeasurementUnit':
        return [conceptsIcon, 'concept']
      case 'Type':
        return [conceptsIcon, 'concept']
      case 'Activity':
        return [eventsIcon, 'event']
      case 'Period':
        return [eventsIcon, 'event']
      case 'Event':
        return [eventsIcon, 'event']
      default:
        return ['', '']
    }
  }

  /**
   * Returns array of links classified_as web pages from /subject_of
   * @returns {Array<{ contentIdentifier: string; link: string }>}
   */
  getAllSiteLinks(): Array<{ contentIdentifier: string; link: string }> {
    const subjectOf = forceArray(this.json.subject_of)
    const links = []

    for (const depicting of subjectOf) {
      const digitallyCarriedBy = forceArray(depicting.digitally_carried_by)

      for (const digital of digitallyCarriedBy) {
        let contentIdentifier = ''
        const accessPoint = forceArray(digital.access_point)
        const classifiedAs = digital.classified_as
        const identifiedBy = digital.identified_by
        if (identifiedBy !== undefined) {
          contentIdentifier = identifiedBy[0].content
        }

        if (
          classifiedAs !== undefined &&
          validateClassifiedAsIdMatches(classifiedAs[0], config.dc.webPage)
        ) {
          for (const p of accessPoint) {
            links.push({ contentIdentifier, link: p.id })
          }
        }
      }
    }

    return links.filter((siteLink) => siteLink.link !== '')
  }

  /**
   * Returns array of transformed link data from /subject_of that are not web pages or IIIF manifests
   * @returns {Array<{ contentIdentifier: string; link: string }>}
   */
  getHowDoISeeItLinks(): Array<{ contentIdentifier: string; link: string }> {
    const subjectOf = forceArray(this.json.subject_of)
    const links = []

    for (const depicting of subjectOf) {
      const digitallyCarriedBy = forceArray(depicting.digitally_carried_by)

      for (const digital of digitallyCarriedBy) {
        const accessPoint = forceArray(digital.access_point)
        const d = new EntityParser(digital)

        if (!d.isIIIFManifest() && !d.isClassifiedAs(config.dc.webPage)) {
          const name = d.getPrimaryName(config.dc.langen)

          for (const p of accessPoint) {
            links.push({
              contentIdentifier: name || p.id,
              link: p.id,
            })
          }
        }
      }
    }

    return links.filter((siteLink) => siteLink.link !== '')
  }

  /**
   * Returns array of transformed identifiers data from /identified_by
   * @returns {Array<{label: string; identifier: Array<string>; carriedOutBy: Array<string>}>}
   */
  getIdentifiers(): Array<{
    label: string
    identifier: Array<string>
    carriedOutBy: Array<string>
  }> {
    const identifiedBy = forceArray(this.json.identified_by)

    const identifiers = identifiedBy
      .filter((identifier) => identifier.type === 'Identifier')
      .map((identifier) => {
        const classifiedAs = forceArray(identifier.classified_as)
        const ids = classifiedAs.length > 0 ? getClassifiedAs(classifiedAs) : ''
        const attributedBy = forceArray(identifier.attributed_by)
        const carriedOutBy = getAttributedBy(attributedBy)
        const label = ids.length > 0 ? ids[0] : ''

        return {
          label,
          identifier: identifier.content,
          carriedOutBy,
        }
      })

    const identifierData: Array<{
      label: string
      identifier: Array<string>
      carriedOutBy: Array<string>
    }> = []

    for (const identifier of identifiers) {
      const existing = identifierData.filter(
        (val) => val.label === identifier.label,
      )

      if (existing.length > 0) {
        const existingIndex = identifierData.indexOf(existing[0])
        identifierData[existingIndex].identifier = identifierData[
          existingIndex
        ].identifier.concat(identifier.identifier)
      } else {
        identifier.identifier = [identifier.identifier]
        identifierData.push(identifier)
      }
    }

    return identifierData
  }

  /**
   * Returns /_links object from data
   * @returns {ILinks | null}
   */
  getHalLinks(): ILinks | null {
    const { _links } = this.json
    if (_links === undefined) {
      return null
    }

    return _links
  }

  /**
   * Returns the HAL link href from the data based on the requested link name
   * @param {string} requestedLink the HAL link name being requested
   * @returns {string | null}
   */
  getHalLink(requestedLink: string): string | null {
    const { _links } = this.json
    if (_links === undefined) {
      return null
    }

    if (Object.keys(_links).includes(requestedLink)) {
      const { _estimate } = _links[requestedLink]
      if (_estimate > 0 || _estimate === null) {
        return _links[requestedLink].href
      }
    }

    return null
  }

  /**
   * Determines if the current entity is classified as the specified type
   * @param {string} typeId the HAL link name being requested
   * @returns {boolean}
   */
  isClassifiedAs(typeId: string): boolean {
    const classifiedAs = forceArray(this.json.classified_as)

    for (const elem of classifiedAs) {
      if (elem.id === typeId) {
        return true
      }
    }
    return false
  }

  /**
   * Determines if the link from the nested object in /subject_to/digitallyCarriedBy object is a IIIF manifest
   * @returns {boolean}
   */
  isIIIFManifest(): boolean {
    const conformsTo = forceArray(this.json.conforms_to)

    for (const protocol of conformsTo) {
      if (/^https?:\/\/iiif.io\/api\/presentation/.test(protocol.id)) {
        return true
      }
    }
    return false
  }

  /**
   * Determines if the current entity is in the specified language
   * @param {string} langId the uuid of the language to compare against
   * @returns {boolean}
   */
  isInLanguage(langId: string): boolean {
    const langs = forceArray(this.json.language)

    for (const elem of langs) {
      if (elem.id === langId) {
        return true
      }
    }
    return false
  }
}
