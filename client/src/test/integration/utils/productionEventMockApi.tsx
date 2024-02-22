import nock from 'nock'

import config from '../../../config/config'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

export default function productionEventMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock the event label
  nock(apiUrl)
    .get('/data/concept/production?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Event Label')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the creator label call
  nock(apiUrl)
    .get('/data/concept/creator-description?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Creator')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock occurred during
  nock(apiUrl)
    .get('/data/concept/occurred-during?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Occurred During')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock technique
  nock(apiUrl)
    .get('/data/concept/technique?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Technique')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock took place at
  nock(apiUrl)
    .get('/data/place/event-took-place-at?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Location')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock agent
  nock(apiUrl)
    .get('/data/person/carried-out-agent?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Person')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the used_for id
  nock(apiUrl)
    .get('/data/concept/used-for?profile=name')
    .reply(200, JSON.stringify(null), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the referred_to_by id
  nock(apiUrl)
    .get('/data/concept/event-description?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Description')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
