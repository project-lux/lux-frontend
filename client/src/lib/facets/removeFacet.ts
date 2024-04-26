import { facetSearchTerms } from '../../config/facets'
import { ICriteria } from '../../types/ISearchResults'
import { getParamPrefix } from '../util/params'

import { buildQuery } from './helper'

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
        if (
          targetFacet === 'responsibleCollections' ||
          targetFacet === 'responsibleUnits'
        ) {
          // right now all where at yale objects return an OR array
          // if this changes, the logic below will have to change
          const targetQueryObj = buildQuery(scope, targetFacet, targetValue)
          const targetObj = targetQueryObj as ICriteria
          const sourceObj = searchObj
          let innerTargetObj = targetObj.memberOf
          let innerSourceObj = sourceObj.memberOf
          let searchingForMatch = true

          while (searchingForMatch) {
            for (const sourceKey of Object.keys(innerSourceObj)) {
              for (const targetKey of Object.keys(innerTargetObj)) {
                if (sourceKey === targetKey) {
                  if (
                    sourceKey === 'id' &&
                    innerSourceObj[sourceKey] === targetValue
                  ) {
                    AND.splice(i, 1)
                    searchingForMatch = false
                  } else {
                    innerTargetObj = innerTargetObj[targetKey]
                    innerSourceObj = innerSourceObj[sourceKey]
                  }
                } else {
                  searchingForMatch = false
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
