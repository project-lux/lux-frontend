import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useGetNameQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import { pushClientEvent } from '../../lib/pushClientEvent'
import theme from '../../styles/theme'

interface ISearchData {
  url: string
  linkCategory?: string
  returns404?: (x: boolean) => void
  className?: string
  name?: string
  ariaRoleDescription?: string
  style?: Record<string, string>
}

const StyledLink = styled(Link)`
  &.active {
    font-weight: 500;
    text-decoration: underline;
  }

  &.relatedListEntityTitle {
    font-size: 1.25em;
    font-weight: ${theme.font.weight.medium};
    margin-bottom: 0.5em;

    @media (min-width: ${theme.breakpoints.md}px) {
      font-size: 1em;
      font-weight: ${theme.font.weight.bold};
    }
  }
`

const RecordLink: React.FC<ISearchData> = ({
  url,
  linkCategory,
  returns404,
  className,
  name,
  ariaRoleDescription = 'link',
  style,
}) => {
  const skip = url === undefined || url === null || name !== undefined
  const strippedUrl =
    url !== undefined && url !== null ? stripYaleIdPrefix(url) : ''
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
        style={style}
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
