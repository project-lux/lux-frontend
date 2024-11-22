/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../../config/config'
import IWork from '../../../types/data/IWork'
import { IEventInfo } from '../../../types/derived-data/events'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'

import EntityParser from './EntityParser'
import EventParser from './EventParser'
import {
  forceArray,
  getClassifiedAs,
  getContentByClassifiedAs,
  hasData,
} from './helper'

export default class WorkParser extends EntityParser {
  work: IWork

  constructor(json: IWork) {
    super(json)
    this.work = json
  }

  /**
   * Returns array of content that is classified_as an imprint
   * @returns {Array<string>}
   */
  getImprint(): Array<string> {
    const referredToBy = forceArray(this.work.referred_to_by)
    return getContentByClassifiedAs(referredToBy, config.aat.imprintStatement)
  }

  /**
   * Returns array of uuids from /language
   * @returns {Array<string>}
   */
  getLanguages(): Array<string> {
    const languages = forceArray(this.work.language)
    return getClassifiedAs(languages)
  }

  /**
   * Returns array of content that is classified_as a language statement
   * @returns {Array<string>}
   */
  getLanguageNotes(): Array<string> {
    const referredToBy = forceArray(this.work.referred_to_by)
    return getContentByClassifiedAs(referredToBy, config.aat.languageStatement)
  }

  /**
   * Returns array of uuids from /part_of
   * @returns {Array<string>}
   */
  getPartOf(): Array<string> {
    const partOf = forceArray(this.work.part_of)
    return getClassifiedAs(partOf)
  }

  /**
   * Returns array of objects containing content and urls from /subject_to
   * @returns {Array<string>}
   */
  getSubjectTo(): Array<{ url: string; text: string }> {
    const subjectTo = forceArray(this.work.subject_to)
    const subjectToData = subjectTo.map((subject) => {
      const classifiedAs = forceArray(subject.classified_as)
      const url = classifiedAs.length > 0 ? classifiedAs[0].id : null
      const identifiedBy = forceArray(subject.identified_by)
      const text = identifiedBy.length > 0 ? identifiedBy[0].content : null
      return {
        url,
        text,
      }
    })
    const nonNullSubjectToData = subjectToData.filter(
      (subject) => subject.text !== null && subject.url !== null,
    )

    return nonNullSubjectToData
  }

  /**
   * Returns agent responsible for production from /created_by
   * @returns {string | null}
   */
  getProductionAgent(): string | null {
    const createdBy = this.work.created_by
    return createdBy ? new EventParser(createdBy).getAgentIds() : null
  }

  /**
   * Returns date of production from /created_by
   * @returns {string | null}
   */
  getProductionDate(): string | null {
    const createdBy = this.work.created_by

    if (createdBy !== undefined) {
      const dates = new EventParser(createdBy).getDates()
      return dates.length > 0 ? dates[0] : null
    }

    return null
  }

  /**
   * Returns agent responsible for publication from /used_for
   * @returns {string | null}
   */
  getPublicationAgent(): string | null {
    const usedFor = this.work.used_for

    if (usedFor !== undefined) {
      // Only one agent is needed
      for (const obj of usedFor) {
        return new EventParser(obj).getAgentIds()
      }
    }

    return null
  }

  /**
   * Returns date of publication from /used_for
   * @returns {string | null}
   */
  getPublicationDate(): string | null {
    const usedFor = this.work.used_for
    if (usedFor !== undefined) {
      // Only one agent is needed
      for (const obj of usedFor) {
        const dates = new EventParser(obj).getDates()
        return dates.length > 0 ? dates[0] : null
      }
    }

    return null
  }

  /**
   * Returns production event data from /created_by
   * @returns {IEventInfo | null}
   */
  getProductionEvent(): IEventInfo | null {
    const createdBy = this.work.created_by

    return createdBy ? new EventParser(createdBy).getProductionEvent() : null
  }

  /**
   * Returns array of transformed publication event data
   * @returns {Array<IEventInfo>}
   */
  getPublicationEvent(): Array<IEventInfo> {
    const usedFor = this.json.used_for

    if (usedFor !== undefined && usedFor.length > 0) {
      const events = []
      for (const event of usedFor) {
        events.push(new EventParser(event).getProductionEvent())
      }
      return events
    }

    return []
  }

  /**
   * Gets the data to be displayed in the About section of works that are not collections
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getAboutData(): Record<
    string,
    null | string | Array<any> | IContentWithLanguage
  > | null {
    const entityClass = this.getEntityClass('work')
    const data: Record<string, any> = {
      types: this.getTypes(),
      titles: this.getNames(true),
      entityClass,
      identifiers: this.getIdentifiers(),
      publications: this.getPublicationEvent(),
      about: this.getAbout(),
      represents: this.getRepresents(),
      notes: this.getNotes(),
      partOf: this.getPartOf(),
      languages: this.getLanguages(),
      production: this.getProductionEvent(),
    }

    return hasData(data)
  }

  /**
   * Gets the data to be displayed in the About section of collections
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getAboutCollectionData(): Record<
    string,
    null | string | Array<any> | IContentWithLanguage
  > | null {
    const names = this.getNames(true)
    const name = this.getPrimaryName(config.aat.langen)
    const entityClass = this.getEntityClass('work')
    const types = this.getTypes()
    const publications = this.getPublicationEvent()

    const data: Record<string, any> = {
      names,
      name,
      entityClass,
      types,
      publications,
    }

    return hasData(data)
  }
}
