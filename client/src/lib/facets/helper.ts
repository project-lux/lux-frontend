import { isNull } from 'lodash'

import { IFacet, LabelFunc, Scope, facets } from '../../config/facets'
import {
  ICriteria,
  IOrderedItems,
  ISearchResults,
} from '../../types/ISearchResults'
import { getParamPrefix } from '../util/params'

import { getSelectedFacets } from './selectedFacets'

export const getLabel = (
  scope: string,
  facet: string,
  labelAttr: string,
  value: number | string,
): string => {
  const scopeConfig = facets[scope as Scope]
  const facetConfig = scopeConfig ? scopeConfig[facet] : undefined

  if (facetConfig !== undefined) {
    const label = facetConfig[labelAttr as keyof IFacet]

    if (typeof label === 'function') {
      return (label as LabelFunc)(value)
    }
  }

  return String(value)
}

export const getFacetLabel = (
  scope: string,
  facet: string,
  value: number | string,
): string => getLabel(scope, facet, 'facetLabel', value)

export const getSelectedLabel = (
  scope: string,
  facet: string,
  value: number | string,
): string => getLabel(scope, facet, 'selectedLabel', value)

export const buildQuery = (
  scope: string,
  facet: string,
  value: number | string,
): object | null => {
  const scopeConfig = facets[scope as Scope]
  const facetConfig = scopeConfig ? scopeConfig[facet] : undefined

  if (facetConfig !== undefined) {
    return facetConfig.buildQuery(value)
  }
  return null
}

export const getFacetsOrderedItems = (data: ISearchResults): Array<string> => {
  if (data !== null) {
    const { orderedItems } = data
    return orderedItems === null || orderedItems.length === 0
      ? []
      : orderedItems.map(
          (facetValue: IOrderedItems) => facetValue.value as string,
        )
  }
  return []
}

const getIfValidQuery = (str: string): ICriteria | null => {
  if (/^\{.*\}$/.test(str)) {
    try {
      return JSON.parse(str)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return null
    }
  } else {
    return null
  }
}

export const getFacetData = (
  tab: string,
  search: string,
  scope: string,
): {
  mainQuery: null | ICriteria
  facetQuery: null | ICriteria
  selectedFacets: null | Map<string, Set<string>>
} | null => {
  const paramPrefix = getParamPrefix(tab)

  const searchParams = new URLSearchParams(search)
  const mainQueryString = searchParams.get('q') || ''
  const mainQuery = getIfValidQuery(mainQueryString)
  if (mainQuery !== null) {
    const facetQueryString = searchParams.get(`${paramPrefix}f`)
    const facetQuery = facetQueryString ? JSON.parse(facetQueryString) : null
    const selectedFacets = facetQuery
      ? getSelectedFacets(facetQuery, scope)
      : null

    return { mainQuery, facetQuery, selectedFacets }
  }

  return null
}

export const getSpecificFacetData = (
  tab: string,
  search: string,
  scope: string,
  requestedFacetData: string,
): null | Set<string> | undefined => {
  const facetData = getFacetData(tab, search, scope)
  if (!isNull(facetData) && !isNull(facetData!.selectedFacets)) {
    return facetData.selectedFacets.get(requestedFacetData)
  }

  return null
}
