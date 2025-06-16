import config from '../../config/config'

export function fetchWithToken(uri: string): Promise<Response> {
  if (config.env.featureMyCollections && config.currentAccessToken) {
    const headers = new Headers()

    headers.append('Authorization', `Bearer ${config.currentAccessToken}`)

    return fetch(uri, {
      method: 'GET',
      headers,
    })
  }
  return fetch(uri)
}
