import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IServerConfig } from '../../config/IServerConfig'

export const configApi = createApi({
  reducerPath: 'configApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    getEnv: builder.query<IServerConfig, void>({
      query: () => ({
        url: 'env',
        method: 'GET',
      }),
      providesTags: [],
    }),
  }),
})

export const { useGetEnvQuery } = configApi
