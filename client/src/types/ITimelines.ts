import { IAdvancedSearchState } from '../redux/slices/advancedSearchSlice'

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

export interface IGraphTimelineData {
  year: string
  yearKey: string
  total: number
  [key: string]: ITimelineCriteria | string | number
}

export interface ITransformedData {
  value: string | null
  totalItems: number
  searchTag: string
  criteria: IAdvancedSearchState
}
