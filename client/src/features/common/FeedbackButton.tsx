/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { useLocation } from 'react-router-dom'

import config from '../../config/config'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

import ExternalLink from './ExternalLink'

interface IEntityPageBoolean {
  linkName?: string
}

const FeedbackButton: React.FC<IEntityPageBoolean> = ({ linkName }) => {
  const { pathname, search } = useLocation()
  const currentURL = encodeURIComponent(
    `${config.env.dataApiBaseUrl}${pathname.substring(1)}${search}`,
  )

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
        type="link"
        value="feedback"
        aria-label="Submit feedback about this record"
        className="feedbackButton w-100"
        target="_blank"
        data-testid="submit-feedback-button"
        onClick={() =>
          pushSiteImproveEvent(
            'Submit Feedback',
            'Button Clicked',
            'Submit feedback about this record',
          )
        }
      >
        Submit feedback about this record
        <i className="bi bi-box-arrow-up-right ms-1" />
      </PrimaryButton>
    </div>
  )
}

export default FeedbackButton
