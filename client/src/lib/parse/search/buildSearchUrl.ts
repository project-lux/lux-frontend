import { isNull, isUndefined } from 'lodash'

import { ISearchParams } from '../../../types/IMlApiParams'
import { searchScope } from '../../../config/searchTypes'

import { formatSortParameter } from './queryParser'

/**
 * Builds the relative request URL for the mlApi `search` endpoint.
 * Exported separately from the endpoint definition so the search broadcast
 * feature can report the exact URL that was requested without duplicating
 * this logic.
 */
export const buildSearchRequestUrl = (searchParams: ISearchParams): string => {
  const { q, filterResults, page, pageLength, tab, sort, rnd } = searchParams
  const urlParams = new URLSearchParams()
  urlParams.set('q', q)

  let scope = ''
  if (!isUndefined(tab)) {
    scope = searchScope[tab]
  }
  if (!isUndefined(page)) {
    urlParams.set('page', `${page}`)
  }
  if (!isUndefined(pageLength)) {
    urlParams.set('pageLength', pageLength.toString())
  }
  if (!isUndefined(filterResults) && !isNull(filterResults)) {
    urlParams.set('filterResults', filterResults)
  }
  if (!isUndefined(sort)) {
    urlParams.set('sort', formatSortParameter(sort))
  }
  if (rnd !== undefined) {
    urlParams.set('rnd', `${rnd}`)
  }

  return `api/search/${scope}?${urlParams.toString()}`
}
