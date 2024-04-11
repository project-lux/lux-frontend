export interface IHalLink {
  title?: string
  searchTag: string
  tab?: string
  jsonSearchTerm?: string | Array<string>
  facetName?: string // for parsing facet search result
}
