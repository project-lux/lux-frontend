import { AuthContextProps } from 'react-oidc-context'

import { getDataApiBaseUrl } from '../../config/config'
import { useGetItemQuery } from '../../redux/api/ml_api'
import { apiText, stripYaleIdPrefix } from '../parse/data/helper'

interface IApiTextInput {
  textOrUri: string // the text or uri to be transformed to text
  pageUri: string // the uri of the current page
  auth: AuthContextProps
  filterByAatValue?: string // optional; the AAT to filter by
}

interface IApiTextOutput {
  value: string | null
  isReady: boolean
}

export default function useApiText(input: IApiTextInput): IApiTextOutput {
  const result: IApiTextOutput = {
    value: null,
    isReady: false,
  }
  // Do not cache data locally if authenticated
  const forceRefetch = input.auth.isAuthenticated

  const containsBaseUrl = input.textOrUri.includes(getDataApiBaseUrl())
  const uri = stripYaleIdPrefix(input.textOrUri)

  const { data, isSuccess, isError } = useGetItemQuery(
    { uri, profile: 'results' },
    {
      skip: input.auth.isLoading === true || !containsBaseUrl,
      forceRefetch,
    },
  )

  if (isSuccess && data) {
    result.value = apiText(data, input.pageUri, input.filterByAatValue)
  }

  if (!containsBaseUrl) {
    result.value = input.textOrUri
  }

  if (isSuccess || isError || !containsBaseUrl) {
    result.isReady = true
  }

  if (isError) {
    console.error(
      `Error useApiText retrieving data for uri: ${uri} on page: ${input.pageUri}`,
    )
  }

  return result
}
