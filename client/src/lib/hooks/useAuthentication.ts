import { useAuth } from 'react-oidc-context'

import config from '../../config/config'
import { verifyToken } from '../auth/helper'

export default function useAuthentication(): AuthContextProps {
  const auth = useAuth()

  if (config.env.featureMyCollections) {
    if (auth.isAuthenticated) {
      // console.log('Authenticated', auth.user)
      if (auth.user) {
        config.currentAccessToken = auth.user.access_token
      }
      verifyToken(auth.user?.access_token || '')
    } else {
      // console.log('Not authenticated')
    }
  }
  return auth
}
