/* eslint-disable @typescript-eslint/no-explicit-any */

import { fetchWithToken } from './fetchWithToken'

export const fetchHalLinkSearchRequest = (
  link: string,
  page: number,
): Promise<any> =>
  fetchWithToken(`${link}&page=${page}`)
    .then((response) =>
      response.text().then((translatedString) => JSON.parse(translatedString)),
    )
    .catch(() => new Error('The requested facets could not be returned.'))
