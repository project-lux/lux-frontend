/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react'

import { ICreateCollectionFormData } from '../../types/myCollections/ICreateCollectionFormData'
import { IDeleteCollection } from '../../types/myCollections/IDeleteCollection'
import { getDataApiBaseUrl } from '../../config/config'
import { createCollectionObject } from '../../lib/myCollections/createCollection'
import { getHeaders } from '../../lib/util/fetchWithToken'

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
          url: 'data/',
          method: 'POST',
          body: collection,
          headers: getHeaders(),
        }
      },
    }),
    deleteCollection: builder.mutation<any, IDeleteCollection>({
      query: (collectionData) => {
        const { type, id } = collectionData
        return {
          url: `api/data/${type}/${id}`,
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const { useCreateCollectionMutation } = mlMyCollectionsApi
