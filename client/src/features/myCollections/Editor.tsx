import React from 'react'
import { useAuth } from 'react-oidc-context'
import { isNull } from 'lodash'

import { getFormattedDate } from '../../lib/myCollections/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import UserParser from '../../lib/parse/data/UserParser'

interface IProps {
  creationData: { creator: string | null; date: string | null }
  eventType?: string
  italics?: boolean
}

const Editor: React.FC<IProps> = ({
  creationData,
  eventType,
  italics = false,
}) => {
  const auth = useAuth()
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

  const text = `${eventType || ''} ${creatorName} on ${formattedDate}`
  return <p className="mb-0">{italics ? <i>{text}</i> : text}</p>
}

export default Editor
