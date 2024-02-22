import IEntity from '../../types/data/IEntity'
import ILinks from '../../types/data/ILinks'
import ConceptParser from '../parse/data/ConceptParser'

import { getPath } from './uri'

export const isInHierarchy = (uri: string, ancestors: Array<string>): boolean =>
  ancestors.includes(uri)

export const removeViewFromPathname = (pathname: string): string =>
  pathname.replace('/view/', '')

export const currentUriInHierarchy = (uri: string, pathname: string): boolean =>
  uri.includes(removeViewFromPathname(pathname))

export const extractHalLinks = (providedLinks: ILinks): Array<string> => {
  const halLinks = []

  if (providedLinks.hasOwnProperty('lux:setIncludedItems')) {
    halLinks.push(providedLinks['lux:setIncludedItems'].href)
  }

  if (providedLinks.hasOwnProperty('lux:setIncludedWorks')) {
    halLinks.push(providedLinks['lux:setIncludedWorks'].href)
  }

  return halLinks
}

/**
 * Parses the concept entity to determine if the /broader property exists
 * Used for the breadcrumb hierarchy component on concept pages
 * @param {IEntity} concept the current entity to parse
 * @returns {string | null}
 */
export const getNextConceptUri = (concept: IEntity): string | null => {
  const parser = new ConceptParser(concept)
  const broaderId = parser.getBroaderId()
  const uri = broaderId === null ? null : getPath(broaderId)
  return uri
}

/**
 * Parses the place entity to determine if the /part_of property exists
 * Used for the breadcrumb hierarchy component on place pages
 * @param {IEntity} entity the current entity to parse
 * @returns {string | null}
 */
export const getNextPlaceUri = (entity: IEntity): string | null => {
  const partOf = entity.part_of
  if (Array.isArray(partOf) && partOf.length > 0 && partOf[0].id) {
    return getPath(partOf[0].id)
  }
  return null
}

/**
 * Parses the object entity to determine if the /member_of property exists
 * Used for the breadcrumb hierarchy component on object pages
 * @param {IEntity} entity the current entity to parse
 * @returns {string | null}
 */
export const getNextSetUri = (entity: IEntity): string | null => {
  const memberOf = entity.member_of
  if (Array.isArray(memberOf) && memberOf.length > 0 && memberOf[0].id) {
    return getPath(memberOf[0].id)
  }
  return null
}
