import nock from 'nock'

import config from '../../../config/config'
import { visualItem as mockVisualItem } from '../../data/visualItem'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

export default function visualItemsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock linguistic object call
  nock(apiUrl)
    .get('/data/visual/mock-visual-item')
    .reply(200, JSON.stringify(mockVisualItem), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the type call
  nock(apiUrl)
    .get('/data/concept/classified-as-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Type')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the about call
  nock(apiUrl)
    .get('/data/concept/about-1?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock About')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the represents call
  nock(apiUrl)
    .get('/data/concept/represents?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Represents')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the production call
  nock(apiUrl)
    .get('/data/concept/production?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Publication')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Additional mocks not required for individual tests
  nock(apiUrl)
    .get('/data/concept/carried-out-by-classified-as?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Carried Out By')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/person/mock-person?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Person')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/person/mock-person?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Person')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
