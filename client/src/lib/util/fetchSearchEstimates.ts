import config from '../../config/config'
import { searchScope } from '../../config/searchTypes'

const fetchSearchEstimates = (
  params: string,
  tab: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> =>
  fetch(
    `${config.env.dataApiBaseUrl}api/search-estimate/${searchScope[tab]}?q=${params}`,
  )
    .then((response) =>
      response
        .text()
        .then((translatedString) => ({ [tab]: JSON.parse(translatedString) })),
    )
    .catch((e) => new Error('The requested facets could not be returned.'))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSearchEstimates(params: Record<string, string>): any {
  const promises = Object.keys(params).map((key: string) =>
    fetchSearchEstimates(params[key], key),
  )
  return Promise.all(promises).then((result) => ({ data: result }))
}
