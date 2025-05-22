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
 * Returns the page number for the current results
 * @param {ISearchResults} data the data from the search results
 * @returns {number}
 */
export const getPageNumber = (data: ISearchResults): number => {
  const queryString = new URLSearchParams(data.id)
  return queryString.has('page') ? parseInt(queryString.get('page')!, 10) : 1
}
