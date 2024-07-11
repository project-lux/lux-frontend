import nock from 'nock'

import config from '../../../config/config'
import { set as mockSet } from '../../data/set'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'
import { archive as mockArchive } from '../../data/archive'

export default function setsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock linguistic object call
  nock(apiUrl).get('/data/set/mock-set').reply(200, JSON.stringify(mockSet), {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  })

  // Mock the about
  nock(apiUrl)
    .get('/data/concept/about-1?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock About')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the represents call
  nock(apiUrl)
    .get('/data/concept/represents?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Depicts')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for work types
  nock(apiUrl)
    .get('/data/concept/classified-as-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Types')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock hierarchy
  nock(apiUrl)
    .get('/data/set/set-member-of-1?')
    .reply(200, JSON.stringify(reusableMinimalEntity('Parent of Set')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/set/set-member-of-1?profile=results')
    .reply(200, JSON.stringify(mockArchive), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // archive mocks
  nock(apiUrl)
    .get('/data/set/mock-archive?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Archive')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/set/mock-archive')
    .reply(200, JSON.stringify(mockArchive), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for hierarchy
  nock(apiUrl)
    .get('/data/set/member-of-collection-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Parent One')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/set/member-of-collection-2?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Parent Two')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/concept/concept?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Parent of Set')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock api call for archive type
  nock(apiUrl)
    .get('/data/concept/24a671f3-e269-4ad9-9710-4796b8cc9478?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Archive')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the created_by agent
  nock(apiUrl)
    .get('/data/person/mock-person?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Person')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the members_exemplified_by data
  nock(apiUrl)
    .get('/data/place/mock-place?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Place')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/concept/mock-concept?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Concept')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mocks for the archive that are not required for tests but prevent logs
  nock(apiUrl)
    .get('/data/group/mock-group?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Group')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mocks for the archive /identified_by/carried_out_by
  nock(apiUrl)
    .get('/data/group/carried-out-by?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Group')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mocks for the archive /identified_by/classified_as
  nock(apiUrl)
    .get('/data/concept/classified-as?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Concept')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
