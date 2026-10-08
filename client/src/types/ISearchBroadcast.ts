import { ISearchParams } from './IMlApiParams'

/**
 * Message type an embedding page (or opener) sends to LUX to opt in to
 * search broadcasts. The sender's origin must appear in the
 * BROADCAST_SEARCH_ALLOWED_ORIGINS allowlist or the request is ignored.
 */
export const BROADCAST_SEARCH_REQUEST_TYPE = 'BROADCAST_SEARCH'

/** Message type LUX posts back for every `search` endpoint call. */
export const BROADCAST_SEARCH_MESSAGE_TYPE = 'LUX_SEARCH'

export interface ISearchBroadcastMessage {
  type: typeof BROADCAST_SEARCH_MESSAGE_TYPE
  /** The parameters the search was requested with. */
  params: ISearchParams
  /** Relative request URL, e.g. `api/search/item?q=...` */
  url: string
  /** `url` prefixed with the resolved data API base URL. */
  absoluteUrl: string
  timestamp: number
}
