import React from 'react'
import { Alert } from 'react-bootstrap'

const NoResultsAlert: React.FC<{
  message: string | null
  variant?: string
  className?: string
}> = ({ message, variant, className }) => (
  <Alert
    variant={variant || 'danger'}
    className={className || 'mt-2'}
    data-testid="results-error-alert"
  >
    {message || 'Your search yielded no results. Please try another search.'}
  </Alert>
)

export default NoResultsAlert
