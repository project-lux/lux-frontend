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
  name?: string
}

const RecordLink: React.FC<ISearchData> = ({
  url,
  linkCategory,
  returns404,
  className,
  name,
}) => {
  const skip = url === undefined || name !== undefined
  const strippedUrl = url !== undefined ? stripYaleIdPrefix(url) : ''
  const { data, isSuccess, isLoading, isError } = useGetNameQuery(
    { uri: strippedUrl },
    { skip },
  )

  console.log(data, isError, isSuccess)
  let entityName = name !== undefined ? name : ''
  // Get the name of the entity if the name query was called
  if (isSuccess && data && entityName === '') {
    const entity = new EntityParser(data)
    entityName = entity.getPrimaryName(config.dc.langen)
  }

  if ((isSuccess && data) || entityName !== '') {
    return (
      <Link
        to={{
          pathname: `/view/${strippedUrl}`,
        }}
        aria-label={entityName}
        className={className || ''}
        onClick={() =>
          pushSiteImproveEvent(
            'Entity Link',
            'Selected',
            `${linkCategory !== undefined ? linkCategory : 'Entity'} Link`,
          )
        }
        data-testid="record-link"
      >
        {entityName.length > 200
          ? `${entityName.slice(0, 200)}...`
          : entityName}
      </Link>
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
