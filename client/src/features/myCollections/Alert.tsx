import React from 'react'
import { Alert } from 'react-bootstrap'

const MyCollectionsAlert: React.FC<{
  variant: string
  message: string
  handleOnClose: (x: {
    show: boolean
    message: string
    variant: 'primary' | 'danger'
  }) => void
}> = ({ variant, message, handleOnClose }) => (
  <Alert
    variant={variant}
    onClose={() =>
      handleOnClose({
        show: false,
        message: '',
        variant: 'primary',
      })
    }
    dismissible
    style={{ position: 'absolute', top: '6rem', right: '1rem', zIndex: 999 }}
    data-testid="my-collections-actions-alert"
  >
    {message}
  </Alert>
)

export default MyCollectionsAlert
