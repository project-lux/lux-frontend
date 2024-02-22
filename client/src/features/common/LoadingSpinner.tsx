import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner: React.FC<{ size?: 'sm' }> = ({ size }) => (
  <Spinner
    animation="border"
    role="status"
    size={size}
    data-testid="loading-spinner"
  >
    <span className="visually-hidden">Loading...</span>
  </Spinner>
)

export default LoadingSpinner
