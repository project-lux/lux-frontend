import React from 'react'
import { Link } from 'react-router-dom'

import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface ILinkParams {
  uri: string
  name?: string
  linkCategory?: string
  children?: JSX.Element
}

/* eslint-disable jsx-a11y/anchor-is-valid */
const InternalLink: React.FC<ILinkParams> = ({
  uri,
  name,
  linkCategory,
  children,
}) => {
  const eventText = linkCategory !== undefined ? linkCategory : name

  return (
    <Link
      to={uri}
      state={{
        targetName: name,
      }}
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
    </Link>
  )
}

export default InternalLink
