import { useLocation } from 'react-router-dom'

import config, { getDataApiBaseUrl } from '../../config/config'
import EntityParser from '../../lib/parse/data/EntityParser'
import {
  stripYaleIdPrefix,
  getLabelBasedOnEntityType,
} from '../../lib/parse/data/helper'
import { useGetNameQuery } from '../../redux/api/ml_api'

/**
 * Retrieves and transforms an individual data point's primary name
 * @param {string} value the uri of the data to be retrieved
 * @returns {JSX.Element}
 */
const ApiText = (value: string): string | null => {
  const { pathname } = useLocation()
  // eslint-disable-next-line react/destructuring-assignment
  const containsBaseUrl = value.includes(getDataApiBaseUrl())
  const isPreferredTerm = value === config.dc.primaryName
  const isEmpty = value === ''
  const uri = stripYaleIdPrefix(value)
  // Only retrieve the data if it contains the base url, it is not defined as a preferred term, and the value is not empty
  const { data, isSuccess } = useGetNameQuery(
    { uri },
    { skip: !containsBaseUrl || isPreferredTerm || isEmpty },
  )

  if (isSuccess && data) {
    const elem = new EntityParser(data)
    const primaryName = elem.getPrimaryName(config.dc.langen)

    return primaryName
  }

  if (isPreferredTerm) {
    return getLabelBasedOnEntityType(pathname)
  }

  if (!containsBaseUrl) {
    return value
  }

  return null
}

export default ApiText
