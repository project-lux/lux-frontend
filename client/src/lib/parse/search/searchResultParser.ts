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
