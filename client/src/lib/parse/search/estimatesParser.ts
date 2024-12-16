/* eslint-disable @typescript-eslint/no-explicit-any */
import { searchScope } from '../../../config/searchTypes'
import { IEstimateItems } from '../../../types/ISearchEstimates'
import { ISearchResultsErrorData } from '../../../types/ISearchResults'
import { fetchSearchEstimates } from '../../util/fetchSearchEstimates'

export const isAdvancedSearch = (searchType: string): boolean =>
  searchType === 'advanced'

export const isSimpleSearch = (searchType: string): boolean =>
  searchType === 'simple'

export const transformAdvancedSearchEstimates = (
  data: { [key: string]: IEstimateItems } | undefined,
  tab: string,
): Record<string, number | string> => {
  const estimates: Record<string, number | string> = {}
  if (data && data.hasOwnProperty(tab)) {
    const { totalItems } = data[tab]
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
): Promise<
  Record<string, string | number> | { data: Record<string, string | number> }
> => {
  const urlParams = new URLSearchParams()
  urlParams.set('q', params)
  const promises = fetchSearchEstimates(urlParams.toString(), qt)
  return promises.then((est) => ({
    data: transformAdvancedSearchEstimates(est, qt),
  }))
}

export const getSimpleSearchEstimates = (
  params: Record<string, string>,
): Promise<
  Record<string, any>[] | { data: Record<string, string | number> }
> => {
  const promises = Object.keys(params).map((key: string) => {
    const urlParams = new URLSearchParams()
    urlParams.set('q', params[key])
    return fetchSearchEstimates(urlParams.toString(), key)
  })
  return Promise.all(promises).then((result) => ({
    data: transformSimpleSearchEstimates(result),
  }))
}

export const getEstimatesRequests = (
  searchType: string,
  facetRequest: boolean,
  params: Record<string, string> | string,
  qt: string,
  isSwitchToSimpleSearch: boolean,
): any => {
  if (isAdvancedSearch(searchType) || isSwitchToSimpleSearch) {
    return getAdvancedSearchEstimates(params as string, qt)
  }

  return getSimpleSearchEstimates(params as Record<string, string>)
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
