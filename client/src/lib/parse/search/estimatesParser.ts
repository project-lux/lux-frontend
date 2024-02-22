import { searchScope } from '../../../config/searchTypes'
import { IEstimateItems } from '../../../types/ISearchEstimates'

import { getScopeFromHalLink } from './halLinkHelper'

export const transformAdvancedSearchEstimates = (
  isSuccess: boolean,
  data: IEstimateItems | undefined,
  tab: string,
): Record<string, number | string> => {
  const estimates: Record<string, number | string> = {}
  if (isSuccess && data) {
    const { totalItems } = data
    // assign the current tab its estimate from the data returned
    estimates[tab] = totalItems
    for (const key of Object.keys(searchScope)) {
      if (key !== tab) {
        estimates[key] = '-'
      }
    }
  }
  return estimates
}

export const transformSimpleSearchEstimates = (
  isSuccess: boolean,
  data: Array<Record<string, IEstimateItems>> | undefined,
): Record<string, number> => {
  const estimates: Record<string, number> = {}
  if (isSuccess && data) {
    for (const d of data) {
      Object.keys(d).map((key: string) => {
        estimates[key] = d[key].totalItems
        return null
      })
    }
  }
  return estimates
}

export const redirectToTabWithResults = (
  estimates: Array<Record<string, IEstimateItems>>,
  state: Record<string, boolean>,
  tab: string,
): string | null => {
  if (estimates) {
    if (state !== null && state !== undefined && state.fromNonResultsPage) {
      for (const estimate of estimates) {
        for (const key of Object.keys(estimate)) {
          const { first, totalItems } = estimate[key] as IEstimateItems
          const estimateResultScope = getScopeFromHalLink(first.id)

          for (const [scopeKey, value] of Object.entries(searchScope)) {
            if (
              value === estimateResultScope &&
              totalItems !== 0 &&
              tab !== scopeKey
            ) {
              return scopeKey
            }
          }
        }
      }
    }
  }
  return null
}
