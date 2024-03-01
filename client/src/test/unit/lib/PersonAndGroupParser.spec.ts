import PersonAndGroupParser from '../../../lib/parse/data/PersonAndGroupParser'
import { person as mockPerson } from '../../data/person'
import { group as mockGroup } from '../../data/group'
import IEvent from '../../../types/data/IEvent'
import config from '../../../config/config'

describe('PersonAndGroupParser', () => {
  describe('getDates', () => {
    it('returns begin_of_the_begin', () => {
      const data: IEvent = {
        id: '',
        type: '',
        timespan: {
          id: '',
          type: 'TimeSpan',
          end_of_the_end: '1994-05-13T23:59:59Z',
          begin_of_the_begin: '1994-05-13T00:00:00Z',
        },
      }

      const dates = PersonAndGroupParser.getDates(data)
      expect(dates).toEqual('5/13/1994')
    })

    it('returns identified_by content', () => {
      const data: IEvent = {
        id: '',
        type: '',
        timespan: {
          id: '',
          type: 'TimeSpan',
          identified_by: [
            {
              id: '',
              type: 'Name',
              content: '1997-05-13',
              classified_as: [
                {
                  id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
                  type: 'Type',
                  _label: 'Display Title',
                },
              ],
            },
          ],
          end_of_the_end: '1997-05-13T23:59:59Z',
          begin_of_the_begin: '1997-05-13T00:00:00Z',
        },
      }

      const dates = PersonAndGroupParser.getDates(data)
      expect(dates).toEqual('5/13/1997')
    })
  })

  describe('getNestedTookPlaceAt', () => {
    it('returns took_place_at id', () => {
      const timespan = {
        id: '',
        type: 'TimeSpan',
        end_of_the_end: '1997-05-13T23:59:59Z',
        begin_of_the_begin: '1997-05-13T00:00:00Z',
        took_place_at: [
          {
            id: `${config.env.dataApiBaseUrl}data/place/ad51ce62-258b-498f-bbfb-7796ee755a09`,
            type: 'Place',
            _label: 'New Haven, CT',
          },
        ],
      }

      const location = PersonAndGroupParser.getNestedTookPlaceAt(timespan)
      expect(location).toEqual(
        `${config.env.dataApiBaseUrl}data/place/ad51ce62-258b-498f-bbfb-7796ee755a09`,
      )
    })
  })

  describe('birth data', () => {
    it('returns birth date', () => {
      const group = new PersonAndGroupParser(mockPerson)
      const dateOfDeath = group.getBirthDate()
      expect(dateOfDeath).toEqual('3/4/1950')
    })

    it('returns birth year', () => {
      const group = new PersonAndGroupParser(mockPerson)
      const birthYear = group.getBirthYear()
      expect(birthYear).toEqual('1950')
    })

    it('returns birth place', () => {
      const group = new PersonAndGroupParser(mockPerson)
      const placeOfDissolution = group.getBirthPlace()
      expect(placeOfDissolution).toEqual(
        `${config.env.dataApiBaseUrl}data/place/born-place`,
      )
    })
  })

  describe('death data', () => {
    it('returns death date', () => {
      const group = new PersonAndGroupParser(mockPerson)
      const dateOfDeath = group.getDeathDate()
      expect(dateOfDeath).toEqual('5/10/2000')
    })

    it('returns death year', () => {
      const group = new PersonAndGroupParser(mockPerson)
      const deathYear = group.getDeathYear()
      expect(deathYear).toEqual('2000')
    })

    it('returns death place', () => {
      const group = new PersonAndGroupParser(mockPerson)
      const placeOfDissolution = group.getDeathPlace()
      expect(placeOfDissolution).toEqual(
        `${config.env.dataApiBaseUrl}data/place/death-place`,
      )
    })
  })

  describe('formation data', () => {
    it('returns formation person', () => {
      const group = new PersonAndGroupParser(mockGroup)
      const person = group.getFormationPerson()
      expect(person).toStrictEqual([
        `${config.env.dataApiBaseUrl}data/person/mock-formed-by-person`,
      ])
    })

    it('returns formation date', () => {
      const group = new PersonAndGroupParser(mockGroup)
      const dateOfDeath = group.getFormationDate()
      expect(dateOfDeath).toEqual('4/10/1990')
    })

    it('returns formation year', () => {
      const group = new PersonAndGroupParser(mockGroup)
      const deathYear = group.getFormationYear()
      expect(deathYear).toEqual('1990')
    })

    it('returns formation place', () => {
      const group = new PersonAndGroupParser(mockGroup)
      const placeOfDissolution = group.getFormationPlace()
      expect(placeOfDissolution).toEqual(
        `${config.env.dataApiBaseUrl}data/place/mock-formation-place`,
      )
    })
  })

  describe('dissolution data', () => {
    it('returns dissolution date', () => {
      const group = new PersonAndGroupParser(mockGroup)
      const dateOfDeath = group.getDissolutionDate()
      expect(dateOfDeath).toEqual('5/13/1994')
    })

    it('returns dissolution year', () => {
      const group = new PersonAndGroupParser(mockGroup)
      const deathYear = group.getDissolutionYear()
      expect(deathYear).toEqual('1994')
    })

    it('returns dissolution place', () => {
      const group = new PersonAndGroupParser(mockGroup)
      const placeOfDissolution = group.getDissolutionPlace()
      expect(placeOfDissolution).toEqual(
        `${config.env.dataApiBaseUrl}data/place/mock-dissolution-place`,
      )
    })

    it('returns dissolved by person', () => {
      const group = new PersonAndGroupParser(mockGroup)
      const person = group.getDissolutionPerson()
      expect(person).toStrictEqual([
        `${config.env.dataApiBaseUrl}data/person/mock-dissolution-person`,
      ])
    })
  })

  describe('getNationalities', () => {
    it('returns nationalities', () => {
      const person = new PersonAndGroupParser(mockPerson)
      const listOfNationalities = person.getNationalities()
      expect(listOfNationalities).toStrictEqual([
        `${config.env.dataApiBaseUrl}data/concept/nationality-1`,
        `${config.env.dataApiBaseUrl}data/concept/nationality-2`,
      ])
    })
  })

  describe('getOccupations', () => {
    it('returns occupations', () => {
      const person = new PersonAndGroupParser(mockPerson)
      const listOfOccupations = person.getOccupations()
      expect(listOfOccupations).toStrictEqual([
        `${config.env.dataApiBaseUrl}data/concept/occupation-1`,
      ])
    })
  })

  describe('getPlaceOfWork', () => {
    it('returns places of work', () => {
      const person = new PersonAndGroupParser(mockPerson)
      const places = person.getPlaceOfWork()
      expect(places).toStrictEqual([
        `${config.env.dataApiBaseUrl}data/place/activity-took-place-at-1`,
        `${config.env.dataApiBaseUrl}data/place/activity-took-place-at-2`,
      ])
    })
  })

  describe('getYearsActive', () => {
    it('returns years active', () => {
      const person = new PersonAndGroupParser(mockPerson)
      const years = person.getYearsActive()
      expect(years).toStrictEqual(['2000-2010'])
    })
  })

  describe('getAllClassifiedAs', () => {
    it('returns data from classified_as', () => {
      const person = new PersonAndGroupParser(mockPerson)
      const classifiedAs = person.getAllClassifiedAs()
      expect(classifiedAs).toEqual([
        {
          Gender: [`${config.env.dataApiBaseUrl}data/concept/gender-1`],
          Type: [`${config.env.dataApiBaseUrl}data/concept/mock-concept`],
          [config.dc.nationality]: [
            `${config.env.dataApiBaseUrl}data/concept/nationality-1`,
            `${config.env.dataApiBaseUrl}data/concept/nationality-2`,
          ],
          Occupation: [`${config.env.dataApiBaseUrl}data/concept/occupation-1`],
        },
      ])
    })
  })

  describe('getCarriedOut', () => {
    it('returns all data from carried_out', () => {
      const person = new PersonAndGroupParser(mockPerson)
      const carriedOut = person.getCarriedOut()
      expect(carriedOut).toEqual([
        {
          type: `${config.env.dataApiBaseUrl}data/concept/professional-activity`,
          location: `${config.env.dataApiBaseUrl}data/place/activity-took-place-at-1`,
          dates: '2000-2010',
        },
      ])
    })
  })

  describe('transformYear', () => {
    it('returns AD year', () => {
      const year = PersonAndGroupParser.transformYear('2000-01-01T00:00:00Z')
      expect(year).toEqual('2000')
    })

    it('returns BCE year', () => {
      const bcYear = PersonAndGroupParser.transformYear('-2000-01-01T00:00:00Z')
      expect(bcYear).toEqual('2000 BCE')
    })
  })

  describe('getResidence', () => {
    it('returns array of uuids', () => {
      const person = new PersonAndGroupParser(mockPerson)
      const year = person.getResidence()
      expect(year).toEqual([
        `${config.env.dataApiBaseUrl}data/place/residence-1`,
      ])
    })
  })
})
