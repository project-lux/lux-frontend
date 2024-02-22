import React from 'react'
import { FallbackProps } from 'react-error-boundary'

import StyledErrorFallback from '../../styles/features/error/ErrorFallback'
import FeedbackButton from '../common/FeedbackButton'

export const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  console.log(String(error))

  return (
    <StyledErrorFallback>
      An error occurred rendering the component. Submit feedback about this
      issue <FeedbackButton linkName="here" />.
    </StyledErrorFallback>
  )
}
