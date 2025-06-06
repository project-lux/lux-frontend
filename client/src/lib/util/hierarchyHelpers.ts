import { setWithMemberOf } from '../../config/setsSearchTags'
import IConcept from '../../types/data/IConcept'
import IEntity from '../../types/data/IEntity'
import ILinks from '../../types/data/ILinks'
import IPlace from '../../types/data/IPlace'
import ConceptParser from '../parse/data/ConceptParser'
import EntityParser from '../parse/data/EntityParser'
import PlaceParser from '../parse/data/PlaceParser'
import SetParser from '../parse/data/SetParser'

// Check if the current uri is in the list of ancestors for the current entity
export const isInHierarchy = (uri: string, ancestors: Array<string>): boolean =>
  ancestors.includes(uri)

export const removeViewFromPathname = (pathname: string): string =>
  pathname.replace('/view/', '')

export const currentUriInHierarchy = (uri: string, pathname: string): boolean =>
  uri.includes(removeViewFromPathname(pathname))

/**
 * Parses the concept entity to determine if the /broader property exists
 * Used for the breadcrumb hierarchy component on concept pages
 * @param {IEntity} concept the current entity to parse
 * @returns {string | null}
 */
export const hasHierarchyHalLinks = (providedLinks: ILinks): string | null => {
  const halLinkToCheck = setWithMemberOf.searchTag

  if (providedLinks.hasOwnProperty(halLinkToCheck)) {
    return providedLinks[halLinkToCheck].href
  }

  return null
}

/**
 * Returns the HAL link for the children of the entity passed
 * @param {IEntity} entity the entity to parse
 * @param {Array<{ id: string; currentPageHalLink: string | null }>} ancestors the entity to parse
 * @returns {string | null}
 */
export const getHalLinkForChildren = (
  entity: IEntity,
  ancestors: Array<{ id: string; childrenHalLink: string | null }>,
): string | null => {
  let childrenHalLink = entity._links
    ? hasHierarchyHalLinks(entity._links)
    : null
  for (const ancestor of ancestors) {
    // if the current entity from the data is an ancestor, set it's childrenHalLink to the HAL link with the results page of its child within the current hierarchy
    if (ancestor.id === entity.id) {
      return ancestor.childrenHalLink
    }
  }

  return childrenHalLink
}

/**
 * Returns the HAL link for the children of the entity passed
 * @param {IEntity} entity the entity to parse
 * @param {Array<{ id: string; currentPageHalLink: string | null }>} ancestors the entity to parse
 * @returns {string | null}
 */
export const getAncestorData = (data: {
  ancestors: Array<{
    entity: IEntity
    currentPageWithinParentResultsHalLink: null | string
  }>
}): Array<{
  id: string
  childrenHalLink: string | null
}> => {
  return data.ancestors
    .map(
      (ancestor: {
        entity: IEntity
        currentPageWithinParentResultsHalLink: null | string
      }) => {
        const parser = new EntityParser(ancestor.entity)
        // the id of the ancestor and the results HAL link with the correct page of it's child within the hierarchy or the HAL link to get its children
        return {
          id: ancestor.entity.id!,
          childrenHalLink:
            ancestor.currentPageWithinParentResultsHalLink ||
            parser.getHalLink(setWithMemberOf.searchTag),
        }
      },
    )
    .filter(
      (ancestor: { id: string; childrenHalLink: string | null }) =>
        ancestor.id !== undefined,
    )
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
 * Parses the concept entity to determine if the /part_of property exists
 * Used for the breadcrumb hierarchy component on place pages
 * @param {IConcept} entity the current entity to parse
 * @returns {Array<string>}
 */
export const getAllNextConceptUris = (entity: IConcept): Array<string> => {
  const parser = new ConceptParser(entity)
  return parser.getBroaderIds()
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
 * Parses the place entity to determine if the /part_of property exists
 * Used for the breadcrumb hierarchy component on place pages
 * @param {IPlace} entity the current entity to parse
 * @returns {string | null}
 */
export const getAllNextPlaceUris = (entity: IPlace): Array<string> => {
  const parser = new PlaceParser(entity)
  return parser.getPartOf()
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
