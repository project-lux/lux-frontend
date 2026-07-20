import React, { useState } from 'react'
import { Alert } from 'react-bootstrap'

/**
 * Alert component that uses localStorage to track whether or not the alert has been dismissed by the user.
 * @returns {JSX.Element}
 */
const MobileAlert: React.FC = () => {
  const [closed, setIsClosed] = useState(() => {
    const alertClosed = localStorage.getItem('mobileAlertClosed')
    return alertClosed ? JSON.parse(alertClosed) : false
  })

  if (!closed) {
    return (
      <Alert
        dismissible
        variant="warning"
        className="d-flex justify-content-center mb-0"
        onClose={() => {
          setIsClosed(true)
          localStorage.setItem('mobileAlertClosed', 'true') // Saves data LAST
        }}
      >
        The Advanced Search feature is unavailable at this screen width.
      </Alert>
    )
  }

  return null
}

export default MobileAlert
