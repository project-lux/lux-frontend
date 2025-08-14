/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import IEntity from '../../../types/data/IEntity'
import IMyCollection from '../../../types/data/IMyCollection'
import {
  IContentWithLanguage,
  INoteContent,
} from '../../../types/IContentWithLanguage'
import INames from '../../../types/myCollections/INames'

import EntityParser from './EntityParser'
import EventParser from './EventParser'
import { forceArray, hasData } from './helper'

export default class MyCollectionParser extends EntityParser {
  myCollection: IMyCollection

  constructor(json: IMyCollection) {
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
  getNamesForEditing(): Array<INames> {
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
          classifications: classifiedAs
            .map((c) => c.id)
            .filter((i) => i !== ''),
          languages: languages.map((l) => l.id).filter((i) => i !== ''),
        }
      })

    return names
  }

  /**
   * Returns notes in the record for rendering in the edit notes form
   * @returns {Array<INoteContent>}
   */
  getNotesForEditing(): Array<INoteContent> {
    const referredToBy = forceArray(this.json.referred_to_by)
    if (referredToBy.length === 0) {
      return []
    }

    const notes: Array<INoteContent> = referredToBy.map((reference) => {
      const classifiedAs = forceArray(reference.classified_as)
      const languages = forceArray(reference.language)
      const identifiedBy = forceArray(reference.identified_by)
      const content: string = reference.content
      let labelLanguages: Array<string> = []

      if (identifiedBy.length > 0) {
        labelLanguages = identifiedBy[0].hasOwnProperty('language')
          ? identifiedBy[0].language.map((l: IEntity) => l.id)
          : []
      }

      return {
        content,
        classifications: classifiedAs.map((c) => c.id) as Array<string>,
        languages: languages.map((l) => l.id) as Array<string>,
        label: identifiedBy.length > 0 ? identifiedBy[0].content : '',
        labelLanguages,
      }
    })

    return notes
  }

  /**
   * Returns creator and date of creation from /created_by
   * @returns {{ creator: string, date: string }}
   */
  getCreator(): { creator: string | null; date: string | null } | null {
    const createdBy = this.myCollection.created_by

    if (createdBy !== undefined) {
      const event = new EventParser(createdBy)
      const creator = event.getAgentId()
      const dateOfCreation = event.getDates()
      return {
        creator,
        date: dateOfCreation.length > 0 ? dateOfCreation[0] : null,
      }
    }

    return null
  }

  /**
   * Returns modifier and date of modification from /added_to_by
   * @returns {Array<{ creator: string, date: string }>}
   */
  getModifier(): Array<{ creator: string | null; date: string | null }> {
    const addedToBy = this.myCollection.added_to_by

    const creators: Array<{ creator: string | null; date: string | null }> = []
    if (addedToBy !== undefined) {
      addedToBy.map((aTB) => {
        const event = new EventParser(aTB)
        const creator = event.getAgentId()
        const dateOfCreation = event.getDates()
        creators.push({
          creator,
          date: dateOfCreation.length > 0 ? dateOfCreation[0] : null,
        })
      })
    }

    return creators
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
    const webPages = this.getAllSiteLinks()
    const creation = this.getCreator()
    const modification = this.getModifier()

    const data: Record<string, any> = {
      name,
      names,
      types,
      identifiers,
      notes,
      webPages,
      creation,
      modification,
    }

    return hasData(data)
  }
}
