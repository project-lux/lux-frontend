import React from 'react'

import { useGetItemQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import RecordLink from '../common/RecordLink'

interface ILinkData {
  uri: string
}

// Show an expandable list of links with a label in the left column
const DetailedLink: React.FC<ILinkData> = ({ uri }) => {
  const { data, isSuccess, isLoading, isError } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isError && !config.env.luxEnv.includes('production')) {
    return <p>Unable to retrieve entity.</p>
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isSuccess && data) {
    const element = new EntityParser(data)
    const primaryName = element.getPrimaryName(config.aat.langen)
    const [supertypeIcon, helperText] = element.getSupertypeIcon()

    return (
      <span>
        <img
          src={supertypeIcon}
          alt={`icon for ${helperText}`}
          id="icon"
          height={30}
          width={30}
          className="mx-2"
          data-testid="entity-icon-img"
        />
        <RecordLink url={uri} name={primaryName} linkCategory="Entity" />
      </span>
    )
  }

  return null
}

export default DetailedLink
