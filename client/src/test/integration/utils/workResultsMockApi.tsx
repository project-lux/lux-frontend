import nock from 'nock'

import { activityStreams as mockResults } from '../../data/results'
import { linguisticObject as mockWork } from '../../data/linguisticObject'
import { person as mockPerson } from '../../data/person'
import { concept as mockConcept } from '../../data/concept'
import { facetNamesLists } from '../../../config/facets'
import config from '../../../config/config'

export default function workResultsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''
  const facetsApiUrl = config.env.facetsApiBaseUrl || ''
  const mockWorkUri = 'data/text/mock-linguistic-object'

  // Mock work search with the query "andy warhol"
  nock(apiUrl)
    .get(
      '/api/search/work?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&sort=',
    )
    .reply(200, JSON.stringify(mockResults(mockWorkUri, 1266)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the facets requests and return since they are not being tested with this mock api
  for (const facet of facetNamesLists.works) {
    nock(facetsApiUrl)
      .get(
        `/api/facets/work?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&name=${facet}`,
      )
      .reply(200, JSON.stringify(null), {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  }

  // mock the api call for the work results
  nock(apiUrl)
    .get('/data/text/mock-linguistic-object?profile=results')
    .reply(200, JSON.stringify(mockWork), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the work name
  nock(apiUrl)
    .get('/data/text/mock-linguistic-object?profile=name')
    .reply(200, JSON.stringify(mockWork), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for Creator
  nock(apiUrl)
    .get('/data/group/created-by-carried-out-by-1?profile=name')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for work types
  nock(apiUrl)
    .get('/data/concept/classified-as-1?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
