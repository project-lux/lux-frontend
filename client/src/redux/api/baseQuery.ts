import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

import config from '../../config/config'

export const baseQuery =
  (
    getBaseUrl: () => string,
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const baseUrl = getBaseUrl()
      const headers: { [key: string]: string } = {}

      if (config.currentAccessToken) {
        headers.Authorization = `Bearer ${config.currentAccessToken}`
      }
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        headers,
        params,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
