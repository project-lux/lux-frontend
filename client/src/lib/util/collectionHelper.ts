/* eslint-disable @typescript-eslint/no-explicit-any */
import IEntity from '../../types/data/IEntity'
import EntityParser from '../parse/data/EntityParser'

import { fetchWithToken } from './fetchWithToken'

function transformPath(uri: string): string {
  return uri.replace('/view/', '/data/')
}

export function getMemberOfUris(entity: IEntity): Array<string> {
  const record = new EntityParser(entity)
  return record.getMemberOf()
}

export const fetchCollection = (
  entityId: string,
  aatClassification: string,
): Promise<any> =>
  fetchWithToken(transformPath(entityId))
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          const parser = new EntityParser(data)
          if (parser.isClassifiedAs(aatClassification)) {
            return parser.json.id
          }
          return null
        })
      }
      return null
    })
    .catch(
      () =>
        new Error('An error occurred while retreiving data for collections.'),
    )

export function getCollections(
  entity: IEntity,
  aatClassification: string,
): any {
  const memberOf = getMemberOfUris(entity)
  const promises = memberOf.map((id) => fetchCollection(id, aatClassification))
  return Promise.all(promises).then((result) => ({ data: result }))
}
