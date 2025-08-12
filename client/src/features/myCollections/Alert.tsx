import React from 'react'
import { Alert } from 'react-bootstrap'

import { IRouteState } from '../../types/myCollections/IRouteState'

const MyCollectionsAlert: React.FC<{
  variant: string
  message: string
  handleOnClose: (x: IRouteState) => void
}> = ({ variant, message, handleOnClose }) => {
  const handleCloseAlert = (): void => {
    handleOnClose({
      showAlert: false,
      alertMessage: '',
      alertVariant: 'primary',
    })
    // Clear the location state so that the alert will not reappear on page refresh
    window.history.replaceState({}, '')
  }
  return (
    <Alert
      variant={variant}
      onClose={() => handleCloseAlert()}
      dismissible
      style={{ position: 'fixed', top: '6rem', right: '1rem', zIndex: 1000 }}
      data-testid="my-collections-actions-alert"
    >
      {variant === 'primary' ? (
        <i className="bi bi-check-circle" />
      ) : (
        <i className="bi bi-x-circle" />
      )}{' '}
      {message}
    </Alert>
  )
}

export default MyCollectionsAlert
