import nock from 'nock'

import { stats } from '../../data/stats'
import config from '../../../config/config'

export default function statsMockApi(): void {
  const apiUrl = config.env.dataApiBaseUrl || ''

  // Mock api calls made on the landing page
  nock(apiUrl).get(`/api/stats`).reply(200, JSON.stringify(stats), {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  })
}
