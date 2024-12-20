import { isNull } from 'lodash'

import { IPartOf, ISearchResults } from '../../../types/ISearchResults'

export const getEstimates = (data: ISearchResults): number => {
  const { partOf } = data
  if (partOf) {
    if (Array.isArray(partOf)) {
      for (const p of partOf) {
        if (p.totalItems) {
          return p.totalItems
        }
      }
    }

    if (typeof partOf === 'object') {
      const partOfObject = partOf as IPartOf
      if (partOfObject.totalItems) {
        return partOfObject.totalItems
      }
    }
  }
  return 0
}

/**
 * Returns array of ids from the results
 * @param {ISearchResults | null} data the data returned from the API request
 * @returns {Array<string>}
 */
export const getOrderedItemsIds = (
  data: ISearchResults | null,
): Array<string> => {
  if (isNull(data)) {
    return []
  }

  const { orderedItems } = data
  return orderedItems.map((item) => item.id)
}
