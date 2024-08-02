import { IAdvancedSearchState } from '../redux/slices/advancedSearchSlice'

import { ISearchResults } from './ISearchResults'

export interface ITimelineCriteria {
  totalItems: number
  criteria: IAdvancedSearchState
}

export interface IYear {
  total: number
  [key: string]: ITimelineCriteria | number
}

export interface ITimelinesTransformed {
  [key: string]: IYear
}

export interface ITransformedData {
  value: string | null
  totalItems: number
  searchTag: string
  criteria: IAdvancedSearchState
}

export interface IGraphTimelineData {
  year: string
  yearKey: string
  total: number
  [key: string]: ITimelineCriteria | string | number
}

export type TimelineSearchResult = Array<{
  [key: string]: ISearchResults
}>

export interface IGraphTimelineData {
  year: string
  total: number
  [key: string]: ITimelineCriteria | string | number
}
