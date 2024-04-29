import {
  searchTermFacets,
  whereAtYaleSearchTermFacets,
} from '../../config/facets'
import { ICriteria } from '../../types/ISearchResults'

// Reads all of the params in the criteria and returns a map of the facet params where the key is a search tag and the value is a set of entity ids
export const getSelectedFacets = (
  criteria: ICriteria,
  scope: string,
): Map<string, Set<string>> => {
  const selectedFacetsMap = new Map() as Map<string, Set<string>>
  const whereAtYaleSearchTermToFacetName =
    whereAtYaleSearchTermFacets.hasOwnProperty(scope)
      ? whereAtYaleSearchTermFacets[
          scope as keyof typeof whereAtYaleSearchTermFacets
        ]
      : null
  const searchTermToFacetName =
    searchTermFacets[scope as keyof typeof searchTermFacets]
  const dateFacets = new Map() as Map<string, { [key: string]: string }>

  if (Object.keys(criteria).includes('AND')) {
    const { AND } = criteria

    for (const searchObj of AND) {
      addObjToFacetMap(searchObj)
    }
    dateFacets.forEach((value, facetName) => {
      const { min, max } = value
      updateMap(facetName, `${min} to ${max}`)
    })
  } else {
    addObjToFacetMap(criteria)
  }
  return selectedFacetsMap

  function addObjToFacetMap(searchObj: ICriteria): void {
    for (const searchTerm of Object.keys(searchObj)) {
      if (
        whereAtYaleSearchTermToFacetName &&
        whereAtYaleSearchTermToFacetName.hasOwnProperty(searchTerm)
      ) {
        const facetInfo =
          whereAtYaleSearchTermToFacetName[
            searchTerm as keyof typeof whereAtYaleSearchTermToFacetName
          ](searchObj)
        if (facetInfo != null) {
          for (const { facetName, value } of facetInfo) {
            updateMap(facetName, value)
          }
        }
      }
      if (searchTermToFacetName.hasOwnProperty(searchTerm)) {
        const { facetName, idFacet } =
          searchTermToFacetName[
            searchTerm as keyof typeof searchTermToFacetName
          ]
        if (facetName.includes('Date')) {
          if (!dateFacets.has(facetName)) {
            dateFacets.set(facetName, {})
          }
          const facetObj = dateFacets.get(facetName)
          const notNullFacetObj = facetObj || {}
          dateFacets.set(facetName, notNullFacetObj)
          if (searchObj._comp === '>=') {
            notNullFacetObj.min = searchObj[searchTerm]
          } else {
            notNullFacetObj.max = searchObj[searchTerm]
          }
          // TODO: uncomment when ML estimates are fixed
          // notNullFacetObj.min = searchObj[searchTerm].start
          // notNullFacetObj.max = searchObj[searchTerm].end
        } else {
          const value = idFacet
            ? searchObj[searchTerm].id
            : searchObj[searchTerm]
          updateMap(facetName, value)
        }
      }
    }
  }

  // helper function to make sure there is an existing set before adding values to map
  function updateMap(searchTag: string, entityId: string): void {
    if (!selectedFacetsMap.has(searchTag)) {
      selectedFacetsMap.set(searchTag, new Set())
    }
    selectedFacetsMap.get(searchTag)?.add(entityId)
  }
}
