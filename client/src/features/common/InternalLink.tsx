import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface ILinkParams {
  uri: string
  name?: string
  className?: string
  linkCategory?: string
  children?: JSX.Element
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
  linkCategory,
  children,
}) => {
  const eventText = linkCategory !== undefined ? linkCategory : name

  return (
    <StyledLink
      to={uri}
      state={{
        targetName: name,
      }}
      className={className || ''}
      onClick={() =>
        pushSiteImproveEvent(
          'Internal Link',
          'Selected',
          `Internal ${eventText}`,
        )
      }
      data-testid="internal-link"
    >
      {name}
      {children}
    </StyledLink>
  )
}

export default InternalLink
