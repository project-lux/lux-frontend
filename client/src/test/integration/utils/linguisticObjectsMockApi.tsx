import nock from 'nock'

import config from '../../../config/config'
import { linguisticObject as mockWork } from '../../data/linguisticObject'
import { physicalObject as mockObject } from '../../data/object'
import { activityStreams as mockResults } from '../../data/results'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

export default function linguisticObjectsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock linguistic object call
  nock(apiUrl)
    .get('/data/text/mock-linguistic-object')
    .reply(200, JSON.stringify(mockWork), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the part of call
  nock(apiUrl)
    .get('/data/concept/part-of?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Part of')), {
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

  // Mock the imprint statement label call
  nock(apiUrl)
    .get('/data/concept/about-2?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock About 2')), {
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
    .get('/data/concept/production?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Publication')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Additional mocks not required for testing
  // Mock the language statement label call
  nock(apiUrl)
    .get('/data/concept/b7ae3f24-564d-4122-8013-8ad6ce05fe70?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Language Statement')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the identifier label call
  nock(apiUrl)
    .get('/data/concept/system-assigned-number?profile=results')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('System Assigned Number')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // Mock the identifier unit call
  nock(apiUrl)
    .get('/data/group/attributed-by-carried-out-by?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Group')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock workCarriedBy HAL link
  nock(apiUrl)
    .get('/api/search/agent?q=workCarriedByMockHalLink')
    .reply(200, JSON.stringify(mockResults('data/concept/concept', 1)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/concept/concept')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Concept')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/concept/concept?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Concept')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/entity/mock-entity?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Concept')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the original works
  nock(apiUrl)
    .get('/data/object/mock-object?profile=name')
    .reply(200, JSON.stringify(mockObject), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the technique
  nock(apiUrl)
    .get('/data/concept/created-by-technique-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Technique')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the locations
  nock(apiUrl)
    .get('/data/place/mock-place-entity?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Place')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the production classified_as
  nock(apiUrl)
    .get('/data/concept/created-by-classified-as-2?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Classified As')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/concept/created-by-classified-as-1?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Classified As')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the production carried_out_by
  nock(apiUrl)
    .get('/data/group/created-by-carried-out-by-2?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Carried Out By')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/group/created-by-carried-out-by-1?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Carried Out By')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(apiUrl)
    .get('/data/group/created-by-carried-out-by-1?profile=results')
    .reply(200, JSON.stringify(reusableMinimalEntity('Carried Out By')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
