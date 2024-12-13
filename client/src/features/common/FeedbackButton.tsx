import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import config from '../../config/config'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { pushClientEvent } from '../../lib/pushClientEvent'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'

import ExternalLink from './ExternalLink'

interface IEntityPageBoolean {
  linkName?: string
}

const FeedbackButton: React.FC<IEntityPageBoolean> = ({ linkName }) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const { pathname, search } = useLocation()
  const currentURL = encodeURIComponent(
    `${config.env.dataApiBaseUrl}${pathname.substring(1)}${search}`,
  )

  useResizeableWindow(setIsMobile)

  // This should only appear on non-entity pages sich as landing page, results, etc
  if (linkName !== undefined) {
    return (
      <ExternalLink
        url={`${config.env.luxFeedbackUrl}${currentURL}`}
        name={linkName}
        id="feedback"
      />
    )
  }

  // This should appear on entity pages
  return (
    <div className="mt-1 mb-3">
      <PrimaryButton
        href={`${config.env.luxFeedbackUrl}${currentURL}`}
        type="button"
        value="feedback"
        aria-label="Submit feedback about this record"
        className="feedbackButton w-100"
        target="_blank"
        data-testid="submit-feedback-button"
        onClick={() =>
          pushClientEvent(
            'External Link',
            'Selected',
            'External Submit feedback about this record',
          )
        }
      >
        {isMobile ? 'Give feedback' : 'Submit feedback about this record'}
        <i className="bi bi-box-arrow-up-right ms-1" />
      </PrimaryButton>
    </div>
  )
}

export default FeedbackButton
