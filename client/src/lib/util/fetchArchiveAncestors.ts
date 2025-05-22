/* eslint-disable @typescript-eslint/no-explicit-any */
import IEntity from '../../types/data/IEntity'
import EntityParser from '../parse/data/EntityParser'

import {
  getNextSetUris,
  getParentData,
  isEntityAnArchive,
} from './hierarchyHelpers'
import { fetchItem } from './fetchItems'

/**
 * Returns an object with the list of ancestor uuids along with the oldest ancestor's uuid
 * @param {Array<{entity: IEntity, currentPageWithinParentResultsHalLink: null | string}>} entities; the HAL link
 * @returns {Promise<any>}
 */
export async function getAncestors(
  entities: Array<{
    entity: IEntity
    currentPageWithinParentResultsHalLink: null | string
  }>,
): Promise<any> {
  let ancestors = entities
  let highestAncestorId = entities[0].entity.id as string
  // Get the HAL link of the child entity in order to render the results page where the child entity exists
  // This is relevant if the child entity is not on page 1 of the normal HAL link results
  const el = new EntityParser(entities[0].entity)
  const halLinkToPassToAncestor =
    el.getHalLink('lux:setCurrentHierarchyPage') ||
    el.getHalLink('lux:itemCurrentHierarchyPage')
  const urisOfParents = getNextSetUris(entities[0].entity)
  // Get the parent records of the current entity
  const parents = urisOfParents.map((uri: string) => fetchItem(uri))

  // Get the parent that is an archive
  let parent: IEntity | null = null
  // return Promise.all(promises).then((result) => ({ data: result }))
  await Promise.all(parents).then(
    (response) => (parent = getParentData(response, isEntityAnArchive)),
  )

  // if the parent is valid and an archive add it to the existing list of ancestors
  if (parent !== null && isEntityAnArchive(parent)) {
    const p = parent as IEntity
    ancestors = [
      {
        entity: p,
        currentPageWithinParentResultsHalLink: halLinkToPassToAncestor,
      },
      ...ancestors,
    ]
    highestAncestorId = p.id as string
    return await getAncestors(ancestors)
  }

  // if the there is no parent returned or the parent is not null but does not have any ancestors or the ancestors list is already longer than a depth of 8
  if (
    parent === null ||
    getNextSetUris(parent).length === 0 ||
    ancestors.length > 8
  ) {
    return {
      ancestors,
      highestAncestorId,
    }
  }

  return {
    ancestors,
    highestAncestorId,
  }
}
