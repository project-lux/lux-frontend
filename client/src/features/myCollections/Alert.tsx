import React from 'react'
import { Alert } from 'react-bootstrap'

import { IRouteState } from '../../types/myCollections/IRouteState'

const MyCollectionsAlert: React.FC<{
  variant: string
  message: string
  handleOnClose: (x: IRouteState) => void
}> = ({ variant, message, handleOnClose }) => (
  <Alert
    variant={variant}
    onClose={() =>
      handleOnClose({
        showAlert: false,
        alertMessage: '',
        alertVariant: 'primary',
      })
    }
    dismissible
    style={{ position: 'absolute', top: '6rem', right: '1rem', zIndex: 999 }}
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

export default MyCollectionsAlert
