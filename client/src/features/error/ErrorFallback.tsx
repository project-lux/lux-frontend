import React, { useEffect } from 'react'
import { FallbackProps } from 'react-error-boundary'

import StyledErrorFallback from '../../styles/features/error/ErrorFallback'
import FeedbackButton from '../common/FeedbackButton'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  console.log(String(error))

  useEffect(() => {
    pushSiteImproveEvent('Error', 'Triggered', 'Error Boundary')
  }, [])

  return (
    <StyledErrorFallback>
      An error occurred rendering the component. Submit feedback about this
      issue <FeedbackButton linkName="here" />.
    </StyledErrorFallback>
  )
}
