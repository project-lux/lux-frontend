import { ISearchResults, ISearchResultsError } from './ISearchResults'

export interface ISearchResponse {
  data: ISearchResults
  error: ISearchResultsError
  isSuccess: boolean
  isLoading: boolean
  isError: boolean
  isFetching: boolean
  status: string
}
