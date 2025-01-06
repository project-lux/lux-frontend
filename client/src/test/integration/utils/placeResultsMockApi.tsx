import nock from 'nock'

import { activityStreams as mockResults } from '../../data/results'
import { place as mockPlace, placeParent as mockParent } from '../../data/place'
import { concept as mockConcept } from '../../data/concept'
import config from '../../../config/config'

export default function placeResultsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''
  const facetsApiUrl = config.env.facetsApiBaseUrl || ''
  const mockPlaceUri = 'data/place/mock-place'
  const facetsList = ['placeTypeId', 'placePartOfId']

  // Mock place search with the query "andy warhol"
  nock(apiUrl)
    .get(
      '/api/search/place?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&sort=',
    )
    .reply(200, JSON.stringify(mockResults(mockPlaceUri, 10)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the facets requests and return since they are not being tested with this mock api
  for (const facet of facetsList) {
    nock(facetsApiUrl)
      .get(
        `/api/facets/place?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&name=${facet}`,
      )
      .reply(200, JSON.stringify(null), {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  }

  // mock the api call for the place results
  nock(apiUrl)
    .get('/data/place/mock-place?profile=results')
    .reply(200, JSON.stringify(mockPlace), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the place name
  nock(apiUrl)
    .get('/data/place/mock-place?profile=name')
    .reply(200, JSON.stringify(mockPlace), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for types
  nock(apiUrl)
    .get('/data/concept/classified-as-1?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the initial parent in the hierarchy
  nock(apiUrl)
    .get('/data/place/mock-place-parent-entity?profile=name')
    .reply(200, JSON.stringify(mockParent), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the hierarchy set
  nock(apiUrl)
    .get('/data/place/mock-place-parent-entity?profile=results')
    .reply(200, JSON.stringify(mockParent), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
