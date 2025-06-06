/* eslint-disable @typescript-eslint/no-explicit-any */

import { isUndefined } from 'lodash'

import { fetchWithToken } from './fetchWithToken'

export const fetchItem = (uri: string, profile?: string): Promise<any> =>
  fetchWithToken(`${uri}${isUndefined(profile) ? '' : '?profile=results'}`)
    .then((response) =>
      response.text().then((translatedString) => JSON.parse(translatedString)),
    )
    .catch(() => new Error('An error occurred retrieving the data from the '))

export function getItems(uris: Array<string>, profile?: string): any {
  const promises = uris.map((uri: string) => fetchItem(uri, profile))
  return Promise.all(promises).then((result) => ({ data: result }))
}
