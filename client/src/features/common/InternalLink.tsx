import React, { type JSX } from 'react'
import { Link } from 'react-router-dom'

import { pushClientEvent } from '../../lib/pushClientEvent'

interface ILinkParams {
  uri: string
  linkCategory: string
  name?: string
  children?: JSX.Element
}

const InternalLink: React.FC<ILinkParams> = ({
  uri,
  name,
  linkCategory,
  children,
}) => (
  <Link
    to={uri}
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
