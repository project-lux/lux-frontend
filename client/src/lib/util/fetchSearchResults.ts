import config from '../../config/config'
import { IOrderedItems } from '../../types/ISearchResults'

import { getItems } from './fetchItems'

interface IRelationshipParameters {
  scope: string
  query: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (data: Promise<any>) => void
  onError: () => void
  onLoading: () => void
}

export function fetchSearchResults({
  scope,
  query,
  onSuccess,
  onError,
  onLoading,
}: IRelationshipParameters): void {
  const urlParams = new URLSearchParams()
  urlParams.set('q', query)
  onLoading()
  fetch(`${config.env.dataApiBaseUrl}api/search/${scope}?${urlParams}`)
    .then((response) => {
      if (response.ok) {
        response.text().then((data: string) => {
          const parsedData = JSON.parse(data)
          if (parsedData.orderedItems && parsedData.orderedItems.length > 0) {
            const entityIds = parsedData.orderedItems.map(
              (obj: IOrderedItems) => obj.id,
            )
            const items = getItems(entityIds)
            onSuccess(items)
          } else {
            onError()
          }
        })
      } else {
        onError()
      }
    })
    .catch(() => onError())
}
