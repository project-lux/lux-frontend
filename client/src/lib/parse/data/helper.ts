/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import { IHalLinks } from '../../../types/IHalLinks'
import IAttribution from '../../../types/data/IAttribution'
import IEntity from '../../../types/data/IEntity'
import ILinks from '../../../types/data/ILinks'
import ITimeSpan from '../../../types/data/ITimeSpan'
import {
  collectionsIcon,
  objectsIcon,
  softwareElectronicMediaIcon,
  textualWorksIcon,
  visualWorksIcon,
} from '../../../config/resources'
import {
  IContentWithLanguage,
  INoteContent,
} from '../../../types/IContentWithLanguage'
import IIdentifier from '../../../types/data/IIdentifier'
import { IImages } from '../../../types/IImages'

import EntityParser from './EntityParser'

/**
 * Capitalizes the first letter in each word in the given string
 * @param {string} text the text to capitalize
 * @returns {string}
 */
const ignoreCapitalization = new Set(['IIIF Manifest'])
export const capitalizeLabels = (text: string): string => {
  if (ignoreCapitalization.has(text)) {
    return text
  }
  return text
    .toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

/**
 * Determines if notes array contains a specific note type
 * @param {IContentWithLanguage | null} notes Note content
 * @param {string} identifer Identifier to compare to each note to determine if it exists in notes
 * @returns {boolean}
 */
export const containsSpecificNote = (
  notes: IContentWithLanguage | null,
  identifer: string,
): boolean => {
  if (notes === null) {
    return false
  }

  if (Object.keys(notes).includes(identifer)) {
    return true
  }

  return false
}

/**
 * Returns an array containing the content passed
 * @param {any} x the content to wrap in an array
 * @returns {Array<any>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const forceArray = (x: any): Array<any> => {
  if (x === null || x === undefined) {
    return []
  }
  if (Array.isArray(x)) {
    return x
  }
  return [x]
}

/**
 * Parses the provided /attributed_by data to return the data from the nested /carried_out_by object
 * @param {Array<IAttribution>} attributedBy the array of objects from a /attributed_by property
 * @returns {Array<string>}
 */
export const getAttributedBy = (
  attributedBy: Array<IAttribution>,
): Array<string> => {
  if (attributedBy.length === 0) {
    return []
  }

  const carriedOutByIds = attributedBy.map((attr) => {
    const carriedOutBy = forceArray(attr.carried_out_by)

    const ids = getClassifiedAs(carriedOutBy)
    for (const id of ids) {
      return id
    }

    return ''
  })

  return carriedOutByIds
}

/**
 * Parses the data from /classified_as and returns all uuids from the nested objects
 * This function is used for non /classified_as properties with Array<IEntity> types as well
 * @param {Array<IEntity>} classifications the array of objects from a /classified_as property
 * @returns {Array<string>}
 */
export const getClassifiedAs = (
  classifications: Array<IEntity>,
): Array<string> => {
  const classifiedAs = forceArray(classifications)

  return classifiedAs
    .map((classification) => classification.id)
    .filter((id) => id !== config.dc.first)
    .filter((id) => id !== undefined)
}

/**
 * Determines if the uuid provided is classified as a specimen
 * @param {string} iri the uuid to be compared
 * @returns {boolean}
 */
let specimenConstants: Set<string> | null = null
export const isSpecimen = (iri: string): boolean => {
  if (specimenConstants === null) {
    specimenConstants = new Set([
      config.dc.fossil,
      config.dc.animalSpecimens,
      config.dc.plantSpecimens,
      config.dc.biologicalSpecimens,
    ])
  }
  return specimenConstants.has(iri)
}

/**
 * Returns the value of /content properties from nested objects in /identified_by as an array
 * @param {Array<IEntity>} identifiers the array of objects in /identified_by
 * @returns {Array<string>}
 */
export const getIdentifiedByContent = (
  identifiers: Array<IEntity>,
): Array<string> => {
  const identifiedBy = forceArray(identifiers)

  return identifiedBy.map((id) => id.content)
}

/**
 * Compares the id value of the nested /classified_as object within the data passed and returns those objects
 * with the matching classifier
 * @param {any} data the data to test against
 * @param {string} requestedClassifier the uuid to compare against the nested object id value
 * @returns {Array<IEntity>}
 */
export const getClassifiedAsWithMatchingClassifier = (
  data: any,
  requestedClassifier: string,
): Array<IEntity> => {
  const classifiedAs = forceArray(data)
  if (classifiedAs.length === 0) {
    return []
  }

  const matchingClassifierData = classifiedAs
    .map((classification) => {
      const classifierObject = forceArray(classification)
      for (const cl of classifierObject) {
        const nestedClassification = forceArray(cl.classified_as)
        for (const nested of nestedClassification) {
          if (validateClassifiedAsIdMatches(nested, requestedClassifier)) {
            return cl
          }
          return null
        }
        return null
      }
      return null
    })
    .filter((el) => el !== null)

  return matchingClassifierData
}

/**
 * Returns the content value of the nested objects based on their classified_as
 * @param {Array<IEntity>} elem the array of objects to parse
 * @param {string} requestedClassifier the uuid to compare against the nested object id value
 * @returns {Array<string>}
 */
export const getContentByClassifiedAs = (
  elem: Array<IEntity>,
  requestedClassifier: string,
): Array<string> => {
  const classifiedAs = forceArray(elem)

  return classifiedAs
    .map((el) => {
      const p = new EntityParser(el)
      if (p.isClassifiedAs(requestedClassifier)) {
        return el._content_html || el.content
      }
      return null
    })
    .filter((el) => el !== null)
}

/**
 * Returns the content value of the nested /identified_by within a /timespan object
 * @param {ITimeSpan | undefined} timespan the object from the /timespan property
 * @returns {Array<string>}
 */
export const getDateContent = (
  timespan: ITimeSpan | undefined,
): Array<string> => {
  if (timespan === undefined) {
    return []
  }

  const identifiedBy = forceArray(timespan.identified_by)

  return identifiedBy
    .map((id) => id.content)
    .filter((cont) => cont !== undefined)
}

/**
 * Returns a date with proper formatting
 * @param {string | undefined} date the UTC date format YYYY-MM-DDThh:mm
 * @returns {string}
 */
export const transformDate = (date: string | undefined): string => {
  if (date === undefined) {
    return ''
  }

  const dateIsBc = date[0] === '-'
  const dateToParse = dateIsBc ? date.slice(1) : date
  const transformedDate = new Date(dateToParse)
  // check if date is valid by checking if it is a number
  if (isNaN(transformedDate.getUTCDate())) {
    return ''
  }

  const month = transformedDate.getUTCMonth() + 1
  const day = transformedDate.getUTCDate()
  const year = transformedDate.getUTCFullYear()

  let newDate = `${month}/${day}/${year}`
  // Remove month and day if it is January 1st
  if (month === 1 && day === 1) {
    newDate = year.toString()
  }

  if (dateIsBc) {
    return `${newDate} BCE`
  }
  return newDate
}

/**
 * Returns the label to be displayed alongside the primary names of the entity
 * @param {string} path the pathname used to determine the label
 * @returns {string}
 */
export const getLabelBasedOnEntityType = (path: string): string => {
  // Objects and works should show names as Title
  if (
    path.includes('object') ||
    path.includes('digital') ||
    path.includes('visual') ||
    path.includes('text') ||
    path.includes('set')
  ) {
    return 'Titles'
  }

  return 'Name'
}

/**
 * Returns name to be displayed as the primary name
 * This requires parsing all nested objects in /identified_by where the /type='Name'
 * @param {Array<any>} identifiers the array of objects from /identified_by
 * @param {string} validatingLanguage the language of the name being requested
 * @returns {string | null}
 */
export const getName = (
  identifiers: Array<any>,
  validatingLanguage: string,
): string | null => {
  const names: Array<string> = []
  const matchingNames: Array<string> = []
  const lanuguageMatches: Array<string> = []
  const classificationMatches: Array<string> = []
  const alternativeNames: Array<string> = []
  const unclassifiedNames: Array<string> = []

  // eslint-disable-next-line array-callback-return
  identifiers.map((identifier: IIdentifier) => {
    if (identifier.type === 'Name') {
      const hasClassifiedAs = identifier.classified_as !== undefined
      const classifiedAsIds = hasClassifiedAs
        ? getClassifiedAs(forceArray(identifier.classified_as))
        : []
      // check if name is classified_as a primary name
      const isPrimaryName =
        classifiedAsIds.length > 0
          ? classifiedAsIds.includes(config.dc.primaryName)
          : false

      const el = new EntityParser(identifier)
      // check if the name is in the provided language uuid
      const isLanguage = el.isInLanguage(validatingLanguage)

      if (identifier.content) {
        if (isPrimaryName && isLanguage) {
          matchingNames.push(identifier.content)
        } else if (hasClassifiedAs && !isPrimaryName && !isLanguage) {
          alternativeNames.push(identifier.content)
        } else if (hasClassifiedAs && isPrimaryName) {
          classificationMatches.push(identifier.content)
        } else if (isLanguage) {
          lanuguageMatches.push(identifier.content)
        } else {
          unclassifiedNames.push(identifier.content)
        }
      }
    }
  })

  // the order is indicative of how the names are prioritized for display
  const allNames: Array<string> = names.concat(
    matchingNames,
    classificationMatches,
    lanuguageMatches,
    alternativeNames,
    unclassifiedNames,
  )

  if (allNames.length) {
    return allNames[0]
  }
  return null
}

/**
 * Checks if HAL links are returned corresponding to the given configuration required
 * NOTE: this is possibly deprecated depending on the use of the WhatWeHave component
 * @param {IHalLinks} configuredHalLinks the HAL links to be displayed in the component
 * @param {ILinks} providedHalLinks the HAL links in the data from the current entity
 * @returns {boolean}
 */
export function hasHalLinks(
  configuredHalLinks: IHalLinks,
  providedHalLinks: ILinks,
): boolean {
  let hasHalLinksBool = false
  Object.keys(providedHalLinks).map((link: string) =>
    Object.keys(configuredHalLinks).map((tag, index) => {
      // If the search tag contains results via the _estimate property, set to true
      if (
        configuredHalLinks[tag].searchTag === link &&
        providedHalLinks[link]._estimate > 0
      ) {
        hasHalLinksBool = true
      }
      return null
    }),
  )
  return hasHalLinksBool
}

/**
 * Removes the base url from the provided id
 * @param {string} id the url to transform
 * @returns {string}
 */
export function replaceBaseUrl(id: string): string {
  return id.replace(config.env.dataApiBaseUrl, '')
}

/**
 * Removes the base url and /data/ from the provided id
 * @param {string} id the url to transform
 * @returns {string}
 */
export function stripYaleIdPrefix(id: string): string {
  const baseUrl = config.env.dataApiBaseUrl

  if (id === undefined) {
    return ''
  }

  return id.replace(`${baseUrl}data/`, '')
}

/**
 * Returns the year from the date provided
 * @param {string} date the date to parse to get the year
 * @returns {string}
 * @deprecated
 */
export function transformYear(date: string): string {
  const year = new Date(date).getUTCFullYear()

  if (isNaN(year)) {
    return ''
  }

  return year.toString()
}

/**
 * Returns whether the object's /classified_as/id matches the classifier being requested
 * @param {IEntity} elem the object compare
 * @param {string} requestedClassifier the uuid to compare the object against
 * @returns {boolean}
 */
export const validateClassifiedAsIdMatches = (
  elem: IEntity,
  requestedClassifier: string,
): boolean => elem.id === requestedClassifier

/**
 * Returns the correct icon to display for the uri given and its alt text
 * @param {string} uri uri of the entity
 * @returns {Array<string>}
 */
export const getIconFromUri = (uri: string): Array<string> => {
  if (uri.includes('object')) {
    return [objectsIcon, 'Physical Item']
  }
  if (uri.includes('digital')) {
    return [softwareElectronicMediaIcon, 'Digital Item']
  }
  if (uri.includes('visual')) {
    return [visualWorksIcon, 'Visual Item']
  }
  if (uri.includes('set')) {
    return [collectionsIcon, 'Set']
  }
  if (uri.includes('text')) {
    return [textualWorksIcon, 'Textual Work']
  }
  return []
}

/**
 * Returns the sorted list of data source urls
 * @param {Array<string>} urls array of urls
 * @returns {Array<string>}
 */
export const sortDataSources = (urls: Array<string>): Array<string> =>
  urls.sort((a, b) => {
    const stripProtocol = (s: string): string =>
      s.replace(/^https?:\/\//gm, '').trim()

    return stripProtocol(a).localeCompare(stripProtocol(b))
  })

/**
 * Checks if the About data for an entity has content and returns that data
 * @param {Record<string, any>} data object containing data about the entity
 * @returns {Record<string, any> | null}
 */
export const hasData = (
  data: Record<string, any>,
): Record<string, any> | null => {
  for (const key of Object.keys(data)) {
    const value = data[key]
    if (value !== null) {
      if (Array.isArray(value) && value.length > 0) {
        return data
      }

      if (typeof value === 'string' && value !== '') {
        return data
      }

      if (
        !Array.isArray(value) &&
        typeof value === 'object' &&
        Object.keys(value).length > 0
      ) {
        return data
      }
    }
  }
  return null
}

/**
 * Transforms the wikidata image file for viewing in a IIIF viewer
 * @param {string} url the url from wikidata
 * @returns {string}
 */
export const getWikiDataImageName = (url: string): string =>
  url.replace(config.env.wikidataImagePathname, '').split(' ').join('_')

/**
 * Parses images to get the first wikidata image
 * @param {Array<IImages>} images array of image data
 * @returns {string | null}
 */
export const getWikidataImage = (images: Array<IImages>): string | null => {
  for (const image of images) {
    for (const url of image.imageUrls) {
      if (url.includes(config.env.wikidataImagePathname)) {
        return url
      }
    }
  }
  return null
}

/**
 * Returns a specific data point in /referred_to_by based on its /classified_as/id
 * @param {Record<string, any>} data object containing data about the entity
 * @returns {Record<string, any> | null}
 */
export const getSpecificReferredToBy = (
  data: Record<string, any>,
  comparator: string,
): INoteContent | null => {
  const referredToBy = forceArray(data.referred_to_by)

  for (const ref of referredToBy) {
    const classifiedAs = forceArray(ref.classified_as)
    for (const cls of classifiedAs) {
      if (cls.id === comparator) {
        return {
          content: ref.content || '',
          _content_html: ref._content_html,
        }
      }
    }
  }
  return null
}

/**
 * Returns specific data points in /referred_to_by based on its /classified_as/id
 * @param {Record<string, any>} data object containing data about the entity
 * @returns {Record<string, any> | null}
 */
export const getMultipleSpecificReferredToBy = (
  data: Record<string, any>,
  comparator: string,
): Array<INoteContent> => {
  const referredToBy = forceArray(data.referred_to_by)

  const references = []
  for (const ref of referredToBy) {
    const classifiedAs = forceArray(ref.classified_as)
    for (const cls of classifiedAs) {
      if (cls.id === comparator) {
        references.push({
          content: ref.content || '',
          _content_html: ref._content_html,
        })
      }
    }
  }
  return references
}

/**
 * Returns a string that has been joined with dashes to be used by data-testid
 * @param {string} text text to transform
 * @returns {string}
 */
export const transformStringForTestId = (text: string): string =>
  text.split(' ').join('-')
