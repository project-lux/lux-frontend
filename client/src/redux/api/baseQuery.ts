import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

import {
  checkWafResponse,
  getWafToken,
  isWafProtectedUrl,
} from '../../lib/wafChallenge'

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
      const targetUrl = baseUrl + url
      const token = isWafProtectedUrl(targetUrl)
        ? await getWafToken()
        : undefined
      const result = await axios({
        headers: token ? { 'x-aws-waf-token': token } : undefined,
        url: baseUrl + url,
        method,
        data,
        params,
      })
      checkWafResponse(
        result.status,
        result.headers['x-amzn-waf-action'] ?? null,
      )
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
