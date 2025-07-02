export interface ISearchParams {
  q: string
  filterResults?: string
  page?: number
  tab?: string
  facets: { [key: string]: string }
  facetNames?: string
  sort?: string
  rnd?: string // sequence number for random shuffle queries
  [key: string]: string | number | { [key: string]: string } | undefined
}

export interface IItemParams {
  uri: string
  profile?: string
  query?: string
}
