import { IOrderedItems } from './ISearchResults'

export interface IFacetValue {
  value: string | number
  count: number
}

export interface IFacetsPagination {
  requests: {
    [key: string]: Array<IOrderedItems>
  }
  numberOfPages: number
  total: number
}
