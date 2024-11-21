import * as jose from 'jose'
import type { AuthContextProps } from 'react-oidc-context'

import config, { getOidcJwksUri } from '../../config/config'

interface ITokenObject {
  [key: string]: string | number | Array<string>
}

export function signout(auth: AuthContextProps | null): void {
  if (!auth) {
    return
  }

  auth.signoutRedirect({
    id_token_hint: auth.user?.id_token,
    extraQueryParams: {
      client_id: config.env.oidcClientId,
      redirect_uri: config.env.oidcRedirectUri,
      response_type: 'code',
    },
  })
}

export async function verifyToken(token: string): Promise<ITokenObject> {
  try {
    const jwksUri = getOidcJwksUri()
    console.log('Fetching JWKs from:', jwksUri)
    const jwks = jose.createRemoteJWKSet(new URL(jwksUri))

    const { payload } = await jose.jwtVerify(token, jwks, {})
    console.log('Verified token:', payload, JSON.stringify(payload, null, 2))
    return payload as ITokenObject
  } catch (error) {
    console.error('Failed to verify token:', error)
    return {}
  }
}
