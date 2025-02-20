/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEventInfo } from '../../../types/derived-data/events'
import ISet from '../../../types/data/ISet'
import config from '../../../config/config'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'

import EntityParser from './EntityParser'
import EventParser from './EventParser'
import { forceArray, hasData } from './helper'

export default class SetParser extends EntityParser {
  set: ISet

  constructor(json: ISet) {
    super(json)
    this.set = json
  }

  /**
   * Returns event data from /members_exemplified_by
   * @returns {IEventInfo | null}
   */
  getCreationEvent(): IEventInfo | null {
    const membersExemplifiedBy = forceArray(this.set.members_exemplified_by)

    for (const member of membersExemplifiedBy) {
      if (member.produced_by !== undefined) {
        return new EventParser(member.produced_by).getProductionEvent()
      }
    }

    return null
  }

  /**
   * Returns event data from /created_by
   * @returns {IEventInfo | null}
   */
  getSourceCreationEvent(): IEventInfo | null {
    const createdBy = this.set.created_by
    if (createdBy !== undefined) {
      return new EventParser(createdBy).getProductionEvent()
    }

    return null
  }

  /**
   * Determines if the entity is an archive
   * @returns {boolean}
   */
  isArchive(): boolean {
    const classifiedAs = forceArray(this.json.classified_as)
    for (const cl of classifiedAs) {
      if (cl.hasOwnProperty('equivalent')) {
        const equivalent = forceArray(cl.equivalent)
        for (const eq of equivalent) {
          if (eq.id === config.aat.archive) {
            return true
          }
        }
      }
    }

    return false
  }

  /**
   * Determines if the current entity has child works or items based on its provided HAL links
   * @returns {boolean}
   */
  hasChildren(): boolean {
    const halLinks = this.getHalLinks()
    if (
      halLinks !== null &&
      (halLinks.hasOwnProperty(`lux:setIncludedWorks`) ||
        halLinks.hasOwnProperty(`lux:setIncludedItems`))
    ) {
      return true
    }

    return false
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
   * Gets the data to be displayed in the About section
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getAboutData(): Record<
    string,
    null | string | Array<any> | IContentWithLanguage
  > | null {
    const names = this.getNames()
    const itemType = this.getTypes()
    const identifiers = this.getIdentifiers()
    const setCreationEvent = this.getCreationEvent()
    const about = this.getAbout()
    const represents = this.getRepresents()
    const notes = this.getNotes()
    const usedFor = this.getPublicationEvent()
    const sourceObjectCreationEvent = this.getSourceCreationEvent()

    const data: Record<string, any> = {
      names,
      itemType,
      identifiers,
      setCreationEvent,
      about,
      represents,
      notes,
      usedFor,
      sourceObjectCreationEvent,
    }

    return hasData(data)
  }
}
