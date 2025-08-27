/* eslint-disable @typescript-eslint/no-explicit-any */
import { isUndefined } from 'lodash'

import { nestedPageLinks } from '../../../config/myCollections/resultsTabs'
import { searchScope } from '../../../config/searchTypes'
import { IEstimateItems } from '../../../types/ISearchEstimates'
import { ISearchResultsErrorData } from '../../../types/ISearchResults'
import { formatSubTabNavLinks } from '../../myCollections/helper'
import { fetchSearchEstimates } from '../../util/fetchSearchEstimates'

export const isAdvancedSearch = (searchType: 'advanced' | 'simple'): boolean =>
  searchType === 'advanced'

export const isSimpleSearch = (searchType: 'advanced' | 'simple'): boolean =>
  searchType === 'simple'

export const transformAdvancedSearchEstimates = (
  data: { [key: string]: IEstimateItems } | undefined,
  tab: string,
  subTab?: string,
): Record<string, number | string> => {
  const estimates: Record<string, number | string> = {}
  if (data) {
    if (data.hasOwnProperty(tab)) {
      const { totalItems } = data[tab]
      // assign the current tab its estimate from the data returned
      estimates[tab] = totalItems
    }
    for (const key of Object.keys(searchScope)) {
      if (key !== tab) {
        estimates[key] = '-'
      }
    }
    if (!isUndefined(subTab) && data.hasOwnProperty(subTab)) {
      const { totalItems } = data[subTab]
      // assign the current tab its estimate from the data returned
      estimates[subTab] = totalItems
      estimates.collections = totalItems
      for (const key of Object.keys(nestedPageLinks)) {
        if (key !== subTab) {
          estimates[key] = '-'
        }
      }
    }
  }
  return estimates
}

export const transformSimpleSearchEstimates = (
  data:
    | Array<Record<string, IEstimateItems | ISearchResultsErrorData>>
    | undefined,
): Record<string, number | string> => {
  const estimates: Record<string, number | string> = {}
  if (data && data.length > 0) {
    for (const d of data) {
      Object.keys(d).map((key: string) => {
        // Check if results have an error
        if (d[key].hasOwnProperty('errorMessage')) {
          estimates[key] = '-'
        } else {
          const estimatesResults = d[key] as IEstimateItems
          estimates[key] = estimatesResults.totalItems
        }
        return null
      })
    }
  }
  return estimates
}

export const getAdvancedSearchEstimates = (
  params: string,
  qt: string,
  user?: string,
  viewingMyCollections?: string,
): Promise<
  Record<string, string | number> | { data: Record<string, string | number> }
> => {
  const urlParams = new URLSearchParams()
  urlParams.set('q', params)
  let subTab: undefined | string = undefined
  if (viewingMyCollections && user) {
    subTab = 'my-collections'
  }
  const promises = fetchSearchEstimates(urlParams.toString(), qt, subTab)
  return promises.then((est) => ({
    data: transformAdvancedSearchEstimates(est, qt, subTab),
  }))
}

export const getSimpleSearchEstimates = (
  params: Record<string, string>,
  user: string | undefined,
): Promise<
  Record<string, any>[] | { data: Record<string, string | number> }
> => {
  const promises = Object.keys(params).map((key: string) => {
    let searchScopeTab = key
    let subTab
    const urlParams = new URLSearchParams()
    //
    if (!Object.keys(nestedPageLinks).includes(key)) {
      urlParams.set('q', params[key])
    } else {
      searchScopeTab = 'collections'
      subTab = key
      const updatedParams = formatSubTabNavLinks(user, subTab, params[subTab])
      urlParams.set('q', updatedParams)
    }
    return fetchSearchEstimates(urlParams.toString(), searchScopeTab, subTab)
  })
  return Promise.all(promises).then((result) => ({
    data: transformSimpleSearchEstimates(result),
  }))
}

export const getEstimatesRequests = (
  searchType: 'advanced' | 'simple',
  facetRequest: boolean,
  params: Record<string, string> | string,
  qt: string,
  isSwitchToSimpleSearch: boolean,
  user?: string,
  viewingMyCollections?: string,
): any => {
  if (isAdvancedSearch(searchType) || isSwitchToSimpleSearch) {
    return getAdvancedSearchEstimates(
      params as string,
      qt,
      user,
      viewingMyCollections,
    )
  }

  return getSimpleSearchEstimates(params as Record<string, string>, user)
}

export const redirectToTabWithResults = (
  estimates: Record<string, number>,
  state: Record<string, boolean>,
  tab: string,
): string | null => {
  if (estimates) {
    if (state !== null && state !== undefined && state.fromNonResultsPage) {
      for (const key of Object.keys(estimates)) {
        const total = estimates[key] as number

        for (const scopeKey of Object.keys(searchScope)) {
          if (total !== 0 && tab !== scopeKey) {
            return scopeKey
          }
        }
      }
    }
  }
  return null
}

/**
 * Returns the object containing the default estimates for each tab
 * @param {boolean} isSuccess; value determining if the estimates requests was successful
 * @param {any} data; the data returned from the request to get estimates
 * @returns {Record<string, number | string>}
 */
export const defaultEstimates = (
  isSuccess: boolean,
  data: any,
): Record<string, number | string> => {
  return isSuccess && data
    ? data
    : {
        objects: '-',
        works: '-',
        people: '-',
        places: '-',
        concepts: '-',
        events: '-',
      }
}
