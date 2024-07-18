import { isUndefined } from 'lodash'

import config from '../../config/config'
import IEntity from '../../types/data/IEntity'

import { englishLanguage, primaryName } from './helperObjects'

/**
 * Returns a minimal entity that can be reused throughout the testing suite
 * @param {string} content the primary name of the entity
 * @param {string} endpoint the specific endpoint
 * @returns {IEntity}
 */
export const reusableMinimalEntity = (
  content: string,
  endpoint?: string,
): IEntity => {
  let id = `${config.env.dataApiBaseUrl}data/entity/mock-entity`
  if (!isUndefined(endpoint)) {
    id = endpoint.includes(config.env.dataApiBaseUrl) ? endpoint : id
  }

  return {
    id,
    type: 'Concept',
    _label: content,
    identified_by: [
      {
        id: '',
        type: 'Name',
        content,
        language: englishLanguage,
        classified_as: primaryName,
      },
    ],
  }
}
