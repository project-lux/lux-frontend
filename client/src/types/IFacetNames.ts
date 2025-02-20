export interface IFacetNamesLists {
  [key: string]: Array<string>
  objects: Array<string>
  works: Array<string>
  people: Array<string>
  places: Array<string>
  concepts: Array<string>
  events: Array<string>
}

export interface ISearchTermToFacet {
  [key: string]: {
    facetName: string
    idFacet: boolean
  }
}

export interface ISearchTermToFacetConfig {
  item: ISearchTermToFacet
  work: ISearchTermToFacet
  set: ISearchTermToFacet
  agent: ISearchTermToFacet
  place: ISearchTermToFacet
  concept: ISearchTermToFacet
  event: ISearchTermToFacet
}

export interface IFacetToSearchTerm {
  [key: string]: {
    searchTermName: string
    idFacet: boolean
  }
}

export interface IFacetToSearchTermConfig {
  item: IFacetToSearchTerm
  work: IFacetToSearchTerm
  set: IFacetToSearchTerm
  agent: IFacetToSearchTerm
  place: IFacetToSearchTerm
  concept: IFacetToSearchTerm
  event: IFacetToSearchTerm
}
