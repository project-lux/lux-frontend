import { isUndefined } from 'lodash'

import IAgent from '../../../types/data/IAgent'
import IConcept from '../../../types/data/IConcept'
import config from '../../../config/config'

import { getClassifiedAs } from './helper'
import PersonAndGroupParser from './PersonAndGroupParser'

export default class UserParser extends PersonAndGroupParser {
  agent: IAgent

  constructor(json: IAgent) {
    super(json)
    this.agent = json
  }

  /**
   * Returns the username of the person
   * @returns {string}
   */
  getUsername(): string {
    const { identified_by } = this.agent
    if (identified_by !== undefined) {
      const identifiers = identified_by.filter(
        (idB) => idB.type === 'Identifier',
      )
      for (const ids of identifiers) {
        const { content } = ids
        if (!isUndefined(ids.classified_as)) {
          const classifications = getClassifiedAs(
            ids.classified_as as Array<IConcept>,
          )
          if (classifications.includes(config.aat.username)) {
            return content as string
          }
        }
      }
    }
    return ''
  }
}
