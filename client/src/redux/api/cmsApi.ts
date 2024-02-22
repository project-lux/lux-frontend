import { createApi } from '@reduxjs/toolkit/query/react'

import { OverlayKey, overlays, PageKey, pagePaths } from '../../config/cms'
import { ICmsResponse } from '../../lib/parse/cms/Parser'
import { ICmsResponse as IFeaturedCollectionsResponse } from '../../lib/parse/cms/FeaturedCollectionParser'
import { getCmsApiBaseUrl } from '../../config/config'

import { baseQuery } from './baseQuery'
import { ICmsPage } from './returnTypes'

export interface IPageInput {
  pageKey: PageKey
}

export interface IResultsPageOverlay {
  overlay: OverlayKey
}

export interface IFaq {
  attributes: {
    title: string
    body: string
    field_faq_tag: string | Array<string>
    field_sort_weight: number
  }
}

export interface IFaqsResponse {
  data: IFaq[]
}

export const cmsApi = createApi({
  reducerPath: 'cmsApi',
  baseQuery: baseQuery(getCmsApiBaseUrl),
  tagTypes: [],
  endpoints: (builder) => ({
    getFaq: builder.query<IFaqsResponse, void>({
      query: () => ({
        url: 'node/faq?page[limit]=100',
        method: 'GET',
      }),
    }),
    getFeaturedCollections: builder.query<IFeaturedCollectionsResponse, void>({
      query: () => ({
        url: 'node/featured_block?page[limit]=100',
        method: 'GET',
      }),
    }),
    getLandingPage: builder.query<ICmsResponse, void>({
      query: () => ({
        url: 'node/landing_page',
        method: 'GET',
      }),
    }),
    getLandingPageImages: builder.query<ICmsResponse, void>({
      query: () => ({
        url: 'node/landing_page_image?page[limit]=100',
        method: 'GET',
      }),
    }),
    getPage: builder.query<ICmsPage, IPageInput>({
      query: (params) => ({
        url: pagePaths[params.pageKey],
        method: 'GET',
      }),
    }),
    getDescriptiveText: builder.query<ICmsPage, IResultsPageOverlay>({
      query: (params) => ({
        url: overlays[params.overlay],
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetFaqQuery,
  useGetFeaturedCollectionsQuery,
  useGetLandingPageQuery,
  useGetLandingPageImagesQuery,
  useGetPageQuery,
  useGetDescriptiveTextQuery,
} = cmsApi
