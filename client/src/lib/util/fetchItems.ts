/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchWithToken } from './fetchWithToken'

export const fetchItems = (uri: string): Promise<any> =>
  fetchWithToken(`${uri}?profile=results`)
    .then((response) =>
      response.text().then((translatedString) => JSON.parse(translatedString)),
    )
    .catch(() => new Error('An error occurred retrieving the data from the '))

export function getItems(uris: Array<string>): any {
  const promises = uris.map((uri: string) => fetchItems(uri))
  return Promise.all(promises).then((result) => ({ data: result }))
}
