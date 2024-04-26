import { facetSearchTerms } from '../../config/facets'
import { ICriteria } from '../../types/ISearchResults'
import { getParamPrefix } from '../util/params'

export const removeFacet = (
  targetFacet: string,
  targetValue: string | number,
  search: string,
  facetQuery: ICriteria,
  scope: string,
  tab: string,
): string => {
  const paramPrefix = getParamPrefix(tab)
  const newQuery = removeFacetFromQuery(
    targetFacet,
    targetValue,
    facetQuery,
    scope,
  )

  const searchParams = new URLSearchParams(search)
  if (newQuery === null) {
    searchParams.delete(`${paramPrefix}f`)
  } else {
    searchParams.set(`${paramPrefix}f`, JSON.stringify(newQuery))
  }
  searchParams.set(`${paramPrefix}p`, '1')
  return searchParams.toString()
}

export const removeFacetFromQuery = (
  targetFacet: string,
  targetValue: string | number,
  facetQuery: ICriteria,
  scope: string,
): ICriteria | null => {
  if (Object.keys(facetQuery).includes('AND')) {
    const newQuery = facetQuery
    const facetToSearchTerm =
      facetSearchTerms[scope as keyof typeof facetSearchTerms]

    let targetSearchTerm = null
    let idFacet = null

    if (facetToSearchTerm.hasOwnProperty(targetFacet)) {
      ;({ searchTermName: targetSearchTerm, idFacet } =
        facetToSearchTerm[targetFacet as keyof typeof facetToSearchTerm])
    }
    const { AND } = newQuery

    for (let i = AND.length - 1; i >= 0; i -= 1) {
      const searchObj = AND[i]

      for (const searchTerm of Object.keys(searchObj)) {
        if (targetFacet === 'responsibleCollections') {
          const searchObjKeys = Object.keys(searchObj)
          if (
            searchObjKeys.includes('memberOf') &&
            searchObj.memberOf.id === targetValue
          ) {
            AND.splice(i, 1)
          }
        } else if (targetFacet === 'responsibleUnits') {
          if (searchObj.memberOf) {
            const { memberOf } = searchObj
            const memberOfKeys = Object.keys(memberOf)
            if (memberOfKeys.includes('curatedBy')) {
              const { curatedBy } = memberOf
              const curatedByKeys = Object.keys(curatedBy)
              if (curatedByKeys.includes('OR')) {
                const { OR } = curatedBy
                if (Array.isArray(OR) && OR.length > 0) {
                  for (const obj of OR) {
                    const keys = Object.keys(obj)
                    if (keys.includes('id') && obj.id === targetValue) {
                      AND.splice(i, 1)
                    }
                  }
                }
              }
            }
          }
        } else if (searchTerm === targetSearchTerm) {
          if (searchTerm.includes('Date')) {
            AND.splice(i, 1)
          } else if (idFacet) {
            if (searchObj[searchTerm].id === targetValue) {
              AND.splice(i, 1)
            }
          } else if (searchObj[searchTerm] === targetValue) {
            AND.splice(i, 1)
          }
        }
      }
    }
    if (AND.length === 0) {
      return null
    }
    return newQuery
  }
  return null
}
