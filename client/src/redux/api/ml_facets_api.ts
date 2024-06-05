/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'

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
        const { q, facetNames, tab, page } = searchParams
        const urlParams = new URLSearchParams()

        urlParams.set('q', q)

        let scope = ''
        if (tab !== undefined) {
          scope = searchScope[tab]
        }
        if (facetNames !== undefined) {
          urlParams.set('name', facetNames)
        }
        if (page !== undefined) {
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
