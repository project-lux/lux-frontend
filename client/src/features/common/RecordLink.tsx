/* eslint-disable react/require-default-props */
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import { useGetNameQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'

interface ISearchData {
  url: string
  returns404?: (x: boolean) => void
  className?: string
}

const RecordLink: React.FC<ISearchData> = ({ url, returns404, className }) => {
  const { pathname, search } = useLocation()
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
          state={{ prevPath: `${pathname}${search}`, targetName: name }}
          aria-label={name}
          className={className || ''}
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
