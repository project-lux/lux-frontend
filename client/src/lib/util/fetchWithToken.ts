import config from '../../config/config'

export const getHeaders = (token?: string): Headers => {
  if (config.env.featureMyCollections && (config.currentAccessToken || token)) {
    const headers = new Headers()

    headers.append(
      'Authorization',
      `Bearer ${config.currentAccessToken || token}`,
    )

    return headers
  }

  return new Headers()
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

export function deleteWithToken(uri: string): Promise<Response> {
  if (config.env.featureMyCollections && config.currentAccessToken) {
    return fetch(uri, {
      method: 'DELETE',
      headers: getHeaders(),
    })
  }
  return fetch(uri)
}
