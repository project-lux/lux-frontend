import { isUndefined } from 'lodash'

import config from '../../../config/config'
import {
  collectionsIcon,
  conceptsIcon,
  eventsIcon,
  objectsIcon,
  peopleOrgsIcon,
  placesIcon,
  softwareElectronicMediaIcon,
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
import { recordTypes } from '../../../config/advancedSearch/inputTypes'
import { iconAats } from '../../../config/icons'

import {
  forceArray,
  getClassifiedAs,
  getIdentifiedByContent,
  getName,
  sortDataSources,
  validateClassifiedAsIdMatches,
  getSpecificReferredToBy,
  getMultipleSpecificReferredToBy,
  getNestedCarriedOutBy,
  isEquivalent,
  getEquivalentFromClassifiedAsArray,
} from './helper'

// Meant to be base class for other parsers
export default class EntityParser {
  json: IEntity

  constructor(json: IEntity) {
    this.json = json
  }

  /**
   * Returns an array of strings containing related web pages from /subject_of/digitally_carried_by/access_point
   * @returns {string}
   */
  getEntityClass(scope: string): string {
    const { type } = this.json
    const entityClass: string =
      recordTypes[scope][type] !== undefined ? recordTypes[scope][type] : type
    return entityClass
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
        if (d.isClassifiedAs(config.aat.webPage)) {
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
        const notation =
          languages.length > 0 ? languages[0].notation : undefined
        let label = ''

        // The label will be an empty string if it does not come from the data
        if (classifiedAs.length === 0 && identifiedByChild.length === 0) {
          label = ''
        }

        // Get the label of the list of names from either the nested classified_as or nested identified_by
        if (classifiedAs.length > 0) {
          // Filter out inverted terms classifications
          const ids = getClassifiedAs(classifiedAs, [config.aat.invertedTerms])
          // check if there are multiple classifications for a name
          if (ids.length > 0) {
            ;[label] = ids
          } else {
            return null
          }
        } else if (identifiedByChild.length > 0) {
          // Get label from identified_by if there is no classified_as data
          const content = getIdentifiedByContent(identifiedByChild)
          label = content.length > 0 ? content[0] : ''
        }

        if (identifier.content !== undefined) {
          if (data.hasOwnProperty(label)) {
            data[label].push({
              content: identifier.content,
              language,
              notation,
            })
          } else {
            data[label] = [{ content: identifier.content, language, notation }]
          }
        }
        return null
      })

    if (Object.keys(data).length === 0) {
      return null
    }

    // remove the primary name
    if (removePrimaryName) {
      const primaryName = this.getPrimaryName(config.aat.langen)
      Object.keys(data).map((names) =>
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
   * Returns array of uuids from /equivalent
   * @returns {Array<string>}
   */
  getEquivalent(): Array<string> {
    const equivalent = forceArray(this.json.equivalent)
    return getClassifiedAs(equivalent)
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
      .filter((cl) => {
        if (cl.type === 'Type') {
          if (cl.hasOwnProperty('equivalent')) {
            for (const eq of cl.equivalent) {
              if (eq.id !== config.aat.collectionItem) {
                return cl
              }
            }
          } else {
            return cl
          }
        }
        return null
      })
      .filter((clFil) => clFil !== null)
      .map((cl) => cl.id)
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
   * Retrieves /referred_to_by data and extracts the access statement
   * @returns {Array<INoteContent>}
   */
  getAccessStatement(): Array<INoteContent> {
    return getSpecificReferredToBy(this.json, config.aat.accessStatement)
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
      'https://data.paul-mellon-centre.ac.uk/',
      'https://paperbase.xyz/',
    ]

    const equivalent = forceArray(this.json.equivalent)
    const endpoints = getClassifiedAs(equivalent)

    const manifest = this.getManifestId()
    const formattedManifest = {
      'IIIF Manifest': manifest !== '' ? [manifest] : [],
    }

    const recordId = {
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
   * @returns {Array<INoteContent>}
   */
  getCopyrightLicensingStatement(): Array<INoteContent> {
    return getSpecificReferredToBy(
      this.json,
      config.aat.copyrightLicensingStatement,
    )
  }

  /**
   * Returns the plan your visit link from /referred_to_by
   * @returns {INoteContent | null}
   */
  getPlanYourVisitLink(): Array<INoteContent> {
    return getMultipleSpecificReferredToBy(this.json, config.aat.visitors)
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

        const copyrightStatements = new EntityParser(
          digital,
        ).getCopyrightLicensingStatement()
        imageRep.attribution =
          copyrightStatements.length > 0 ? copyrightStatements[0].content : ''
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
      let equivalent

      // check if note is classified as copyright statement or visitors
      // do not parse the entity and return null as they should not be displayed with notes
      if (!isUndefined(el.classified_as)) {
        if (
          validateClassifiedAsIdMatches(el.classified_as, [
            config.aat.copyrightLicensingStatement,
            config.aat.visitors,
            config.aat.accessStatement,
          ])
        ) {
          return null
        }
      }

      const nestedElement = new EntityParser(el)
      // get languages
      const isEnglish = nestedElement.isInLanguage(config.aat.langen)
      const languages = forceArray(el.language)
      const language = languages.length > 0 ? languages[0].id : ''
      const notation = languages.length > 0 ? languages[0].notation : undefined

      // used the /identified_by/[content] as the default label
      const nestedIdentifiedBy = forceArray(el.identified_by)
      if (nestedIdentifiedBy.length > 0) {
        label = nestedIdentifiedBy[0].content || undefined
      }

      // If the label is undefined, set it to the value of /classified_as/id
      const nestedClassifiedAs = forceArray(el.classified_as)
      if (label === undefined) {
        const labelClassifications = getClassifiedAs(nestedClassifiedAs)
        label =
          labelClassifications.length > 0
            ? labelClassifications[0]
            : 'Additional Notes'
      }
      for (const cl of nestedClassifiedAs) {
        const nestedEntity = new EntityParser(cl)
        equivalent = nestedEntity.getEquivalent()
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
              equivalent,
              notation,
            })
          } else {
            data[label].push({
              content: contentToDisplay || '',
              language,
              _content_html: htmlContent,
              equivalent,
              notation,
            })
          }
        } else {
          data[label] = [
            {
              content: contentToDisplay || '',
              language,
              _content_html: htmlContent,
              equivalent,
              notation,
            },
          ]
        }
      }

      return null
    })

    if (Object.keys(data).length === 0) {
      return null
    }

    return data
  }

  /**
   * Returns the supertype icon to be displayed with the entity along with its alt text
   * @returns {Array<string>}
   */
  getSupertypeIcon(): Array<string> {
    const classifiedAs = forceArray(this.json.classified_as)
    const equivalent = getEquivalentFromClassifiedAsArray(classifiedAs).map(
      (obj) => obj.id,
    )

    for (const [key, value] of iconAats) {
      if (equivalent.includes(key)) {
        return value
      }
    }

    const { type } = this.json
    // For unspecified types
    switch (type) {
      case 'HumanMadeObject':
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

        if (classifiedAs !== undefined) {
          if (
            validateClassifiedAsIdMatches(classifiedAs, [config.aat.webPage])
          ) {
            for (const p of accessPoint) {
              links.push({ contentIdentifier, link: p.id })
            }
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

        if (!d.isIIIFManifest() && !d.isClassifiedAs(config.aat.webPage)) {
          const name = d.getPrimaryName(config.aat.langen)

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
    equivalent: Array<string>
  }> {
    const identifiedBy = forceArray(this.json.identified_by)

    const identifiers = identifiedBy
      .filter((identifier) => {
        if (identifier.type === 'Identifier') {
          if (identifier.classified_as) {
            // filter identifiers that are classified as sorting identifiers
            for (const cl of identifier.classified_as) {
              const nestedEntity = new EntityParser(cl)
              const aats = nestedEntity.getEquivalent()
              if (!aats.includes(config.aat.sortValue)) {
                return identifier
              }
            }
          } else {
            return identifier
          }
        }
        return null
      })
      .map((identifier) => {
        const classifiedAs = forceArray(identifier.classified_as)
        // get equivalent ids
        const equivalentObjects = classifiedAs
          .map((cl) => {
            if (cl.hasOwnProperty('equivalent')) {
              const { equivalent } = cl
              for (const eq of equivalent) {
                return eq.id
              }
            }
            return null
          })
          .filter((eq) => eq !== null)
        const ids = classifiedAs.length > 0 ? getClassifiedAs(classifiedAs) : []

        const attributedBy = forceArray(identifier.attributed_by)
        const assignedBy = forceArray(identifier.assigned_by)
        const agent = [
          ...getNestedCarriedOutBy(attributedBy),
          ...getNestedCarriedOutBy(assignedBy),
        ]
        const label = ids.length > 0 ? ids[0] : ''

        return {
          label,
          identifier: identifier.content,
          carriedOutBy: agent,
          equivalent: equivalentObjects,
        }
      })

    const identifierData: Array<{
      label: string
      identifier: Array<string>
      carriedOutBy: Array<string>
      equivalent: Array<string>
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

    return isEquivalent(classifiedAs, typeId)
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

    return isEquivalent(langs, langId)
  }
}
