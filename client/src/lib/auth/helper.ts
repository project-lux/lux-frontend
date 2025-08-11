import * as jose from 'jose'
import type { AuthContextProps } from 'react-oidc-context'

import config, { getOidcJwksUri } from '../../config/config'

interface ITokenObject {
  [key: string]: string | number | Array<string>
}

export function onSignIn(): void {
  const url = new URL(window.location.href)
  url.searchParams.delete('code')
  url.searchParams.delete('state')
  window.history.replaceState({}, '', url.toString())
}

export function signout(auth: AuthContextProps | null): void {
  config.currentAccessToken = ''
  if (!auth) {
    return
  }
  auth.signoutRedirect({
    id_token_hint: auth.user?.id_token,
    extraQueryParams: {
      client_id: config.env.oidcClientId,
      logout_uri: config.env.oidcRedirectUri,
      response_type: 'code',
    },
  })
}

export async function verifyToken(token: string): Promise<ITokenObject> {
  try {
    const jwksUri = getOidcJwksUri()
    const jwks = jose.createRemoteJWKSet(new URL(jwksUri))

    const { payload } = await jose.jwtVerify(token, jwks, {})
    // console.log('raw token:', token)
    // console.log('parsed token:', payload, JSON.stringify(payload, null, 2))
    return payload as ITokenObject
  } catch (error) {
    console.error('Failed to verify token:', error)
    return {}
  }
}
