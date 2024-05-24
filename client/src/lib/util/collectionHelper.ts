/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config/config'
import IEntity from '../../types/data/IEntity'
import EntityParser from '../parse/data/EntityParser'

function transformPath(uri: string): string {
  return uri.replace('/view/', '/data/')
}

export function getMemberOfUris(entity: IEntity): Array<string> {
  const record = new EntityParser(entity)
  return record.getMemberOf()
}

export const fetchCollection = (entityId: string): Promise<any> =>
  fetch(transformPath(entityId))
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          const parser = new EntityParser(data)
          if (parser.isClassifiedAs(config.dc.collection)) {
            return parser.json.id
          }
          return null
        })
      }
      return null
    })
    .catch(() => {
      console.log('fetchCollection failed for collection id: ', entityId)
      return new Error(
        'An error occurred while retreiving data for collections.',
      )
    })

export function getCollections(entity: IEntity): any {
  const memberOf = getMemberOfUris(entity)
  const promises = memberOf.map((id) => fetchCollection(id))
  return Promise.all(promises).then((result) => ({ data: result }))
}
