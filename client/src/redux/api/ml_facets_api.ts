/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'
import { isUndefined } from 'lodash'

import { getFacetsApiBaseUrl } from '../../config/config'
import { ISearchParams } from '../../types/IMlApiParams'
import { ISearchResults, ISearchResultsError } from '../../types/ISearchResults'
import { searchScope } from '../../config/searchTypes'

import { baseQuery } from './baseQuery'

export const mlFacetsApi = createApi({
  reducerPath: 'mlFacetsApi',
  baseQuery: baseQuery(getFacetsApiBaseUrl),
  endpoints: (builder) => ({
    getFacetsSearch: builder.query<
      ISearchResults | ISearchResultsError,
      ISearchParams
    >({
      query: (searchParams) => {
        const { q, facetNames, tab, page, sort } = searchParams
        const urlParams = new URLSearchParams()
        const hasPage = !isUndefined(page)
        urlParams.set('q', q)

        let scope = ''
        if (tab !== undefined) {
          scope = searchScope[tab]
        }
        if (facetNames !== undefined) {
          urlParams.set('name', facetNames)
          if (facetNames.includes('Date')) {
            if (hasPage && page > 1) {
              urlParams.set('pageLength', '1')
            }
            if (!isUndefined(sort)) {
              urlParams.set('sort', sort)
            } else {
              urlParams.set('sort', 'asc')
            }
          }
        }
        if (hasPage) {
          urlParams.set('page', page !== 0 ? page.toString() : '1')
        }
        return {
          url: `api/facets/${scope}?${urlParams.toString()}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const { useGetFacetsSearchQuery } = mlFacetsApi
