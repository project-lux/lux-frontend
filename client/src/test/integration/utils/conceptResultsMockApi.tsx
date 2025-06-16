import nock from 'nock'

import { activityStreams as mockResults } from '../../data/results'
import { concept as mockConcept } from '../../data/concept'
import { facetNamesLists } from '../../../config/facets'
import config from '../../../config/config'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'

export default function conceptResultsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''
  const mockConceptUri = 'data/concept/mock-concept'

  // Mock concept search with the query "andy warhol"
  nock(apiUrl)
    .get(
      '/api/search/concept?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&sort=',
    )
    .reply(200, JSON.stringify(mockResults(mockConceptUri, 55)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the facets requests and return since they are not being tested with this mock api
  for (const facet of facetNamesLists.conceptsAndGroupings) {
    nock(apiUrl)
      .get(
        `/api/facets/concept?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&name=${facet}&page=1`,
      )
      .reply(200, JSON.stringify(null), {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  }

  // mock the api call for the concept results
  nock(apiUrl)
    .get('/data/concept/mock-concept?profile=results')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the concept name
  nock(apiUrl)
    .get('/data/concept/mock-concept?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the hierarchy set
  nock(apiUrl)
    .get('/data/concept/broader-1?profile=results')
    .reply(
      200,
      JSON.stringify(
        reusableMinimalEntity(
          `${config.env.dataApiBaseUrl}data/concept/broader-1`,
          'English',
        ),
      ),
      {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      },
    )
}
