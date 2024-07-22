import nock from 'nock'

import config from '../../../config/config'
import { collection as mockCollection } from '../../data/collection'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

export default function collectionsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock linguistic object call
  nock(apiUrl)
    .get('/data/set/mock-collection')
    .reply(200, JSON.stringify(mockCollection), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock hierarchy
  nock(apiUrl)
    .get('/data/set/member-of-1?profile=results')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity('Parent of Collection', '/set/member-of-1'),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  nock(apiUrl)
    .get('/data/set/member-of-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Parent of Collection')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the request
  nock(apiUrl)
    .get('/data/entity/mock-entity?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Concept')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
