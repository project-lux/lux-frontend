/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config/config'
import { replaceBaseUrl } from '../parse/data/helper'

import { deleteWithToken } from './fetchWithToken'

export const deleteCollection = (id: string): Promise<any> =>
  deleteWithToken(`${config.env.dataApiBaseUrl}${id}`)
    .then((response) =>
      response.text().then((translatedString) => JSON.parse(translatedString)),
    )
    .catch(() => new Error('An error occurred retrieving the data from the '))

export function deleteCollections(uuids: Array<string>): any {
  const promises = uuids.map((id: string) =>
    deleteCollection(replaceBaseUrl(id)),
  )
  return Promise.all(promises).then((result) => ({ data: result }))
}
