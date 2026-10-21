import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { wafFetch } from '../../lib/wafChallenge'
import { IServerConfig } from '../../config/IServerConfig'

export const configApi = createApi({
  reducerPath: 'configApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    fetchFn: wafFetch,
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
