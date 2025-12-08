import React, { useEffect } from 'react'
import type { FallbackProps } from 'react-error-boundary'

import StyledErrorFallback from '../../styles/features/error/ErrorFallback'
import FeedbackButton from '../common/FeedbackButton'
import { pushClientEvent } from '../../lib/pushClientEvent'

export const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  console.log('Caught at error boundary:', String(error))

  useEffect(() => {
    pushClientEvent('Error', 'Triggered', 'Error Boundary')
  }, [])

  return (
    <StyledErrorFallback>
      An error occurred rendering the component. Submit feedback about this
      issue <FeedbackButton linkName="here" />.
    </StyledErrorFallback>
  )
}
