import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface ILinkParams {
  uri: string
  name: string
  className?: string
  linkCategory?: string
}

const StyledLink = styled(Link)`
  &.active {
    font-weight: 500;
    text-decoration: underline;
  }
`

/* eslint-disable jsx-a11y/anchor-is-valid */
const InternalLink: React.FC<ILinkParams> = ({
  uri,
  name,
  className,
  linkCategory = 'Internal',
}) => (
  <StyledLink
    to={{
      pathname: `/view/${stripYaleIdPrefix(uri)}`,
    }}
    className={className || ''}
    onClick={() =>
      pushSiteImproveEvent('Entity Link', 'Selected', `${linkCategory} Link`)
    }
    data-testid="internal-link"
  >
    {name}
  </StyledLink>
)

export default InternalLink
