import { Edge, Node } from 'reactflow'

import IEntity from '../../types/data/IEntity'
import ILinks from '../../types/data/ILinks'
import ConceptParser from '../parse/data/ConceptParser'
import { ISearchResults } from '../../types/ISearchResults'

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

const DEFAULT_POSITION = { x: 0, y: 0 }

/**
 * Parses the data and returns nodes for react flow hierarchy
 * @param {Array<any>} data the current entity to parse
 * @returns {Array<Node>}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getParentNodes = (data: Array<string>): Array<Node> =>
  data.map((id) => ({
    id,
    type: 'hierarchyNode',
    data: {
      label: id, // this will be a RecordLink
    },
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
    type: 'hierarchyNode',
    data: {
      label: obj.id, // this will be a RecordLink
    },
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
  type: 'hierarchyNode',
  data: {
    label: currentUuid, // this will be a RecordLink
  },
  position: DEFAULT_POSITION,
})
