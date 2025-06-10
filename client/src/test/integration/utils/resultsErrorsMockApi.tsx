import nock from 'nock'

import { errorsResults as mockResults } from '../../data/results'
import { facetNamesLists } from '../../../config/facets'
import config from '../../../config/config'

export default function resultsErrorsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock object search with the query "andy warhol"
  nock(apiUrl)
    .get(
      '/api/search/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&page=0&sort=',
    )
    .reply(400, JSON.stringify(mockResults), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock the facets requests and return since they are not being tested with this mock api
  for (const facet of facetNamesLists.objects) {
    nock(apiUrl)
      .get(
        `/api/search/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&facetsOnly=true&facetNames=${facet}`,
      )
      .reply(200, JSON.stringify(null), {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  }
}
