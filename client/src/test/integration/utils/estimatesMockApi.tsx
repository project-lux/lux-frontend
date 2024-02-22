import nock from 'nock'

import { searchEstimate as mockEstimate } from '../../data/results'
import config from '../../../config/config'

export default function estimatesMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock object estimates
  nock(apiUrl)
    .get(
      '/api/search-estimate/item?q={%22AND%22:[{%22text%22:%22andy%22,%22_lang%22:%22en%22},{%22text%22:%22warhol%22,%22_lang%22:%22en%22}]}',
    )
    .reply(200, JSON.stringify(mockEstimate(801)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock work estimates
  nock(apiUrl)
    .get(
      '/api/search-estimate/work?q={%22AND%22:[{%22text%22:%22andy%22,%22_lang%22:%22en%22},{%22text%22:%22warhol%22,%22_lang%22:%22en%22}]}',
    )
    .reply(200, JSON.stringify(mockEstimate(1266)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock people and groups estimates
  nock(apiUrl)
    .get(
      '/api/search-estimate/agent?q={%22AND%22:[{%22text%22:%22andy%22,%22_lang%22:%22en%22},{%22text%22:%22warhol%22,%22_lang%22:%22en%22}]}',
    )
    .reply(200, JSON.stringify(mockEstimate(64)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock place estimates
  nock(apiUrl)
    .get(
      '/api/search-estimate/place?q={%22AND%22:[{%22text%22:%22andy%22,%22_lang%22:%22en%22},{%22text%22:%22warhol%22,%22_lang%22:%22en%22}]}',
    )
    .reply(200, JSON.stringify(mockEstimate(10)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock concept estimates
  nock(apiUrl)
    .get(
      '/api/search-estimate/concept?q={%22AND%22:[{%22text%22:%22andy%22,%22_lang%22:%22en%22},{%22text%22:%22warhol%22,%22_lang%22:%22en%22}]}',
    )
    .reply(200, JSON.stringify(mockEstimate(55)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock event estimates
  nock(apiUrl)
    .get(
      '/api/search-estimate/event?q={%22AND%22:[{%22text%22:%22andy%22,%22_lang%22:%22en%22},{%22text%22:%22warhol%22,%22_lang%22:%22en%22}]}',
    )
    .reply(200, JSON.stringify(mockEstimate(6)), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
