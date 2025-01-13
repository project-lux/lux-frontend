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
