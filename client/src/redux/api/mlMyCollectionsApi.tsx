/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'

import { ICreateCollectionFormData } from '../../types/myCollections/ICreateCollectionFormData'
import { getDataApiBaseUrl } from '../../config/config'
import { createCollectionObject } from '../../lib/myCollections/createCollection'

import { baseQuery } from './baseQuery'

export const mlMyCollectionsApi: any = createApi({
  reducerPath: 'mlMyCollectionsApi',
  baseQuery: baseQuery(getDataApiBaseUrl),
  endpoints: (builder) => ({
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
          url: 'api/data/',
          method: 'POST',
          body: collection,
        }
      },
    }),
  }),
})

export const { useCreateCollectionMutation } = mlMyCollectionsApi
