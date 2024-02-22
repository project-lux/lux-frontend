export interface IHalLink {
  title?: string
  searchTag: string
  tab?: string
  isSemantic?: boolean
  jsonSearchTerm?: string | Array<string>
  facetName?: string // for parsing facet search result
}
