import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { AxiosRequestConfig, AxiosError } from 'axios'

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
    console.log('BASE')
    try {
      const baseUrl = getBaseUrl()
      const headers: { [key: string]: string } = {}

      console.log('xx headers:', headers)

      if (config.currentAccessToken) {
        headers.Authorization = `Bearer ${config.currentAccessToken}`
      }
      console.log('headers:', headers)
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
