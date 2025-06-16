import nock from 'nock'

import { activityStreams as mockResults } from '../../data/results'
import { person as mockPerson } from '../../data/person'
import { concept as mockConcept } from '../../data/concept'
import { facetNamesLists } from '../../../config/facets'
import config from '../../../config/config'

export default function personAndGroupResultsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''
  const mockPersonUri = 'data/person/mock-person'

  // Mock person search with the query "andy warhol"
  nock(apiUrl)
    .get(
      '/api/search/agent?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=1&sort=',
    )
    .reply(200, JSON.stringify(mockResults(mockPersonUri, 64)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the facets requests and return since they are not being tested with this mock api
  for (const facet of facetNamesLists.peopleAndOrgs) {
    nock(apiUrl)
      .get(
        `/api/facets/agent?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&name=${facet}`,
      )
      .reply(200, JSON.stringify(null), {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  }

  // mock the api call for the person/group results
  nock(apiUrl)
    .get('/data/person/mock-person?profile=results')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for the person/group name
  nock(apiUrl)
    .get('/data/person/mock-person?profile=name')
    .reply(200, JSON.stringify(mockPerson), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for nationality
  // The concept returned does not have to be unique as the test is ensuring it appears on the page and not its content
  nock(apiUrl)
    .get('/data/concept/nationality-1?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // mock the api call for occupation
  // The concept returned does not have to be unique as the test is ensuring it appears on the page and not its content
  nock(apiUrl)
    .get('/data/concept/occupation-1?profile=name')
    .reply(200, JSON.stringify(mockConcept), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
