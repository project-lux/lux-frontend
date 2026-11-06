import { wafFetch } from '../wafChallenge'

export function fetchWithToken(uri: string): Promise<Response> {
  return wafFetch(new URL(uri, window.location.href))
}
