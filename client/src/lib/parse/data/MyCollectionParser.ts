/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import IEntity from '../../../types/data/IEntity'
import ISet from '../../../types/data/ISet'
import {
  IContentWithLanguage,
  INoteContent,
} from '../../../types/IContentWithLanguage'
import { IImageFormData } from '../../../types/myCollections/IImageFormData'

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
        label: identifiedBy[0].content,
        labelLanguages,
      }
    })

    return notes
  }

  /**
   * Returns all Wikidata image data from /representation
   * @returns {IImageFormData}
   */
  getCoverImage(): IImageFormData | null {
    const representation = forceArray(this.json.representation)
    if (representation.length === 0) {
      return null
    }

    const imageData: IImageFormData = {
      image: '',
      description: '',
      descriptionLanguage: [],
    }

    for (const rep of representation) {
      const digitallyShownBy = forceArray(rep.digitally_shown_by)

      for (const digital of digitallyShownBy) {
        const accessPoint = forceArray(digital.access_point)
        const referredToBy = forceArray(digital.referred_to_by)
        imageData.image = accessPoint.length > 0 ? accessPoint[0].id : ''

        if (referredToBy.length > 0) {
          referredToBy.map((ref) => {
            const classifiedAs = forceArray(ref.classified_as)
            classifiedAs.map((cl) => {
              const nestedEntity = new EntityParser(cl)
              // Set the description if it is not classified_as a copyright statement
              if (
                !nestedEntity
                  .getEquivalent()
                  .includes(config.aat.copyrightLicensingStatement)
              ) {
                imageData.description = ref.content
              }
            })
            if (ref.language) {
              imageData.descriptionLanguage = ref.language
            }
          })
        }
      }
    }

    return imageData
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
