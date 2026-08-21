import { getDataApiBaseUrl } from '../../config/config'
import { useGetItemQuery } from '../../redux/api/ml_api'
import { apiText, stripYaleIdPrefix } from '../parse/data/helper'

interface IApiTextInput {
  textOrUri: string // the text or uri to be transformed to text
  pageUri: string // the uri of the current page
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

  const containsBaseUrl = input.textOrUri.includes(getDataApiBaseUrl())
  const uri = stripYaleIdPrefix(input.textOrUri)

  const { data, isSuccess, isError } = useGetItemQuery(
    { uri, profile: 'results' },
    {
      skip: !containsBaseUrl,
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
