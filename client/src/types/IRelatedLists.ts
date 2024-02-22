import { IAdvancedSearchState } from '../redux/slices/advancedSearchSlice'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRelatedListEntry {
  [key: string]: number | IAdvancedSearchState
  totalItems: number
  criteria: IAdvancedSearchState
}

// top level key is the uri of the related entity
// nested key is the entity type for which the current entity is related to the returned entity
export interface IRelatedListResults {
  [key: string]: {
    [key: string]: {
      relations: {
        [key: string]: IRelatedListEntry
      }
      criteria: IAdvancedSearchState
    }
  }
}

export interface IRelatedListEntryTransformed {
  next?: {
    id: string
    type: string
  }
  results: IRelatedListResults | null
  [key: string]: any
}
