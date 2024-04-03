/* eslint-disable react/require-default-props */
import React from 'react'
import { Link } from 'react-router-dom'

import { useGetNameQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface ISearchData {
  url: string
  linkCategory?: string
  returns404?: (x: boolean) => void
  className?: string
}

const RecordLink: React.FC<ISearchData> = ({
  url,
  linkCategory,
  returns404,
  className,
}) => {
  const skip = url === undefined
  const strippedUrl = !skip ? stripYaleIdPrefix(url) : ''
  const { data, isSuccess, isLoading, isError } = useGetNameQuery(
    { uri: strippedUrl },
    { skip },
  )

  if (isSuccess && data) {
    const entity = new EntityParser(data)
    const name = entity.getPrimaryName(config.dc.langen)

    return (
      <React.Fragment>
        <Link
          to={{
            pathname: `/view/${strippedUrl}`,
          }}
          aria-label={name}
          className={className || ''}
          onClick={() =>
            pushSiteImproveEvent(
              'Entity Link',
              'Clicked',
              `${linkCategory !== undefined ? linkCategory : 'Entity'} Link`,
            )
          }
          data-testid="record-link"
        >
          {name.length > 200 ? `${name.slice(0, 200)}...` : name}
        </Link>
      </React.Fragment>
    )
  }

  // Only show this error in non-prod envs for debugging purposes
  if (isError) {
    if (returns404 !== undefined) {
      returns404(true)
    }

    if (!config.env.luxEnv.includes('production')) {
      return (
        <p className="mb-0" data-testid="record-link-error">
          Unable to retrieve info
        </p>
      )
    }
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  return null
}

export default RecordLink
