import config from '../../config/config'

export function fetchWithToken(uri: string): Promise<Response> {
  console.log('With token', config.currentAccessToken)
  if (config.env.featureMyCollections && config.currentAccessToken) {
    return fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${config.currentAccessToken}`,
      },
    })
  }
  return fetch(uri)
}
