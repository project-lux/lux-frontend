import React from 'react'
import { Link } from 'react-router-dom'

import { pushClientEvent } from '../../lib/pushClientEvent'

interface ILinkParams {
  uri: string
  linkCategory: string
  name?: string
  children?: JSX.Element
}

/* eslint-disable jsx-a11y/anchor-is-valid */
const InternalLink: React.FC<ILinkParams> = ({
  uri,
  name,
  linkCategory,
  children,
}) => (
  <Link
    to={uri}
    state={{
      targetName: name,
    }}
    onClick={() =>
      pushClientEvent('Internal Link', 'Selected', `Internal ${linkCategory}`)
    }
    data-testid="internal-link"
  >
    {name}
    {children}
  </Link>
)

export default InternalLink
