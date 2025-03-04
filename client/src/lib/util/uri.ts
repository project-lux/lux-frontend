import { isUndefined } from 'lodash'

import EntityParser from '../parse/data/EntityParser'
import config from '../../config/config'
import IEntity from '../../types/data/IEntity'

export function getPath(uri: string): string {
  return uri.replace(/https?:\/\/[^/]+\/\w+\//, '')
}

export function getTargetName(
  pathname: string,
  routes: Map<string, string>,
  isNotAnEntityPage: boolean,
  isSuccess: boolean,
  data: IEntity | undefined,
): string {
  let targetName

  // set the target name to the correct non-entity page
  if (isNotAnEntityPage) {
    targetName = routes.get(pathname)
  }

  // set the taget name to the entity page
  if (isSuccess && data) {
    const entity = new EntityParser(data)
    targetName = entity.getPrimaryName(config.aat.primaryName)
  }

  return isUndefined(targetName) ? '404 Page Not Found' : targetName
}

/**
 * Checks if the current pathname is an object or work
 * @param {string} pathname current pathname
 * @returns {boolean}
 */
export const isObjectOrWork = (pathname: string): boolean => {
  const tabs = ['object', 'digital', 'visual', 'set', 'text']
  for (const tab of tabs) {
    if (pathname.includes(tab)) {
      return true
    }
  }
  return false
}
