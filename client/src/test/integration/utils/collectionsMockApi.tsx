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

  // mock the api call for the call number name
  nock(apiUrl)
    .get('/data/concept/5088ec29-065b-4c66-b49e-e61d3c8f3717?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Display Name')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
