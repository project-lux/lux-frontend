import { IFacet, LabelFunc, Scope, facets } from '../../config/facets'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'

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

export const getFacetValues = (data: ISearchResults): Array<string> => {
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
