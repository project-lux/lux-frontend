import nock from 'nock'

import { activityStreams as mockResults } from '../../data/results'
import { event as mockEvent } from '../../data/event'
import { concept as mockConcept } from '../../data/concept'
import { place as mockPlace } from '../../data/place'
import { person as mockPerson } from '../../data/person'
import { facetNamesLists } from '../../../config/facets'
import config from '../../../config/config'

export default function placeResultsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''
  const facetsApiUrl = config.env.facetsApiBaseUrl || ''
  const mockEventUri = 'data/activity/mock-event'

  // Mock place search with the query "andy warhol"
  nock(apiUrl)
    .get(
      '/api/search/event?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&sort=',
    )
    .reply(200, JSON.stringify(mockResults(mockEventUri, 6)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the facets requests and return since they are not being tested with this mock api
  for (const facet of facetNamesLists.events) {
    nock(facetsApiUrl)
      .get(
        `/api/facets/event?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&name=${facet}`,
      )
      .reply(200, JSON.stringify(null), {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  }

  // mock the api call for the event results
  nock(apiUrl)
    .get('/data/activity/mock-event?profile=results')
    .reply(200, JSON.stringify(mockEvent), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the event name
  nock(apiUrl)
    .get('/data/activity/mock-event?profile=name')
    .reply(200, JSON.stringify(mockEvent), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for types
  nock(apiUrl)
    .get('/data/concept/mock-concept?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for carried out by
  nock(apiUrl)
    .get('/data/group/carried-out-by-1?profile=name')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api cal for took place at
  nock(apiUrl)
    .get('/data/place/took-place-at-1?profile=name')
    .reply(200, JSON.stringify(mockPlace), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
