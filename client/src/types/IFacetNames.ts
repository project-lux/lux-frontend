export interface IFacetNamesLists {
  objects: Array<string>
  works: Array<string>
  peopleAndOrgs: Array<string>
  places: Array<string>
  conceptsAndGroupings: Array<string>
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
  agent: IFacetToSearchTerm
  place: IFacetToSearchTerm
  concept: IFacetToSearchTerm
  event: IFacetToSearchTerm
}
