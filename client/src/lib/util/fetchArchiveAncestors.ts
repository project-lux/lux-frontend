import { isUndefined } from 'lodash'

import IEntity from '../../types/data/IEntity'

import {
  getNextSetUris,
  getParentData,
  isEntityAnArchive,
} from './hierarchyHelpers'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchItem = (uri: string, profile?: string): Promise<any> =>
  fetch(`${uri}${isUndefined(profile) ? '' : '?profile=results'}`)
    .then((response) =>
      response.text().then((translatedString) => JSON.parse(translatedString)),
    )
    .catch(() => new Error('An error occurred retrieving the data from the '))

export async function getAncestors(entities: Array<IEntity>): Promise<any> {
  let ancestors = entities
  let highestAncestorId = entities[0].id as string
  const urisOfParents = getNextSetUris(entities[0])
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
    ancestors = [p, ...ancestors]
    highestAncestorId = p.id as string
    return await getAncestors(ancestors)
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
  }

  return {
    ancestors,
    highestAncestorId,
  }
}
