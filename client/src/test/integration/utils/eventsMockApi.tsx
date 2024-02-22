import nock from 'nock'

import { event as mockEvent } from '../../data/event'
import config from '../../../config/config'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

export default function eventsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock get event
  nock(apiUrl)
    .get('/data/activity/mock-event')
    .reply(200, JSON.stringify(mockEvent), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock get event name
  nock(apiUrl)
    .get('/data/activity/mock-event?profile=name')
    .reply(200, JSON.stringify(mockEvent), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for agent
  nock(apiUrl)
    .get('/data/group/carried-out-by-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Agent')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for locations
  nock(apiUrl)
    .get('/data/place/took-place-at-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Location 1')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/place/took-place-at-2?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Location 2')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for type
  nock(apiUrl)
    .get('/data/concept/mock-concept?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Types')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for objects
  nock(apiUrl)
    .get('/data/set/mock-set?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Objects')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for transferred title of
  nock(apiUrl)
    .get('/data/concept/transferred-title-of?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Transferred Title Of')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for part carried out by
  nock(apiUrl)
    .get('/data/group/part-carried-out-by?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Part Carried Out By')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for objects
  nock(apiUrl)
    .get('/data/concept/identifier-classified-as?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Identifier Label')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for notes label
  nock(apiUrl)
    .get('/data/concept/referred-to-by-classified-as-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Notes Label')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
