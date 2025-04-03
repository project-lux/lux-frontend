import IEntity from '../../types/data/IEntity'

import {
  getNextSetUris,
  getParentData,
  isEntityAnArchive,
} from './hierarchyHelpers'
import { getItems } from './fetchItems'

export function getAncestors(entities: Array<IEntity>): {
  ancestors: Array<IEntity>
  highestAncestorId: string
} {
  let ancestors = entities
  let highestAncestorId = entities[0].id as string
  const urisOfParents = getNextSetUris(entities[0])
  // Get the parent records of the current entity
  const parents = getItems(urisOfParents)
  // Get the parent that is an archive
  const parent = getParentData(parents.data, isEntityAnArchive)

  if (parent !== null && isEntityAnArchive(parent)) {
    ancestors = [parent as IEntity, ...ancestors]
    highestAncestorId = parent.id as string
  }

  if (
    parent === null ||
    getNextSetUris(parent).length === 0 ||
    ancestors.length > 8
  ) {
    return {
      ancestors,
      highestAncestorId,
    }
  } else {
    getAncestors(ancestors)
  }

  return {
    ancestors,
    highestAncestorId,
  }
}
