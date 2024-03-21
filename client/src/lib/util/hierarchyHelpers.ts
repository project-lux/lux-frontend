import IEntity from '../../types/data/IEntity'
import ILinks from '../../types/data/ILinks'
import ConceptParser from '../parse/data/ConceptParser'
import SetParser from '../parse/data/SetParser'

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
export const getNextConceptUris = (concept: IEntity): Array<string> => {
  const parser = new ConceptParser(concept)
  const broaderId = parser.getBroaderId()
  const uri = broaderId === null ? [] : [broaderId]
  return uri
}

/**
 * Parses the place entity to determine if the /part_of property exists
 * Used for the breadcrumb hierarchy component on place pages
 * @param {IEntity} entity the current entity to parse
 * @returns {string | null}
 */
export const getNextPlaceUris = (entity: IEntity): Array<string> => {
  const partOf = entity.part_of
  if (Array.isArray(partOf) && partOf.length > 0 && partOf[0].id) {
    return [partOf[0].id]
  }
  return []
}

/**
 * Parses the object entity to determine if the /member_of property exists
 * Used for the breadcrumb hierarchy component on object pages
 * @param {IEntity} entity the current entity to parse
 * @returns {string | null}
 */
export const getNextSetUris = (entity: IEntity): Array<string> => {
  const memberOf = entity.member_of
  if (Array.isArray(memberOf) && memberOf.length > 0) {
    return memberOf
      .map((member) => {
        if (member.id !== undefined) {
          return member.id
        }
        return ''
      })
      .filter((m) => m !== '')
  }
  return []
}

/**
 * Used exclusively in objects breadcrumb hierarchies and in all Explore hierarchies on sets, objects, and works pages
 * @param {IEntity} entity the current entity to parse
 * @returns {boolean}
 */
export const isEntityAnArchive = (entity: IEntity): boolean => {
  const setParser = new SetParser(entity)
  return setParser.isArchive()
}

/**
 * returns the parent entity for a given element in the breadcrumb hierarchy
 * @param {Array<IEntity>} data the current entity to parse
 * @param {(entity: IEntity) => boolean} filterFunction the callback function to filter out unwanted parents
 * @returns {IEntity}
 */
export const getParentData = (
  data: Array<IEntity>,
  filterFunction?: (entity: IEntity) => boolean,
): IEntity | null => {
  if (data.length === 0) {
    return null
  }

  if (filterFunction !== undefined) {
    for (const d of data) {
      if (filterFunction(d)) {
        return d
      }
    }
  }
  return data[0]
}
