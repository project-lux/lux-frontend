import { isUndefined } from 'lodash'

import IEntity from '../../types/data/IEntity'

import {
  getNextSetUris,
  // getParentData,
  isEntityAnArchive,
} from './hierarchyHelpers'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchItem = async (uri: string, profile?: string): Promise<any> =>
  fetch(`${uri}${isUndefined(profile) ? '' : '?profile=results'}`)
    .then((response) =>
      response.text().then((translatedString) => JSON.parse(translatedString)),
    )
    .catch(() => new Error('An error occurred retrieving the data from the '))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getAncestors(entities: Array<IEntity>): Promise<any> {
  let ancestors = entities
  let highestAncestorId = entities[0].id as string
  const urisOfParents = getNextSetUris(entities[0])
  // Get the parent records of the current entity
  const parents = urisOfParents.map(async (uri: string) => await fetchItem(uri))
  console.log(parents)
  // Get the parent that is an archive
  let parent: IEntity | null = null
  // parents.then(
  //   (p: { data: Array<IEntity> }) =>
  //     (parent = getParentData(p.data, isEntityAnArchive)),
  // )
  console.log(parents)
  console.log(parent)

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
