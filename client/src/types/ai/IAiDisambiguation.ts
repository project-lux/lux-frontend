import { IAdvancedSearchState } from '../../redux/slices/advancedSearchSlice'

export default interface IAiDisambiguation {
  natural: string
  parsed: string
  query: IAdvancedSearchState
}
