/* eslint-disable @typescript-eslint/no-explicit-any */
import { isUndefined } from 'lodash'

import config from '../../../config/config'
import IDigitalObject from '../../../types/data/IDigitalObject'
import IObject from '../../../types/data/IObject'
import IEvent from '../../../types/data/IEvent'
import { IEventInfo } from '../../../types/derived-data/events'
import {
  IContentWithLanguage,
  INoteContent,
} from '../../../types/IContentWithLanguage'
import IEntity from '../../../types/data/IEntity'

import EntityParser from './EntityParser'
import EventParser from './EventParser'
import {
  containsSpecificNote,
  forceArray,
  getClassifiedAs,
  hasData,
} from './helper'

export default class ObjectParser extends EntityParser {
  object: IObject

  constructor(json: IObject) {
    super(json)
    this.object = json
  }

  /**
   * Returns array of uuids from /made_of
   * @returns {Array<string>}
   */
  getMaterials(): Array<string> {
    const materials = forceArray(this.object.made_of)
    return getClassifiedAs(materials)
  }

  /**
   * Returns array of uuids from /part_of
   * @returns {Array<string>}
   */
  getPartOf(): Array<string> {
    const partOf = forceArray(this.object.part_of)
    return getClassifiedAs(partOf)
  }

  /**
   * Returns array of uuids from /member_of
   * @returns {Array<string>}
   */
  getCollection(): Array<string> {
    const memberOf = forceArray(this.object.member_of)
    return getClassifiedAs(memberOf)
  }

  /**
   * Returns a uuids from /current_location
   * @returns {string}
   */
  getCurrentLocation(): string {
    const currentLocation = forceArray(this.object.current_location)
    const id = getClassifiedAs(currentLocation)
    return id.length > 0 ? id[0] : ''
  }

  /**
   * Returns the production event as it appears in the data from
   * either /produced_by or /encountered_by if a HumanMadeObject,
   * or /created_by if a DigitalObject.
   * This is used for displaying data on the results page.
   * @returns {IEvent | undefined}
   */
  getRawProductionEventSnippet(): IEvent | undefined {
    let prod = this.object.produced_by

    if (prod === undefined) {
      const encounteredBy = this.object.encountered_by
      prod =
        encounteredBy !== undefined && encounteredBy.length > 0
          ? encounteredBy[0]
          : prod
    }

    if (this.object.type === 'DigitalObject') {
      prod = this.object.created_by
    }

    return prod
  }

  /**
   * Returns the production event as it appears in the data from
   * /produced_by if a HumanMadeObject or /created_by if a DigitalObject
   * This is used for rendering event data on the entity pages.
   * @returns {IEvent | undefined}
   */
  getRawProductionEvent(): IEvent | undefined {
    let prod = this.object.produced_by

    if (this.object.type === 'DigitalObject') {
      prod = this.object.created_by
    }

    return prod
  }

  /**
   * Parses and returns transformed event data
   * @returns {IEventInfo | null}
   */
  getProductionEvent(): IEventInfo | null {
    const prod = this.getRawProductionEvent()

    if (prod) {
      return new EventParser(prod).getProductionEvent()
    }
    return null
  }

  /**
   * Parses and returns an array of transformed event data specifically from /encountered_by
   * @returns {Array<IEventInfo | null>}
   */
  getEncounteredBy(): Array<IEventInfo | null> {
    const encounteredBy = forceArray(this.object.encountered_by)

    if (encounteredBy.length === 0) {
      return []
    }

    const encounters = encounteredBy.map((encounter) =>
      new EventParser(encounter).getProductionEvent(),
    )

    return encounters
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
   * Returns the agents from the production event
   * @returns {Array<string>}
   */
  getAgentsFromProductionEvent(): Array<string> {
    // This only requires snippet data as there is not a need to parse all of the possible events
    const prod = this.getRawProductionEventSnippet()

    if (prod) {
      const agents = new EventParser(prod).getAgentMap()
      if (agents.length > 0) {
        return agents.map((agent) => agent.id)
      }
    }
    return []
  }

  /**
   * Gets the uuid for the production event
   * @returns {string | null}
   */
  getAgentFromProductionEvent(): string | null {
    // This only requires snippet data as there is not a need to parse all of the possible events
    const agents = this.getAgentsFromProductionEvent()
    if (agents.length > 0) {
      return agents[0]
    }

    return null
  }

  /**
   * Gets the date content for the production event
   * @returns {string | null}
   */
  getDateFromProductionEvent(): string | null {
    // This only requires snippet data as there is not a need to parse all of the possible events
    const prod = this.getRawProductionEventSnippet()

    if (prod) {
      const dates = new EventParser(prod).getDates()
      return dates.length > 0 ? dates[0] : null
    }
    return null
  }

  /**
   * Gets the uuid for the location of the event
   * @returns {string | null}
   */
  getLocationFromProductionEvent(): string | null {
    // This only requires snippet data as there is not a need to parse all of the possible events
    const prod = this.getRawProductionEventSnippet()

    if (prod) {
      const locations = new EventParser(prod).getLocations()
      return locations.length > 0 ? locations[0] : null
    }
    return null
  }

  /**
   * Returns an array of uuids from /shows and /carries
   * @returns {Array<string>}
   */
  getWorks(): Array<string> {
    const shown = forceArray(this.object.shows).map((item) => item.id)
    const carried = forceArray(this.object.carries).map((item) => item.id)
    return [...shown, ...carried].filter((id) => id !== undefined)
  }

  /**
   * Returns an array of transformed data from /access_point
   * @returns {Array<{ content: string; id: string }>}
   */
  getAccessPoints(): Array<{ content: string; id: string }> {
    const accessPoints = forceArray(this.object.access_point)

    if (accessPoints.length === 0) {
      return []
    }

    return accessPoints.map((point) => {
      const identifiedBy = forceArray(point.identified_by)
      let content = ''
      if (identifiedBy.length > 0) {
        content = identifiedBy[0].content
      }

      return { content, id: point.id }
    })
  }

  /**
   * Returns array of uuids from /digitally_carries
   * @returns {Array<string>}
   */
  getDigitallyCarries(): Array<string> {
    const object = this.object as IDigitalObject
    const digitallyCarries = forceArray(object.digitally_carries)

    return getClassifiedAs(digitallyCarries)
  }

  /**
   * Returns array of uuids from /digitally_shows
   * @returns {Array<string>}
   */
  getDigitallyShows(): Array<string> {
    const object = this.object as IDigitalObject
    const digitallyShows = forceArray(object.digitally_shows)

    return getClassifiedAs(digitallyShows)
  }

  /**
   * Returns object with call number data or the first available identifier
   * This will not always return a call number. If the object does not have a call number,
   * the first available identifier will be returned instead.
   * @returns {{label: string; identifier: Array<string>; carriedOutBy: Array<string>} | null}
   */
  getCallNumber(): {
    label: string
    identifier: Array<string>
    carriedOutBy: Array<string>
  } | null {
    const identifiers = this.getIdentifiers()
    if (identifiers.length > 0) {
      for (const identifier of identifiers) {
        if (
          !isUndefined(identifier.equivalent) &&
          identifier.equivalent.includes(config.aat.callNumber)
        ) {
          return identifier
        }
      }

      return identifiers[0]
    }

    return null
  }

  /**
   * Returns an array of objects containing the transformed dimensions data from /dimension
   * @returns {Array<string>}
   */
  getDimensions(): Array<{ label: string; value: number; unit: string }> {
    const dimensions = forceArray(this.json.dimension)

    return dimensions.map((dim) => {
      const classifiedAs = forceArray(dim.classified_as)
      let units = forceArray(dim.unit)
      units = getClassifiedAs(units)

      const label: Array<IEntity> = []
      for (const cl of classifiedAs) {
        label.push(cl)
      }

      let unit = units.length > 0 ? units[0] : ''
      // overwrite the value of unit if the label contains the aat for typeOfPart
      if (label.length > 0 && label[0].hasOwnProperty('equivalent')) {
        const nestedObj = new ObjectParser(label[0])
        if (nestedObj.getEquivalent().includes(config.aat.typeOfPart)) {
          unit = ''
        }
      }
      return {
        label: label.length > 0 ? (label[0].id as string) : '',
        value: dim.value,
        unit,
      }
    })
  }

  /**
   * Gets the data to be displayed in the About section
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getAboutData(): Record<
    string,
    null | string | Array<any> | IContentWithLanguage
  > | null {
    const entityClass = this.getEntityClass('item')

    const data: Record<string, any> = {
      types: this.getTypes(),
      titles: this.getNames(true),
      entityClass,
      identifiers: this.getIdentifiers(),
      publicationEvents: this.getPublicationEvent(),
      productionEvent: this.getProductionEvent(),
      encounteredEvent: this.getEncounteredBy(),
      materials: this.getMaterials(),
      represents: this.getRepresents(),
      notes: this.getNotes(),
      dimensions: null,
      exhibitionDescription: null,
    }

    const { notes } = data
    const hasDimensions = containsSpecificNote(
      notes,
      config.aat.dimensionStatement,
    )
    data.dimensions = !hasDimensions ? this.getDimensions() : []

    const hasExhibitions = containsSpecificNote(notes, config.aat.exhibition)
    // remove the exhibition note from the notes
    if (notes !== null && hasExhibitions) {
      Object.keys(notes).map((key) => {
        notes[key].map((val: INoteContent) => {
          if (!isUndefined(val.equivalent)) {
            if (
              val.equivalent.includes(config.aat.exhibition) &&
              !isUndefined(notes[key])
            ) {
              data.exhibitionDescription = {
                'Exhibitions Description': notes[key],
              }
              delete data.notes[key]
            }
          }
          return null
        })
        return null
      })
    }

    return hasData(data)
  }
}
