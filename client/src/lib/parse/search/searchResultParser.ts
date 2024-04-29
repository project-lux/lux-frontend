import { ISearchResults } from '../../../types/ISearchResults'

export const getEstimates = (data: ISearchResults): number => {
  const { partOf } = data
  if (partOf) {
    for (const p of partOf) {
      if (p.totalItems) {
        return p.totalItems
      }
    }
  }
  return 0
}

export const getOrderedItemsIds = (data: ISearchResults): Array<string> => {
  const { orderedItems } = data
  const results: Array<string> = []
  if (orderedItems.length > 0) {
    for (const item of orderedItems) {
      if (item.id) {
        results.push(item.id)
      }
    }
  }
  return results
}
