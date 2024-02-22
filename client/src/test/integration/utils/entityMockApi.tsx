import nock from 'nock'

import { personLinks as mockPerson } from '../../data/personLinks'
import config from '../../../config/config'
import { activityStreams as mockResults } from '../../data/results'
import { types as mockTypes } from '../../data/relatedItemTypes'
import { relatedListResults as mockRelatedListResults } from '../../data/relatedListResults'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

export default function entityMockApi(): void {
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

  // mock the request for types
  nock(apiUrl)
    .get(
      '/api/facets/item?q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person%22%7D%7D&name=itemTypeId',
    )
    .reply(200, JSON.stringify(mockTypes), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock api call for the name of the related type
  nock(apiUrl)
    .get('/data/concept/mock-facet-concept?profile=name')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity(
          'Mock Facet Concept',
          '/concept/mock-facet-concept',
        ),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the request for related agents (semantic relationship)
  nock(apiUrl)
    .get('/api/related-list/agent?name=relatedToAgent&uri=mockEntityUri')
    .reply(200, JSON.stringify(mockRelatedListResults), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the request for semantically related group
  nock(apiUrl)
    .get('/data/group/mock-semantic-group?profile=name')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity(
          'Mock Semantic Group',
          '/group/mock-semantic-group',
        ),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the request for concepts influenced
  nock(apiUrl)
    .get('/api/search/concept?q=agentInfluencedConcepts')
    .reply(
      200,
      JSON.stringify(mockResults('data/concept/mock-search-result-concept', 1)),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the request for concepts influenced name
  nock(apiUrl)
    .get('/data/concept/mock-search-result-concept?profile=name')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity(
          'Mock Search Concept',
          '/concept/mock-search-result-concept',
        ),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the request for items made/discovered
  nock(apiUrl)
    .get('/api/search/item?q=agentMadeDiscoveredItem')
    .reply(200, JSON.stringify(mockResults('data/object/mock-object', 1)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the object results
  nock(apiUrl)
    .get('/data/object/mock-object?profile=results')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity('Mock Object', '/object/mock-object'),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the api call for the object name
  nock(apiUrl)
    .get('/data/object/mock-object?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Object')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the request for works published
  nock(apiUrl)
    .get('/api/search/work?q=agentCreatedPublishedWork')
    .reply(200, JSON.stringify(mockResults('data/text/mock-work', 1)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the request for work published results profile
  nock(apiUrl)
    .get('/data/text/mock-work?profile=results')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Work', '/text/mock-work')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock the request for work published name profile
  nock(apiUrl)
    .get('/data/text/mock-work?profile=name')
    .reply(
      200,
      JSON.stringify(reusableMinimalEntity('Mock Work', '/text/mock-work')),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )
}
