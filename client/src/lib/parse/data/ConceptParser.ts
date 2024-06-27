/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import IConcept from '../../../types/data/IConcept'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'

import EntityParser from './EntityParser'
import { forceArray, getClassifiedAs, hasData } from './helper'

export default class ConceptParser extends EntityParser {
  concept: IConcept

  constructor(json: IConcept) {
    super(json)
    this.concept = json
  }

  /**
   * Returns data from /broader
   * @returns {string}
   */
  getBroaderId(): string {
    const broader = forceArray(this.concept.broader)

    return broader.length > 0 ? broader[0].id || null : null
  }

  /**
   * Returns all data from /broader
   * @returns {Array<string>}
   */
  getBroaderIds(): Array<string> {
    const broader = forceArray(this.concept.broader)

    return getClassifiedAs(broader)
  }

  /**
   * Returns data from /created_by/influenced_by
   * @returns {Array<string>}
   */
  getInfluencedBy(): Array<string> {
    const createdBy = this.concept.created_by

    if (createdBy === undefined) {
      return []
    }

    const influencedBy = forceArray(createdBy.influenced_by)
    return influencedBy
      .map((influence) => influence.id || null)
      .filter((el) => el !== null)
  }

  /**
   * Returns an array of strings containing concept descriptions for results snippets
   * TODO: fix so that it only returns a string as there is no reason for it to return an array
   * @param {string} lang the language of the content to be displayed
   * @returns {Array<string>}
   */
  getDescriptions(lang: string): Array<string> {
    const referredToBy = forceArray(this.json.referred_to_by)

    return referredToBy
      .map((elem) => {
        const p = new EntityParser(elem)
        if (
          p.isClassifiedAs(config.dc.descriptionStatement) &&
          p.isInLanguage(lang)
        ) {
          return elem._content_html !== undefined
            ? elem._content_html
            : elem.content
        }
        return null
      })
      .filter((elem) => elem !== null)
  }

  /**
   * Gets the data to be displayed in the About section
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getAboutData(): Record<
    string,
    null | string | Array<any> | IContentWithLanguage
  > | null {
    const entityClass = this.getEntityClass()

    const data: Record<
      string,
      null | string | Array<any> | IContentWithLanguage
    > = {
      name: this.getPrimaryName(config.dc.langen),
      names: this.getNames(),
      entityClass: entityClass === 'Type' ? 'General Concept' : entityClass,
      types: this.getTypes(),
      notes: this.getNotes(),
      influences: this.getInfluencedBy(),
    }

    return hasData(data)
  }
}
