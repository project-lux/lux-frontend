/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'

import { ISearchParams, IItemParams } from '../../types/IMlApiParams'
import { ISearchResults, ISearchResultsError } from '../../types/ISearchResults'
import { IRelatedListEntryTransformed } from '../../types/IRelatedLists'
import { transformRelatedListResults } from '../../lib/parse/search/relatedListsParser'
import { getDataApiBaseUrl } from '../../config/config'
import { IDataConstants } from '../../config/dataConstants'
import { formatSortParameter } from '../../lib/parse/search/queryParser'
import IEntity from '../../types/data/IEntity'
import { replaceBaseUrl } from '../../lib/parse/data/helper'
import { IAdvancedSearchConfigResponse } from '../../types/IAdvancedSearchConfigResponse'
import { searchScope } from '../../config/searchTypes'
import { getTimelines } from '../../lib/util/timelineHelper'
// import { fetchHalLinkSearchRequest } from '../../lib/util/fetchRelationships'
import { getCollections } from '../../lib/util/collectionHelper'
import { IEstimateItems } from '../../types/ISearchEstimates'
import { getSearchEstimates } from '../../lib/util/fetchSearchEstimates'
import { getItems } from '../../lib/util/fetchItems'

import { baseQuery } from './baseQuery'
import { IStats } from './returnTypes'

export const mlApi: any = createApi({
  reducerPath: 'mlApi',
  baseQuery: baseQuery(getDataApiBaseUrl),
  endpoints: (builder) => ({
    search: builder.query<ISearchResults | ISearchResultsError, ISearchParams>({
      query: (searchParams) => {
        const { q, page, tab, sort, rnd } = searchParams
        // const facetString = formatFacetSearchRequestUrl(searchParams)
        const urlParams = new URLSearchParams()

        urlParams.set('q', q)

        let scope = ''
        if (tab !== undefined) {
          scope = searchScope[tab]
        }
        if (page !== undefined) {
          urlParams.set('page', `${page}`)
        }
        urlParams.set('sort', formatSortParameter(sort))
        if (rnd !== undefined) {
          urlParams.set('rnd', `${rnd}`)
        }
        return {
          url: `api/search/${scope}?${urlParams.toString()}`,
          method: 'GET',
        }
      },
    }),
    getItem: builder.query<any, IItemParams>({
      query: (itemUri) => {
        const { uri, profile } = itemUri
        let profileParam = ''
        if (profile !== undefined) {
          profileParam = `?profile=${profile}`
        }
        return {
          url: `data/${uri}${profileParam}`,
          method: 'GET',
        }
      },
    }),
    getItems: builder.query<any, Array<string>>({
      queryFn(uris) {
        return getItems(uris)
      },
    }),
    getName: builder.query<IEntity, IItemParams>({
      query: (itemUri) => ({
        url: `data/${itemUri.uri}?profile=name`,
        method: 'GET',
      }),
    }),
    // Returns ISearchResults type
    getSearchRelationship: builder.query<
      ISearchResults,
      {
        uri: string
        page?: string
      }
    >({
      query: (queryParams) => {
        const { uri, page } = queryParams
        const halLink = replaceBaseUrl(uri)
        let pageParam = ''
        if (page !== undefined) {
          pageParam = `&page=${page}`
        }
        return {
          url: `${halLink}${pageParam}`,
          method: 'GET',
        }
      },
    }),
    // Returns ISearchResults type
    getFacetedRelationship: builder.query<
      ISearchResults,
      {
        uri: string
      }
    >({
      query: (queryParams) => {
        const halLink = replaceBaseUrl(queryParams.uri)
        return {
          url: halLink,
          method: 'GET',
        }
      },
    }),
    getTimeline: builder.query<any, Array<string>>({
      queryFn(hrefs) {
        return getTimelines(hrefs)
      },
    }),
    // getMultipleRelationships: builder.query<
    //   any,
    //   { halLinks: Array<string>; page: number }
    // >({
    //   queryFn({ halLinks, page }) {
    //     const promises = halLinks.map((link) =>
    //       fetchHalLinkSearchRequest(link, page),
    //     )
    //     return Promise.all(promises).then((result) => ({ data: result }))
    //   },
    // }),
    getCollection: builder.query<any, IEntity>({
      queryFn(entity) {
        return getCollections(entity)
      },
    }),
    getDataConstants: builder.query<IDataConstants, void>({
      query: () => ({
        url: `api/data-constants`,
        method: 'GET',
      }),
    }),
    getAdvancedSearchConfig: builder.query<IAdvancedSearchConfigResponse, void>(
      {
        query: () => ({
          url: `api/advanced-search-config`,
          method: 'GET',
        }),
      },
    ),
    getStats: builder.query<IStats, void>({
      query: () => ({
        url: `api/stats`,
        method: 'GET',
      }),
    }),
    getRelatedLists: builder.query<
      IRelatedListEntryTransformed | null,
      { url: string }
    >({
      query: ({ url }) => {
        const halLink = replaceBaseUrl(url)
        return {
          url: halLink,
          method: 'GET',
        }
      },
      transformResponse: (
        response: ISearchResults,
      ): IRelatedListEntryTransformed | null => {
        const { orderedItems, next } = response
        if (orderedItems.length > 0) {
          return {
            next,
            results: transformRelatedListResults(orderedItems),
          }
        }
        return null
      },
    }),
    // Used for getting the estimates of all of the tabs in a simple search
    getManyEstimates: builder.query<any, { tabParams: Record<string, string> }>(
      {
        queryFn({ tabParams }) {
          return getSearchEstimates(tabParams)
        },
      },
    ),
    // Used for getting the estimate of a single tab in an advanced search
    getSingleEstimate: builder.query<
      IEstimateItems,
      { params: string; tab: string }
    >({
      query: ({ params, tab }) => {
        const urlParams = new URLSearchParams()
        urlParams.set('q', params)
        return {
          url: `api/search-estimate/${
            searchScope[tab]
          }?${urlParams.toString()}`,
          method: 'GET',
        }
      },
    }),
  }),
})

export const {
  useGetItemQuery,
  useGetItemsQuery,
  useGetNameQuery,
  useGetSearchRelationshipQuery,
  useGetFacetedRelationshipQuery,
  useGetTimelineQuery,
  // useGetMultipleRelationshipsQuery,
  useGetCollectionQuery,
  useGetDataConstantsQuery,
  useGetAdvancedSearchConfigQuery,
  useGetStatsQuery,
  useSearchQuery,
  useGetRelatedListsQuery,
  useGetManyEstimatesQuery,
  useGetSingleEstimateQuery,
} = mlApi
