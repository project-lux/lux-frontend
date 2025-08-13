import React from 'react'
import { isNull } from 'lodash'

import { getFormattedDate } from '../../lib/myCollections/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import useAuthentication from '../../lib/hooks/useAuthentication'
import UserParser from '../../lib/parse/data/UserParser'

interface IProps {
  creationData: { creator: string | null; date: string | null }
  eventType: string
}

const Editor: React.FC<IProps> = ({ creationData, eventType }) => {
  const auth = useAuthentication()
  const forceRefetch = auth.isAuthenticated
  const { creator, date } = creationData
  const formattedDate = !isNull(date) ? getFormattedDate(date) : 'unknown date'
  // get the person record
  const { data, isSuccess } = useGetItemQuery(
    { uri: stripYaleIdPrefix(creator as string) },
    { skip: auth.isLoading === true || creator === null, forceRefetch },
  )

  let creatorName = 'unknown'
  if (isSuccess && data) {
    const editor = new UserParser(data)
    creatorName = editor.getUsername()
  }

  return (
    <p className="mb-0">
      <i>
        {eventType} By {creatorName} on {formattedDate}
      </i>
    </p>
  )
}

export default Editor
