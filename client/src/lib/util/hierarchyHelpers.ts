import { Edge, Node } from 'reactflow'

import IConcept from '../../types/data/IConcept'
import IEntity from '../../types/data/IEntity'
import ILinks from '../../types/data/ILinks'
import IPlace from '../../types/data/IPlace'
import ConceptParser from '../parse/data/ConceptParser'
import PlaceParser from '../parse/data/PlaceParser'
import SetParser from '../parse/data/SetParser'
import { ISearchResults } from '../../types/ISearchResults'

export const isInHierarchy = (uri: string, ancestors: Array<string>): boolean =>
  ancestors.includes(uri)

export const removeViewFromPathname = (pathname: string): string =>
  pathname.replace('/view/', '')

export const currentUriInHierarchy = (uri: string, pathname: string): boolean =>
  uri.includes(removeViewFromPathname(pathname))

export const hasHierarchyHalLinks = (providedLinks: ILinks): Array<string> => {
  const halLinks = []

  if (providedLinks.hasOwnProperty('lux:setIncludedItems')) {
    halLinks.push(providedLinks['lux:setIncludedItems'].href)
  }

  if (providedLinks.hasOwnProperty('lux:setIncludedWorks')) {
    halLinks.push(providedLinks['lux:setIncludedWorks'].href)
  }

  return halLinks
}

export const getItemChildren = (
  providedLinks: ILinks | undefined,
): string | null => {
  if (providedLinks === undefined) {
    return null
  }

  if (providedLinks.hasOwnProperty('lux:setIncludedItems')) {
    return providedLinks['lux:setIncludedItems'].href
  }

  return null
}

export const getWorkChildren = (
  providedLinks: ILinks | undefined,
): string | null => {
  if (providedLinks === undefined) {
    return null
  }

  if (providedLinks.hasOwnProperty('lux:setIncludedWorks')) {
    return providedLinks['lux:setIncludedWorks'].href
  }

  return null
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

const DEFAULT_POSITION = { x: 0, y: 0 }
const DEFAULT_MAX_NODE_WIDTH = '200px'
/**
 * Parses the data and returns nodes for react flow hierarchy
 * @param {Array<any>} data the current entity to parse
 * @returns {Array<Node>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getParentNodes = (data: Array<string>): Array<Node> =>
  data.map((id) => ({
    id,
    type: 'parentNode',
    data: {
      label: id, // this will be a RecordLink
    },
    style: { maxWidth: DEFAULT_MAX_NODE_WIDTH },
    position: DEFAULT_POSITION,
  }))

/**
 * Parses the data and returns nodes for react flow hierarchy
 * @param {Array<any>} data the current entity to parse
 * @returns {Array<Node>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getChildNodes = (data: ISearchResults): Array<Node> => {
  const { orderedItems } = data
  if (orderedItems.length === 0) {
    console.log('No children were returned with the provided search criteria.')

    return []
  }

  return orderedItems.map((obj) => ({
    id: obj.id,
    type: 'childNode',
    data: {
      label: obj.id, // this will be a RecordLink
    },
    style: { maxWidth: DEFAULT_MAX_NODE_WIDTH },
    position: DEFAULT_POSITION,
  }))
}

/**
 * Parses the nodes to get the correct data
 * @param {Array<Node>} nodes the current nodes
 * @param {string} currentUuid the current entity uuid
 * @returns {Array<Edge>}
 */
export const getParentEdges = (
  nodes: Array<Node>,
  currentUuid: string,
): Array<Edge> =>
  nodes.map((node, ind) => ({
    id: `e${ind}-${node.id}`, // the uuid of the parent
    source: node.id, // the source is to the left of the target so the source is the parent
    targetHandle: 'a', // handle on the target, a will be on the left of current
    target: currentUuid,
    // type: 'hierarchyEdge',
  }))

/**
 * Parses the nodes to get the correct data
 * @param {Array<Node>} nodes the current nodes
 * @param {string} currentUuid the current entity uuid
 * @returns {Array<Edge>}
 */
export const getChildEdges = (
  nodes: Array<Node>,
  currentUuid: string,
): Array<Edge> =>
  nodes.map((node, ind) => ({
    id: `e${ind}-${node.id}`, // the uuid of the parent
    source: currentUuid, // the source is to the left of the target so the source is the parent
    sourceHandle: 'b', // handle on the target, a will be on the left of current
    target: node.id,
    // type: 'hierarchyEdge',
  }))

/**
 * Returns the react flow node for the current entity
 * @param {string} currentUuid the current entity uuid
 * @returns {Node}
 */
export const getDefaultNode = (currentUuid: string): Node => ({
  id: currentUuid,
  type: 'originNode',
  data: {
    label: currentUuid, // this will be a RecordLink
  },
  style: { maxWidth: DEFAULT_MAX_NODE_WIDTH },
  position: DEFAULT_POSITION,
})
