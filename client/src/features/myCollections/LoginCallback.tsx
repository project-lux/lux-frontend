import * as React from 'react'
import { useAuth } from 'react-oidc-context'

const Callback: React.FC = () => {
  const { signinRedirect } = useAuth()

  React.useEffect(() => {
    signinRedirect()
  }, [signinRedirect])

  return <span>Login loading</span>
}

export default Callback
