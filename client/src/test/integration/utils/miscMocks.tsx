import nock from 'nock'

import config from '../../../config/config'
import { facetNamesLists } from '../../../config/facets'

export default function miscMocks(): void {
  const facetsApiUrl = config.env.facetsApiBaseUrl || ''

  // Mock facets for objects
  for (const facet of facetNamesLists.objects) {
    nock(facetsApiUrl)
      .get(
        `/api/facets/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&name=${facet}&page=1`,
      )
      .reply(200, JSON.stringify(null), {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  }

  // Mock facets for works
  for (const facet of facetNamesLists.works) {
    nock(facetsApiUrl)
      .get(
        `/api/facets/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%2C%22_lang%22%3A%22en%22%7D%2C%7B%22text%22%3A%22warhol%22%2C%22_lang%22%3A%22en%22%7D%5D%7D&name=${facet}&page=1`,
      )
      .reply(200, JSON.stringify(null), {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
      })
  }
}
