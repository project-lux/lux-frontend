import nock from 'nock'

import { activityStreams as mockResults } from '../../data/results'
import mockObject from '../../data/object'
import { person as mockPerson } from '../../data/person'
import { place as mockPlace } from '../../data/place'
import { concept as mockConcept } from '../../data/concept'
import { set as mockSet } from '../../data/set'
import config from '../../../config/config'

export default function objectResultsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''
  const facetsApiUrl = config.env.facetsApiBaseUrl || ''
  const mockObjectUri = 'data/object/mock-object'
  const facetsList = [
    'itemHasDigitalImage',
    'itemIsOnline',
    'itemRecordType',
    'itemTypeId',
    'itemMaterialId',
    'itemEncounteredAgentId',
    'itemEncounteredPlaceId',
    'itemEncounteredDate',
    'itemProductionAgentId',
    'itemProductionPlaceId',
    'itemProductionDate',
    'responsibleUnits',
    'responsibleCollections',
  ]

  // Remove the produced_by data from the object
  delete mockObject.produced_by

  // Mock object search with the query "andy warhol"
  nock(apiUrl)
    .get(
      '/api/search/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&sort=',
    )
    .reply(200, JSON.stringify(mockResults(mockObjectUri, 801)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the facets requests and return since they are not being tested with this mock api
  for (const facet of facetsList) {
    nock(facetsApiUrl)
      .get(
        `/api/facets/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&name=${facet}`,
      )
      .reply(200, JSON.stringify(null), {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  }

  // mock the api call for the object results
  nock(apiUrl)
    .get('/data/object/mock-object?profile=results')
    .reply(200, JSON.stringify(mockObject), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the object name
  nock(apiUrl)
    .get('/data/object/mock-object?profile=name')
    .reply(200, JSON.stringify(mockObject), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for encountered by
  nock(apiUrl)
    .get('/data/person/encounter-carried-out-by?profile=name')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the call for encountered at
  nock(apiUrl)
    .get('/data/place/encounter-took-place-at?profile=name')
    .reply(200, JSON.stringify(mockPlace), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for object types
  nock(apiUrl)
    .get('/data/concept/classified-as-1?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for collection
  nock(apiUrl)
    .get('/data/set/member-of-collection-1?profile=results')
    .reply(200, JSON.stringify(mockSet), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for collection
  nock(apiUrl)
    .get('/data/set/member-of-collection-1?profile=name')
    .reply(200, JSON.stringify(mockSet), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the hierarchy set
  nock(apiUrl)
    .get('/data/set/set-member-of-1?profile=results')
    .reply(200, JSON.stringify(mockSet), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
