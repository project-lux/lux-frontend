import React from 'react'
import { Alert } from 'react-bootstrap'

const MyCollectionsAlert: React.FC<{
  variant: string
  message: string
}> = ({ variant, message }) => (
  <Alert
    variant={variant}
    style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999 }}
    data-testid="my-collections-actions-alert"
  >
    {message}
  </Alert>
)

export default MyCollectionsAlert
