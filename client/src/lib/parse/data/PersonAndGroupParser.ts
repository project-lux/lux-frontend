/* eslint-disable @typescript-eslint/no-explicit-any */

import { isUndefined } from 'lodash'

import config from '../../../config/config'
import IEntity from '../../../types/data/IEntity'
import IAgent from '../../../types/data/IAgent'
import IEvent from '../../../types/data/IEvent'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'
import ITimeSpan from '../../../types/data/ITimeSpan'

import EntityParser from './EntityParser'
import {
  addOneToBceYear,
  convertEpochTime,
  forceArray,
  getBeginOfTheBegin,
  getClassifiedAs,
  getEndOfTheEnd,
  hasData,
  isPlaceholderYear,
  transformDate,
  validateClassifiedAsIdMatches,
} from './helper'

export default class PersonAndGroupParser extends EntityParser {
  agent: IAgent

  constructor(json: IAgent) {
    super(json)
    this.agent = json
  }

  static getBeginOfTheBegin(timespan: ITimeSpan): string {
    let date
    if (timespan._seconds_since_epoch_begin_of_the_begin) {
      date = convertEpochTime(timespan._seconds_since_epoch_begin_of_the_begin)
    } else if (timespan.begin_of_the_begin) {
      date = timespan.begin_of_the_begin
    }

    if (date === undefined) {
      return ''
    }

    return new Date(date).toISOString()
  }

  static getEndOfTheEnd(timespan: ITimeSpan): string {
    let date
    if (timespan._seconds_since_epoch_end_of_the_end) {
      date = convertEpochTime(timespan._seconds_since_epoch_end_of_the_end)
    } else if (timespan.end_of_the_end) {
      date = timespan.end_of_the_end
    }

    if (date === undefined) {
      return ''
    }

    return new Date(date).toISOString()
  }

  /**
   * Reusable date extractor
   * @param {IEvent} timeData date data
   * @returns {string}
   */
  static getDates(timeData: IEvent): string {
    const { timespan } = timeData

    if (isUndefined(timespan)) {
      return ''
    }

    const date = getBeginOfTheBegin(timespan)
    const formattedDate = timespan ? transformDate(date) : ''
    return formattedDate
  }

  /**
   * Returns nested /took_place_at/id value
   * @returns {string}
   */
  static getNestedTookPlaceAt(data: IEvent): string {
    const tookPlaceAt = forceArray(data.took_place_at)
    // return first place id we come across
    for (const place of tookPlaceAt) {
      if (place.id) {
        return place.id
      }
    }
    return ''
  }

  /**
   * Returns year transformed for BCE dates or AD dates
   * @returns {string}
   */
  static transformYear(date: string): string {
    const dateIsBc = date[0] === '-'
    const dateToParse = dateIsBc ? date.slice(1).padStart(4, '0') : date
    const year = new Date(dateToParse).getUTCFullYear()

    if (isNaN(year)) {
      return ''
    }

    if (isPlaceholderYear(year)) {
      return ''
    }

    if (dateIsBc) {
      return `${addOneToBceYear(year)} BCE`
    }

    return `${year.toString()}`
  }

  /**
   * Returns birth date for people from /born/timespan
   * @returns {string}
   */
  getBirthDate(): string {
    const { born } = this.agent
    if (born !== undefined) {
      return PersonAndGroupParser.getDates(born)
    }
    return ''
  }

  /**
   * Returns birth year for people from /born/timespan
   * @returns {string}
   */
  getBirthYear(): string {
    const { born } = this.agent
    if (born !== undefined && born.timespan !== undefined) {
      const date = getBeginOfTheBegin(born.timespan)
      return PersonAndGroupParser.transformYear(date)
    }
    return ''
  }

  /**
   * Returns uuid of place of birth for people from /born/took_place_at/id
   * @returns {string}
   */
  getBirthPlace(): string {
    const { born } = this.agent
    if (born !== undefined) {
      return PersonAndGroupParser.getNestedTookPlaceAt(born)
    }
    return ''
  }

  /**
   * Returns death date for people from /died/timespan
   * @returns {string}
   */
  getDeathDate(): string {
    const { died } = this.agent
    if (died !== undefined) {
      return PersonAndGroupParser.getDates(died)
    }
    return ''
  }

  /**
   * Returns death year for people from /died/timespan
   * @returns {string}
   */
  getDeathYear(): string {
    const { died } = this.agent
    if (died !== undefined && died.timespan !== undefined) {
      const date = getBeginOfTheBegin(died.timespan)
      return PersonAndGroupParser.transformYear(date)
    }
    return ''
  }

  /**
   * Returns uuid of place of death for people from /died/took_place_at/id
   * @returns {string}
   */
  getDeathPlace(): string {
    const { died } = this.agent
    if (died !== undefined) {
      return PersonAndGroupParser.getNestedTookPlaceAt(died)
    }
    return ''
  }

  /**
   * Returns formation date for groups from /formed_by/timespan
   * @returns {string}
   */
  getFormationDate(): string {
    const formedBy = this.agent.formed_by
    if (formedBy !== undefined) {
      return PersonAndGroupParser.getDates(formedBy)
    }
    return ''
  }

  /**
   * Returns formation year for groups from /formed_by/timespan
   * @returns {string}
   */
  getFormationYear(): string {
    const formedBy = this.agent.formed_by
    if (formedBy !== undefined && formedBy.timespan !== undefined) {
      const date = getBeginOfTheBegin(formedBy.timespan)
      return PersonAndGroupParser.transformYear(date)
    }
    return ''
  }

  /**
   * Returns uuid of formation place for groups from /formed_by/took_place_at/id
   * @returns {string}
   */
  getFormationPlace(): string {
    const formedBy = this.agent.formed_by
    if (formedBy !== undefined) {
      return PersonAndGroupParser.getNestedTookPlaceAt(formedBy)
    }
    return ''
  }

  /**
   * Returns uuid of person who formed a group from /formed_by/carried_out_by/id
   * @returns {string}
   */
  getFormationPerson(): Array<string> {
    const formedBy = this.agent.formed_by
    if (formedBy !== undefined) {
      const carriedOutBy = formedBy.carried_out_by
      return carriedOutBy !== undefined ? getClassifiedAs(carriedOutBy) : []
    }
    return []
  }

  /**
   * Returns dissolution date for groups from /dissolved_by/timespan
   * @returns {string}
   */
  getDissolutionDate(): string {
    const dissolvedBy = this.agent.dissolved_by
    if (dissolvedBy !== undefined) {
      return PersonAndGroupParser.getDates(dissolvedBy)
    }
    return ''
  }

  /**
   * Returns dissolution year for groups from /dissolved_by/timespan
   * @returns {string}
   */
  getDissolutionYear(): string {
    const dissolvedBy = this.agent.dissolved_by
    if (dissolvedBy !== undefined && dissolvedBy.timespan !== undefined) {
      const date = getBeginOfTheBegin(dissolvedBy.timespan)
      return PersonAndGroupParser.transformYear(date)
    }
    return ''
  }

  /**
   * Returns uuid of dissolution place for groups from /dissolved_by/took_place_at/id
   * @returns {string}
   */
  getDissolutionPlace(): string {
    const dissolvedBy = this.agent.dissolved_by
    if (dissolvedBy !== undefined) {
      return PersonAndGroupParser.getNestedTookPlaceAt(dissolvedBy)
    }
    return ''
  }

  /**
   * Returns uuid of person who dissolved a group from /dissolved_by/carried_out_by/id
   * @returns {string}
   */
  getDissolutionPerson(): Array<string> {
    const dissolvedBy = this.agent.dissolved_by
    if (dissolvedBy !== undefined) {
      const carriedOutBy = dissolvedBy.carried_out_by
      return carriedOutBy !== undefined ? getClassifiedAs(carriedOutBy) : []
    }
    return []
  }

  /**
   * Returns array of objects containing uuids from /classified_as along with their classification as the key
   * @returns {Array<{ [key: string]: Array<string> }>}
   */
  getAllClassifiedAs(): Array<{ [key: string]: Array<string> }> {
    const classifiedAs = forceArray(this.agent.classified_as)

    const data: Array<{ [key: string]: Array<string> }> = [{}]

    classifiedAs.map((el: IEntity) => {
      const nestedClassifiedAs = forceArray(el.classified_as)
      const labelClassifications = getClassifiedAs(nestedClassifiedAs)
      let label =
        labelClassifications.length > 0
          ? labelClassifications[0]
          : 'Categorized As'
      // check if AATs indicate the label should be overwritten
      for (const cl of nestedClassifiedAs) {
        if (cl.hasOwnProperty('equivalent')) {
          const equivalent = forceArray(cl.equivalent)
          for (const eq of equivalent) {
            if (eq.id === config.aat.gender) {
              label = 'Gender'
            } else if (
              eq.id === config.aat.occupation ||
              eq.id === config.aat.role
            ) {
              label = 'Occupation/Role'
            }
          }
        }
      }

      data.map((d) => {
        if (Object.keys(d).includes(label)) {
          d[label].push(el.id ?? '')
        } else {
          d[label] = [el.id ?? '']
        }
      })
    })

    return data
  }

  /**
   * Returns array of uuids /classified_as nationality
   * @returns {Array<string>}
   */
  // TODO: remove at a later date, this is no longer required
  getNationalities(): Array<string> {
    const classifiedAs = forceArray(this.agent.classified_as)
    const nationalities = []

    for (const cl of classifiedAs) {
      if (cl.hasOwnProperty('classified_as')) {
        if (
          validateClassifiedAsIdMatches(cl.classified_as, [
            config.aat.nationality,
          ])
        ) {
          nationalities.push(cl)
        }
      }
    }

    const nationalitiesIds = nationalities.map(
      (nationality) => nationality.id || '',
    )
    return nationalitiesIds
  }

  /**
   * Returns array of uuids /classified_as occupation or role
   * @returns {Array<string>}
   */
  getOccupations(): Array<string> {
    const classifiedAs = forceArray(this.agent.classified_as)
    const occupations = []

    for (const cl of classifiedAs) {
      if (cl.hasOwnProperty('classified_as')) {
        if (
          validateClassifiedAsIdMatches(cl.classified_as, [
            config.aat.occupation,
            config.aat.role,
          ])
        ) {
          occupations.push(cl)
        }
      }
    }

    const occupationsIds = occupations.map((occupation) => occupation.id || '')
    return occupationsIds
  }

  /**
   * Returns array of uuids from /carried_out/took_place_at
   * @returns {Array<string>}
   */
  getPlaceOfWork(): Array<string> {
    const carriedOut = forceArray(this.agent.carried_out)
    const places: Array<string> = []

    carriedOut.map((carried) => {
      const tookPlaceAt = forceArray(carried.took_place_at)
      tookPlaceAt.map((place) => {
        places.push(place.id)
      })
    })

    return places
  }

  /**
   * Returns array of strings where person/group was active from /carried_out/timespan
   * @returns {Array<string>}
   */
  getYearsActive(): Array<string> {
    const carriedOut = forceArray(this.agent.carried_out)
    const yearsActiveDates: Array<string> = []

    carriedOut.map((activity) => {
      if (activity.timespan) {
        const { timespan } = activity
        const startDate = getBeginOfTheBegin(timespan)
          ? PersonAndGroupParser.transformYear(timespan.begin_of_the_begin)
          : ''
        const endDate = getEndOfTheEnd(timespan)
          ? PersonAndGroupParser.transformYear(timespan.end_of_the_end)
          : ''
        yearsActiveDates.push(`${startDate}-${endDate}`)
      }
    })

    return yearsActiveDates
  }

  /**
   * Returns array of all transformed data from /carried_out
   * @returns {Array<Record<string, string>>}
   */
  getCarriedOut(): Array<Record<string, string>> {
    const carriedOut = forceArray(this.agent.carried_out)

    const activities: Array<Record<string, string>> = carriedOut
      .map((carried) => {
        let type = ''
        let location = ''
        let startDate = ''
        let endDate = ''
        let dates = ''

        if (carried.took_place_at) {
          const locations = getClassifiedAs(carried.took_place_at)
          location = locations.length > 0 ? locations[0] : ''
        }

        if (carried.classified_as) {
          const classifiedAs = forceArray(carried.classified_as)
          const filteredTypes = classifiedAs
            .filter((cl) => {
              // Filter ids that contain the id corresponding with the label of "Professional Activity"
              if (cl.hasOwnProperty('equivalent')) {
                const equivalent = forceArray(cl.equivalent)
                for (const eq of equivalent) {
                  if (eq.id !== config.aat.active) {
                    return cl.id
                  }
                }
              } else {
                return cl.id
              }
              return null
            })
            .filter((cl) => cl !== null)
            .map((cl) => cl.id)
          type = filteredTypes.length > 0 ? filteredTypes[0] : ''
        }

        if (carried.timespan) {
          const beginOfTheBegin = getBeginOfTheBegin(carried.timespan)
          startDate = PersonAndGroupParser.transformYear(beginOfTheBegin)
          const endOfTheEnd = getEndOfTheEnd(carried.timespan)
          endDate = PersonAndGroupParser.transformYear(endOfTheEnd)
        }

        if (startDate !== '' && endDate !== '') {
          dates = `${startDate}-${endDate}`
        } else if (startDate !== '') {
          dates = startDate
        } else if (endDate !== '') {
          dates = endDate
        }

        return {
          type,
          location,
          dates,
        }
      })
      .filter((activity) => {
        // Remove any children that may contain no data
        const { type, location, dates } = activity
        if (type === '' && location === '' && dates === '') {
          return null
        }
        return activity
      })

    return activities
  }

  /**
   * Returns array of uuids of the residence of the person/group from /residence
   * @returns {Array<string>}
   */
  getResidence(): Array<string> {
    const residence = forceArray(this.agent.residence)
    return getClassifiedAs(residence)
  }

  /**
   * Gets the data to be displayed in the About section
   * @returns {Record<string, null | string | Array<any> | IContentWithLanguage> | null}
   */
  getAboutData(): Record<
    string,
    null | string | Array<any> | IContentWithLanguage
  > | null {
    // Shared between Person and Group
    const classifiedAs = this.getAllClassifiedAs()
    const entityClass = this.getEntityClass('agent')
    const memberOf = this.getMemberOf()
    const name = this.getPrimaryName(config.aat.langen)
    const names = this.getNames()
    const notes = this.getNotes()
    const professionalActivity = this.getCarriedOut()
    const residence = this.getResidence()
    const webPages = this.getWebPages()

    // Values only used by Person
    const birthDate = this.getBirthDate()
    const birthPlace = this.getBirthPlace()
    const deathDate = this.getDeathDate()
    const deathPlace = this.getDeathPlace()

    // Values only used by Group
    const formationDate = this.getFormationDate()
    const formationPlace = this.getFormationPlace()
    const formedBy = this.getFormationPerson()
    const dissolutionDate = this.getDissolutionDate()
    const dissolutionPlace = this.getDissolutionPlace()
    const dissolvedBy = this.getDissolutionPerson()

    const data: Record<
      string,
      null | string | Array<any> | IContentWithLanguage
    > = {
      name,
      names,
      entityClass,
      memberOf,
      classifiedAs,
      residence,
      professionalActivity,
      webPages,
      notes,
      birthDate,
      birthPlace,
      deathDate,
      deathPlace,
      formationDate,
      formationPlace,
      formedBy,
      dissolutionDate,
      dissolutionPlace,
      dissolvedBy,
    }

    return hasData(data)
  }
}
