/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import ISet from '../../../types/data/ISet'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'

import EntityParser from './EntityParser'
import EventParser from './EventParser'
import { forceArray, hasData } from './helper'

export default class MyCollectionParser extends EntityParser {
  myCollection: ISet

  constructor(json: ISet) {
    super(json)
    this.myCollection = json
  }

  /**
   * Returns the number of records in the collection
   * @returns {number}
   */
  getCollectionSize(): number {
    const containing = forceArray(this.myCollection.containing)

    return containing.length
  }

  /**
   * Returns the list of ids in /containing property
   * @returns {Array<string>}
   */
  getContaining(): Array<string> {
    const containing = forceArray(this.myCollection.containing)

    return containing.map((record) => record.id)
  }

  /**
   * Returns date of production from /created_by
   * @returns {string | null}
   */
  getProductionDate(): string | null {
    const createdBy = this.myCollection.created_by

    if (createdBy !== undefined) {
      const dates = new EventParser(createdBy).getDates()
      return dates.length > 0 ? dates[0] : null
    }

    return null
  }

  /**
   * Returns names in the record for rendering in the edit names form
   * @returns {Array<IEntity>}
   */
  getNamesForEditing(): Array<{
    name: string
    languages: Array<string>
    classifications: Array<string>
  }> {
    const identifiedBy = forceArray(this.json.identified_by)
    if (identifiedBy.length === 0) {
      return []
    }

    const names = identifiedBy
      .filter((identifier) => identifier.type === 'Name')
      .map((identifier) => {
        const classifiedAs = forceArray(identifier.classified_as)
        const languages = forceArray(identifier.language)
        const name = identifier.content

        return {
          name,
          classifications: classifiedAs.map((c) => c.id),
          languages: languages.map((l) => l.id),
        }
      })

    return names
  }

  /**
   * Gets the data to be displayed in the About section
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getAboutData(): Record<
    string,
    null | string | Array<any> | IContentWithLanguage
  > | null {
    const name = this.getPrimaryName(config.aat.langen)
    const names = this.getNames()
    const types = this.getTypes()
    const identifiers = this.getIdentifiers()
    const notes = this.getNotes()
    const webPages = this.getWebPages()

    const data: Record<string, any> = {
      name,
      names,
      types,
      identifiers,
      notes,
      webPages,
    }

    return hasData(data)
  }
}
