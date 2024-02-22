import nock from 'nock'

import { person as mockPerson } from '../../data/person'
import config from '../../../config/config'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'
import { languageConcept } from '../../data/concept'

export default function personMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // mock the api call for the person
  nock(apiUrl)
    .get('/data/person/mock-person')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the request for the person name
  nock(apiUrl)
    .get('/data/person/mock-person?profile=name')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the professional activity place 1
  nock(apiUrl)
    .get('/data/place/activity-took-place-at-1?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Place of Activity One')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the professional activity place 2
  nock(apiUrl)
    .get('/data/place/activity-took-place-at-2?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Place of Activity Two')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the professional activity type
  nock(apiUrl)
    .get('/data/concept/professional-activity?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Activity Type')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the member of
  nock(apiUrl)
    .get('/data/concept/member-of-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Member Of')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the member of
  nock(apiUrl)
    .get('/data/concept/member-of-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Member Of')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for nationality
  nock(apiUrl)
    .get('/data/concept/nationality-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Nationality One')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for nationality
  nock(apiUrl)
    .get('/data/concept/nationality-2?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Nationality Two')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for nationality
  nock(apiUrl)
    .get('/data/concept/05344568-bdd1-4289-90d6-b9fdcdbaaa4c?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Nationality')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for occupation
  nock(apiUrl)
    .get('/data/concept/occupation-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Occupation')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for occupation label
  nock(apiUrl)
    .get('/data/concept/1680a4ba-f5a1-490b-bbfa-e391199d4458?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Occupation')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for gender
  nock(apiUrl)
    .get('/data/concept/gender-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Gender')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for type
  nock(apiUrl)
    .get('/data/concept/mock-concept?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Type')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for note label
  nock(apiUrl)
    .get('/data/concept/biography-statement?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Note Label')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for death place
  nock(apiUrl)
    .get('/data/place/death-place?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Death Place')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for born place
  nock(apiUrl)
    .get('/data/place/born-place?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Birth Place')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the name language
  nock(apiUrl)
    .get('/data/concept/1fda962d-1edc-4fd7-bfa9-0c10e3153449?profile=name')
    .reply(200, JSON.stringify(languageConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
