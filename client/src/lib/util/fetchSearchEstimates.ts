import config from '../../config/config'
import { searchScope } from '../../config/searchTypes'

import { fetchWithToken } from './fetchWithToken'

export const fetchSearchEstimates = async (
  params: string,
  tab: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> =>
  fetchWithToken(
    `${config.env.dataApiBaseUrl}api/search-estimate/${searchScope[tab]}?${params}`,
  )
    .then((response) =>
      response
        .text()
        .then((translatedString) => ({ [tab]: JSON.parse(translatedString) })),
    )
    .catch(() => new Error('The requested facets could not be returned.'))
