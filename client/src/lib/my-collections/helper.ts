import type { AuthContextProps } from 'react-oidc-context'

import config from '../../config/config'

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

export function listCollections(p: AuthContextProps): void {
  if (!p.isAuthenticated) {
    // eslint-disable-next-line no-alert
    alert('User is not logged in.')
    return
  }

  const url = `${config.env.myCollectionsUri}/api/collections`

  fetch(url, { headers: { Authorization: `Bearer ${p.user?.access_token}` } })
    .then((response): void => {
      if (response.ok) {
        response.json().then((collections): void => {
          console.log('collections:', collections)
          // eslint-disable-next-line no-alert
          alert(JSON.stringify(collections, null, 2))
        })
      } else {
        console.error(`status code: ${response.status}`)
      }
    })
    .catch((error): void => {
      console.error(`Error fetching collections from ${url}: ${error}`)
    })
}
