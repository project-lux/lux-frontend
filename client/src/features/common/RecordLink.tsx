/* eslint-disable react/require-default-props */
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useGetNameQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import { pushClientEvent } from '../../lib/pushClientEvent'

interface ISearchData {
  url: string
  linkCategory?: string
  returns404?: (x: boolean) => void
  className?: string
  name?: string
  ariaRoleDescription?: string
}

const StyledLink = styled(Link)`
  &.active {
    font-weight: 500;
    text-decoration: underline;
  }
`

const RecordLink: React.FC<ISearchData> = ({
  url,
  linkCategory,
  returns404,
  className,
  name,
  ariaRoleDescription = 'link',
}) => {
  const skip = url === undefined || name !== undefined
  const strippedUrl = url !== undefined ? stripYaleIdPrefix(url) : ''
  const { data, isSuccess, isLoading, isError } = useGetNameQuery(
    { uri: strippedUrl },
    { skip },
  )

  let entityName = name !== undefined ? name : ''
  // Get the name of the entity if the name query was called
  if (isSuccess && data && entityName === '') {
    const entity = new EntityParser(data)
    entityName = entity.getPrimaryName(config.aat.langen)
  }

  if ((isSuccess && data) || entityName !== '') {
    return (
      <StyledLink
        to={{
          pathname: `/view/${strippedUrl}`,
        }}
        state={{ targetName: entityName }}
        aria-label={entityName}
        role={ariaRoleDescription}
        className={className || ''}
        onClick={() =>
          pushClientEvent(
            'Entity Link',
            'Selected',
            `${linkCategory !== undefined ? linkCategory : 'Entity'} Link`,
          )
        }
        data-testid={`${strippedUrl}-record-link`}
      >
        {entityName.length > 200
          ? `${entityName.slice(0, 200)}...`
          : entityName}
      </StyledLink>
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
