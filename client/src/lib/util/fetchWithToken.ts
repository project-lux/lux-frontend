import config from '../../config/config'

export const getHeaders = (): Headers => {
  const headers = new Headers()

  headers.append('Authorization', `Bearer ${config.currentAccessToken}`)

  return headers
}

export function fetchWithToken(uri: string): Promise<Response> {
  if (config.env.featureMyCollections && config.currentAccessToken) {
    return fetch(uri, {
      method: 'GET',
      headers: getHeaders(),
    })
  }
  return fetch(uri)
}
