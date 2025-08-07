/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'
import { isUndefined } from 'lodash'

import { ISearchParams, IItemParams } from '../../types/IMlApiParams'
import { ISearchResults, ISearchResultsError } from '../../types/ISearchResults'
import { IRelatedListEntryTransformed } from '../../types/IRelatedLists'
import { transformRelatedListResults } from '../../lib/parse/search/relatedListsParser'
import { getDataApiBaseUrl } from '../../config/config'
import { formatSortParameter } from '../../lib/parse/search/queryParser'
import IEntity from '../../types/data/IEntity'
import { replaceBaseUrl, stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { IAdvancedSearchConfigResponse } from '../../types/IAdvancedSearchConfigResponse'
import { searchScope } from '../../config/searchTypes'
import { getTimelines } from '../../lib/util/fetchTimeline'
import { getCollections } from '../../lib/util/collectionHelper'
import { getItems } from '../../lib/util/fetchItems'
import { getEstimatesRequests } from '../../lib/parse/search/estimatesParser'
import { getAncestors } from '../../lib/util/fetchArchiveAncestors'
import { getHeaders } from '../../lib/util/fetchWithToken'
import { deleteCollections } from '../../lib/util/deleteCollections'
import { IDeleteCollection } from '../../types/myCollections/IDeleteCollection'
import {
  addIdentifiersToCollectionObject,
  addNamesToCollectionObject,
  addNotesToCollectionObject,
  addToCollectionObject,
  addWebpagesToCollectionObject,
  createCollectionObject,
  deleteFromCollectionObject,
  setCollectionAsDefault,
} from '../../lib/myCollections/helper'
import { ICreateCollectionFormData } from '../../types/myCollections/ICreateCollectionFormData'
import { IAddToCollection } from '../../types/myCollections/IAddToCollection'
import { IDeleteRecordsFromCollection } from '../../types/myCollections/IDeleteRecordsFromCollection'
import IMyCollection from '../../types/data/IMyCollection'
import IWebpages from '../../types/data/IWebpages'
import { INoteContent } from '../../types/IContentWithLanguage'
import INames from '../../types/myCollections/INames'

import { baseQuery } from './baseQuery'
import { IStats } from './returnTypes'

export const mlApi: any = createApi({
  reducerPath: 'mlApi',
  baseQuery: baseQuery(getDataApiBaseUrl),
  tagTypes: ['Results', 'Item', 'Items', 'Estimates'],
  endpoints: (builder) => ({
    search: builder.query<ISearchResults | ISearchResultsError, ISearchParams>({
      query: (searchParams) => {
        const { q, filterResults, token, page, tab, sort, rnd } = searchParams
        // const facetString = formatFacetSearchRequestUrl(searchParams)
        const urlParams = new URLSearchParams()
        urlParams.set('q', q)

        let scope = ''
        if (tab !== undefined) {
          scope = searchScope[tab]
        }
        if (!isUndefined(page)) {
          urlParams.set('page', `${page}`)
        }
        if (!isUndefined(filterResults)) {
          urlParams.set('filterResults', filterResults)
        }
        if (!isUndefined(sort)) {
          urlParams.set('sort', formatSortParameter(sort))
        }
        if (rnd !== undefined) {
          urlParams.set('rnd', `${rnd}`)
        }
        // set headers if My Collections
        let headers: Headers = getHeaders(token)

        return {
          url: `api/search/${scope}?${urlParams.toString()}`,
          method: 'GET',
          headers,
        }
      },
      providesTags: ['Results'],
    }),
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
          if (facetNames.includes('Date')) {
            urlParams.set('sort', 'asc')
          }
        }
        if (page !== undefined) {
          urlParams.set('page', page !== 0 ? page.toString() : '1')
        }

        // set headers if My Collections
        const headers: Headers = getHeaders()

        return {
          url: `api/facets/${scope}?${urlParams.toString()}`,
          method: 'GET',
          headers,
        }
      },
    }),
    getItem: builder.query<any, IItemParams>({
      query: (itemUri) => {
        const { uri, token, profile } = itemUri
        let profileParam = ''
        if (profile !== undefined) {
          profileParam = `?profile=${profile}`
        }
        // set headers if My Collections
        const headers: Headers = getHeaders(token)
        return {
          url: `data/${uri}${profileParam}`,
          method: 'GET',
          headers,
        }
      },
      providesTags: ['Item'],
    }),
    getItems: builder.query<any, { uris: Array<string>; profile?: string }>({
      queryFn({ uris, profile }) {
        return getItems(uris, profile)
      },
      providesTags: ['Items'],
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
    getTimeline: builder.query<any, Array<string>>({
      queryFn(hrefs) {
        return getTimelines(hrefs)
      },
    }),
    getCollection: builder.query<any, IEntity>({
      queryFn(entity) {
        return getCollections(entity)
      },
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
    getEstimates: builder.query<
      any,
      {
        searchType: 'advanced' | 'simple'
        facetRequest: boolean
        qt: string
        params: Record<string, string> | string
        isSwitchToSimpleSearch: boolean
      }
    >({
      queryFn({
        searchType,
        facetRequest,
        qt,
        params,
        isSwitchToSimpleSearch,
      }) {
        return getEstimatesRequests(
          searchType,
          facetRequest,
          params,
          qt,
          isSwitchToSimpleSearch,
        )
      },
      providesTags: ['Estimates'],
    }),
    getAncestors: builder.query<
      any,
      {
        entities: Array<{
          entity: IEntity
          currentPageWithinParentResultsHalLink: null | string
        }>
      }
    >({
      queryFn: async ({ entities }) => {
        try {
          const ancestors = await getAncestors(entities)
          return { data: ancestors }
        } catch (error) {
          // Catch any errors and return them as an object with an `error` field
          return { error }
        }
      },
    }),
    createCollection: builder.mutation<any, ICreateCollectionFormData>({
      query: (collectionFormData) => {
        const { name, classification, language, defaultCollection } =
          collectionFormData

        const collection = createCollectionObject(
          name,
          classification,
          language,
          defaultCollection,
        )

        return {
          url: 'data/',
          method: 'POST',
          data: collection,
          headers: getHeaders(),
        }
      },
      invalidatesTags: ['Results', 'Estimates', 'Item', 'Items'],
    }),
    addToCollection: builder.mutation<any, IAddToCollection>({
      query: (data) => {
        const { collectionId, collectionData, recordsToAdd } = data
        const collection = addToCollectionObject(collectionData, recordsToAdd)
        const collectionUuid = stripYaleIdPrefix(collectionId)

        return {
          url: `data/${collectionUuid}`,
          method: 'PUT',
          data: collection,
          headers: getHeaders(),
        }
      },
      invalidatesTags: ['Results', 'Item', 'Items'],
    }),
    editCollectionNames: builder.mutation<
      any,
      { collection: IMyCollection; names: Array<INames> }
    >({
      query: (data) => {
        const { collection, names } = data
        const updatedCollection = addNamesToCollectionObject(collection, names)
        const collectionUuid = stripYaleIdPrefix(updatedCollection.id as string)

        return {
          url: `data/${collectionUuid}`,
          method: 'PUT',
          data: updatedCollection,
          headers: getHeaders(),
        }
      },
      invalidatesTags: ['Results', 'Item', 'Items'],
    }),
    editDefaultCollection: builder.mutation<any, { collection: IMyCollection }>(
      {
        query: (data) => {
          const { collection } = data
          const updatedCollection = setCollectionAsDefault(collection)
          const collectionUuid = stripYaleIdPrefix(
            updatedCollection.id as string,
          )

          return {
            url: `data/${collectionUuid}`,
            method: 'PUT',
            data: updatedCollection,
            headers: getHeaders(),
          }
        },
        invalidatesTags: ['Results', 'Item', 'Items'],
      },
    ),
    editCollectionIdentifiers: builder.mutation<
      any,
      { collection: IMyCollection; identifiers: Array<string> }
    >({
      query: (data) => {
        const { collection, identifiers } = data
        const updatedCollection = addIdentifiersToCollectionObject(
          collection,
          identifiers,
        )
        const collectionUuid = stripYaleIdPrefix(updatedCollection.id as string)

        return {
          url: `data/${collectionUuid}`,
          method: 'PUT',
          data: updatedCollection,
          headers: getHeaders(),
        }
      },
      invalidatesTags: ['Results', 'Item', 'Items'],
    }),
    editCollectionWebpages: builder.mutation<
      any,
      { collection: IMyCollection; webPages: Array<IWebpages> }
    >({
      query: (data) => {
        const { collection, webPages } = data
        const updatedCollection = addWebpagesToCollectionObject(
          collection,
          webPages,
        )
        const collectionUuid = stripYaleIdPrefix(updatedCollection.id as string)

        return {
          url: `data/${collectionUuid}`,
          method: 'PUT',
          data: updatedCollection,
          headers: getHeaders(),
        }
      },
      invalidatesTags: ['Results', 'Item', 'Items'],
    }),
    editCollectionNotes: builder.mutation<
      any,
      { collection: IMyCollection; notes: Array<INoteContent> }
    >({
      query: (data) => {
        const { collection, notes } = data
        const updatedCollection = addNotesToCollectionObject(collection, notes)
        const collectionUuid = stripYaleIdPrefix(updatedCollection.id as string)

        return {
          url: `data/${collectionUuid}`,
          method: 'PUT',
          data: updatedCollection,
          headers: getHeaders(),
        }
      },
      invalidatesTags: ['Results', 'Item', 'Items'],
    }),
    deleteRecordsFromCollection: builder.mutation<
      any,
      IDeleteRecordsFromCollection
    >({
      query: (data) => {
        const { collectionId, collectionData, recordsToDelete } = data
        const collection = deleteFromCollectionObject(
          collectionData,
          recordsToDelete,
        )
        const collectionUuid = stripYaleIdPrefix(collectionId)

        return {
          url: `data/${collectionUuid}`,
          method: 'PUT',
          data: collection,
          headers: getHeaders(),
        }
      },
      invalidatesTags: ['Results', 'Item', 'Items'],
    }),
    deleteCollection: builder.mutation<any, IDeleteCollection>({
      query: (collectionData) => {
        const { ids } = collectionData
        return deleteCollections(ids)
      },
      invalidatesTags: ['Results', 'Estimates'],
    }),
  }),
})

export const {
  useGetAdvancedSearchConfigQuery,
  useGetAncestorsQuery,
  useGetCollectionQuery,
  useGetEstimatesQuery,
  useGetFacetsSearchQuery,
  useGetItemQuery,
  useGetItemsQuery,
  useGetNameQuery,
  useGetRelatedListsQuery,
  useGetSearchRelationshipQuery,
  useGetStatsQuery,
  useGetTimelineQuery,
  useSearchQuery,
  useCreateCollectionMutation,
  useAddToCollectionMutation,
  useEditCollectionNamesMutation,
  useEditDefaultCollectionMutation,
  useEditCollectionIdentifiersMutation,
  useEditCollectionWebpagesMutation,
  useEditCollectionNotesMutation,
  useDeleteRecordsFromCollectionMutation,
  useDeleteCollectionMutation,
} = mlApi
