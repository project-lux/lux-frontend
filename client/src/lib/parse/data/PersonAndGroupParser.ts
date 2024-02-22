/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-destructuring */
import config from '../../../config/config'
import IEntity from '../../../types/data/IEntity'
import IAgent from '../../../types/data/IAgent'
import IEvent from '../../../types/data/IEvent'
import { IContentWithLanguage } from '../../../types/IContentWithLanguage'

import EntityParser from './EntityParser'
import {
  forceArray,
  getClassifiedAs,
  getClassifiedAsWithMatchingClassifier,
  hasData,
  transformDate,
} from './helper'

export default class PersonAndGroupParser extends EntityParser {
  agent: IAgent

  constructor(json: IAgent) {
    super(json)
    this.agent = json
  }

  /**
   * Reusable date extractor
   * @param {IEvent} timeData date data
   * @returns {string}
   */
  static getDates(timeData: IEvent): string {
    const { timespan } = timeData
    const formattedDate = timespan
      ? transformDate(timespan.begin_of_the_begin)
      : ''
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
  static transformYear(date: string | undefined): string {
    if (date === undefined) {
      return ''
    }

    const dateIsBc = date[0] === '-'
    const dateToParse = dateIsBc ? date.slice(1) : date
    const year = new Date(dateToParse).getUTCFullYear()

    if (isNaN(year)) {
      return ''
    }

    if (dateIsBc) {
      return `${year.toString()} BCE`
    }

    return year.toString()
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
    const birthDate = this.getBirthDate()
    return PersonAndGroupParser.transformYear(birthDate)
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
    const deathDate = this.getDeathDate()
    return PersonAndGroupParser.transformYear(deathDate)
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
    const formationDate = this.getFormationDate()
    return PersonAndGroupParser.transformYear(formationDate)
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
    const dissolutionDate = this.getDissolutionDate()
    return PersonAndGroupParser.transformYear(dissolutionDate)
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
        labelClassifications.length > 0 ? labelClassifications[0] : 'Type'

      if (label === config.dc.gender) {
        label = 'Gender'
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
   * Returns array of uuids /classified_as genders
   * @returns {Array<string>}
   * @deprecated
   */
  getGenders(): Array<string> {
    const classifiedAs = forceArray(this.agent.classified_as)
    const genders = getClassifiedAsWithMatchingClassifier(
      classifiedAs,
      config.dc.gender,
    )

    const genderIds = genders.map((gender) => gender.id || '')
    return genderIds
  }

  /**
   * Returns array of uuids /classified_as nationality
   * @returns {Array<string>}
   */
  // TODO: remove at a later date, this is no longer required
  getNationalities(): Array<string> {
    const classifiedAs = forceArray(this.agent.classified_as)
    const nationalities = getClassifiedAsWithMatchingClassifier(
      classifiedAs,
      config.dc.nationality,
    )

    const nationalitiesIds = nationalities.map(
      (nationality) => nationality.id || '',
    )
    return nationalitiesIds
  }

  /**
   * Returns array of uuids /classified_as occupation
   * @returns {Array<string>}
   */
  getOccupations(): Array<string> {
    const classifiedAs = forceArray(this.agent.classified_as)
    const occupations = getClassifiedAsWithMatchingClassifier(
      classifiedAs,
      config.dc.occupation,
    )

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
        const startDate = timespan.begin_of_the_begin
          ? PersonAndGroupParser.transformYear(timespan.begin_of_the_begin)
          : ''
        const endDate = timespan.end_of_the_end
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
          const ids = getClassifiedAs(classifiedAs)
          const filteredTypes = ids.filter((id) => id !== config.dc.active)
          type = filteredTypes.length > 0 ? filteredTypes[0] : ''
        }

        if (carried.timespan) {
          startDate = PersonAndGroupParser.transformYear(
            carried.timespan.begin_of_the_begin,
          )
          endDate = PersonAndGroupParser.transformYear(
            carried.timespan.end_of_the_end,
          )
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
    const names = this.getNames()
    const memberOf = this.getMemberOf()
    const residence = this.getResidence()
    const professionalActivity = this.getCarriedOut()
    const webPages = this.getWebPages()
    const notes = this.getNotes()
    const classifiedAs = this.getAllClassifiedAs()

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
      names,
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
