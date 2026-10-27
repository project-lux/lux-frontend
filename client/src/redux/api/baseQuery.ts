import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios, { isAxiosError } from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'

import {
  isWafChallenge,
  WafChallengeError,
  withWafRetry,
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
      const targetUrl = getBaseUrl() + url
      const result = await withWafRetry(
        targetUrl,
        (token) =>
          axios({
            headers: token ? { 'x-aws-waf-token': token } : undefined,
            url: targetUrl,
            method,
            data,
            params,
          }),
        (response) =>
          isWafChallenge(
            response.status,
            response.headers['x-amzn-waf-action'],
          ),
        (error) => isAxiosError(error) && error.response === undefined,
      )
      return { data: result.data }
    } catch (axiosError) {
      if (axiosError instanceof WafChallengeError) {
        return { error: { status: 'WAF_CHALLENGE', data: axiosError.message } }
      }
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  }
