import nock from 'nock'

import { group as mockGroup } from '../../data/group'
import config from '../../../config/config'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

export default function groupMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // mock the api call for the person
  nock(apiUrl)
    .get('/data/group/mock-group')
    .reply(200, JSON.stringify(mockGroup), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the request for the person name
  nock(apiUrl)
    .get('/data/group/mock-group?profile=name')
    .reply(200, JSON.stringify(mockGroup), {
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

  // mock the api call for classified_as data
  nock(apiUrl)
    .get('/data/concept/classified-as-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Classified As 1')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for classified_as data
  nock(apiUrl)
    .get('/data/concept/classified-as-1-label?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Classified As 1 Label')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  nock(apiUrl)
    .get('/data/concept/classified-as-2?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Classified As 2')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/concept/classified-as-3?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Classified As 3')), {
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

  // mock the api call for dissolution place
  nock(apiUrl)
    .get('/data/place/mock-dissolution-place?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Dissolution Place')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for dissolved by person
  nock(apiUrl)
    .get('/data/person/mock-dissolution-person?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Dissolved By Person')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for formed by person
  nock(apiUrl)
    .get('/data/person/mock-formed-by-person?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Formed By Person')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for formation place
  nock(apiUrl)
    .get('/data/place/mock-formation-place?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Formation Place')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for residence
  nock(apiUrl)
    .get('/data/place/mock-place?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Residence')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // German
  nock(apiUrl)
    .get('/data/concept/9d31890a-a72a-40e2-b872-de5c5412b093?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('German')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for description
  nock(apiUrl)
    .get('/data/concept/description?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Description')), {
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
}
