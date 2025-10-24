import React, { type JSX } from 'react'
import { useAuth } from 'react-oidc-context'

import ErrorPage from '../error/ErrorPage'

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isAuthenticated, signinRedirect } = useAuth()

  React.useEffect(() => {
    if (!isAuthenticated) {
      signinRedirect()
    }
  }, [signinRedirect, isAuthenticated])

  return isAuthenticated ? children : <ErrorPage code={401} />
}

export default PrivateRoute
