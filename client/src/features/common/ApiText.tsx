import { useLocation } from 'react-router-dom'

import config, { getDataApiBaseUrl } from '../../config/config'
import EntityParser from '../../lib/parse/data/EntityParser'
import {
  stripYaleIdPrefix,
  getLabelBasedOnEntityType,
} from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import useAuthentication from '../../lib/hooks/useAuthentication'

/**
 * Retrieves and transforms an individual data point's primary name
 * @param {string} value the uri of the data to be retrieved
 * @param {string} filterByAatValue optional; the AAT to filter by
 * @returns {JSX.Element}
 */
const ApiText = (value: string, filterByAatValue?: string): string | null => {
  const auth = useAuthentication()
  const forceRefetch = auth.isAuthenticated
  const { pathname } = useLocation()

  const containsBaseUrl = value.includes(getDataApiBaseUrl())
  const isEmpty = value === ''
  const uri = stripYaleIdPrefix(value)
  // Only retrieve the data if it contains the base url, it is not defined as a preferred term, and the value is not empty
  const { data, isSuccess } = useGetItemQuery(
    { uri, profile: 'results' },
    {
      skip: auth.isLoading === true || !containsBaseUrl || isEmpty,
      forceRefetch,
    },
  )

  if (isSuccess && data) {
    const elem = new EntityParser(data)
    const equivalent = elem.getEquivalent()
    // if primary name, return the correct text to be rendered
    if (equivalent.includes(config.aat.primaryName)) {
      return getLabelBasedOnEntityType(pathname)
    }
    if (filterByAatValue !== undefined) {
      if (equivalent.includes(filterByAatValue)) {
        return null
      }
    }
    const primaryName = elem.getPrimaryName(config.aat.langen)
    return primaryName
  }

  if (!containsBaseUrl) {
    return value
  }

  return null
}

export default ApiText
