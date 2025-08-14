import { isUndefined } from 'lodash'

import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import useAuthentication from '../../lib/hooks/useAuthentication'

/**
 * Retrieves the current user's data and their default collection
 * @param {string} userUuid optional; the uri of the data to be retrieved
 * @returns {JSX.Element}
 */
const DefaultCollection = (userUuid?: string): string | null => {
  const auth = useAuthentication()
  const forceRefetch = auth.isAuthenticated

  const { data, isSuccess } = useGetItemQuery(
    { uri: stripYaleIdPrefix(userUuid as string) },
    { skip: isUndefined(userUuid), forceRefetch },
  )

  // set the user's default collection
  if (isSuccess && data) {
    return data._lux_default_collection
  }

  return null
}

export default DefaultCollection
