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
      '/api/facets/item?q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person%22%7D%7D&name=itemTypeId&page=1',
    )
    .reply(
      200,
      JSON.stringify(
        mockTypes(
          '/api/facets/item?q=%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2Fmock-person%22%7D%7D&name=itemTypeId&page=1',
        ),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )

  // mock api call for the name of the related type
  nock(apiUrl)
    .get('/data/concept/mock-facet-concept?profile=results')
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
    .get('/api/related-list/agent?name=relatedToAgent&uri=https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba')
    .reply(200, JSON.stringify(mockRelatedListResults), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the request for semantically related group
  nock(apiUrl)
    .get('/data/group/mock-semantic-group?profile=results')
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
    .get('/api/search/item?q=%7B%22OR%22%3A%5B%7B%22producedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%2C%7B%22encounteredBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%2C%7B%22productionInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%5D%7D')
    .reply(200, JSON.stringify(mockResults('data/object/mock-object', 1)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the request for items influenced
  nock(apiUrl)
    .get('/api/search/concept?q=%7B%22influencedByAgent%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D')
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

  // mock the request for works published
  nock(apiUrl)
    .get('/api/search/work?q=%7B%22OR%22%3A%5B%7B%22createdBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Fendpoint.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%2C%7B%22publishedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%2C%7B%22creationInfluencedBy%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fperson%2F34f4eec7-7a03-49c8-b1be-976c2f6ba6ba%22%7D%7D%5D%7D')
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

  // Mock the request for the related work
  nock(apiUrl)
    .get('/data/entity/mock-entity?profile=name')
    .reply(200, JSON.stringify(reusableMinimalEntity('Mock Work')), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
