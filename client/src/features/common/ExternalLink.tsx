/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import StyledExternalLinkIcon from '../../styles/features/common/ExternalLinkIcon'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

interface IExternalUrl {
  url: string
  name: string
  style?: Record<string, string>
  id?: string
}

/**
 * Renders a link that leads to user outside of LUX
 * @param {string} url the target url
 * @param {string} name link text
 * @param {any} style optional; React style object for customizing the link style
 * @returns {JSX.Element}
 */
const ExternalLink: React.FC<IExternalUrl> = ({ url, name, style, id }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    style={{ ...style, overflowWrap: 'break-word' }}
    onClick={() =>
      pushSiteImproveEvent('External Link', 'Selected', `External ${name}`)
    }
    data-testid={id ? `${id}-external-link` : 'external-link'}
  >
    {name}
    <StyledExternalLinkIcon
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-box-arrow-up-right"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"
      />
      <path
        fillRule="evenodd"
        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"
      />
    </StyledExternalLinkIcon>
  </a>
)

export default ExternalLink
