/**
 * Search broadcasting.
 *
 * An embedding page (or an opener) posts `{ type: 'BROADCAST_SEARCH' }` to the
 * LUX window. If its origin is in the BROADCAST_SEARCH_ALLOWED_ORIGINS
 * allowlist, every subsequent call to the mlApi `search` endpoint is posted
 * back to that window as a `LUX_SEARCH` message carrying the search params.
 *
 * The protocol is one-way: there is no acknowledgement and no way to turn
 * broadcasting off short of reloading the page.
 */
import config, { getDataApiBaseUrl } from '../config/config'
import { ISearchParams } from '../types/IMlApiParams'
import {
  BROADCAST_SEARCH_MESSAGE_TYPE,
  BROADCAST_SEARCH_REQUEST_TYPE,
  ISearchBroadcastMessage,
} from '../types/ISearchBroadcast'

import { buildSearchRequestUrl } from './parse/search/buildSearchUrl'

/** Origins permitted to receive broadcasts. Empty means the feature is off. */
let allowedOrigins: Array<string> = []

/** True once the env-sourced allowlist has been applied. */
let allowlistApplied = false

/** Requests that arrived before the allowlist was available. */
let bufferedRequests: Array<{ origin: string; source: Window }> = []

/** The single validated requester, or null. */
let target: { origin: string; window: Window } | null = null

/** queryCacheKey -> last broadcast time, to collapse duplicate dispatches. */
const lastBroadcastByKey = new Map<string, number>()

const DUPLICATE_WINDOW_MS = 500
const MAX_BUFFERED_REQUESTS = 5
const MAX_TRACKED_KEYS = 50

const warn = (message: string): void => {
  if (!config.env.luxEnv.includes('production')) {
    console.warn(`[searchBroadcast] ${message}`)
  }
}

/**
 * Parses the comma-separated allowlist into canonical serialized origins.
 *
 * `new URL(entry).origin` applies the browser's own origin serialization --
 * lowercased scheme and host, default port dropped, path and trailing slash
 * discarded. That is the same serialization used to produce
 * `MessageEvent.origin`, so validation can be a plain equality check.
 *
 * Note that a path on an entry is discarded, meaning such an entry authorizes
 * the whole origin. Wildcards are rejected outright.
 */
export const parseAllowedOrigins = (raw: string): Array<string> => {
  const origins = new Set<string>()

  raw
    .split(',')
    .map((entry) => entry.trim())
    .filter((entry) => entry !== '')
    .forEach((entry) => {
      if (entry.includes('*')) {
        warn(`wildcard origins are not supported, ignoring "${entry}"`)
        return
      }
      try {
        const { origin } = new URL(entry)
        if (origin === 'null') {
          warn(`opaque origin is not allowed, ignoring "${entry}"`)
          return
        }
        origins.add(origin)
      } catch {
        warn(`could not parse origin, ignoring "${entry}"`)
      }
    })

  return Array.from(origins)
}

/**
 * Narrows a message source to a Window. MessagePort and ServiceWorker also
 * have postMessage, but only a WindowProxy exposes `closed` -- one of the few
 * properties readable on a cross-origin window.
 */
const isWindowSource = (source: MessageEventSource | null): source is Window =>
  source !== null && 'postMessage' in source && 'closed' in source

const registerTarget = (origin: string, source: Window): void => {
  if (allowedOrigins.length === 0) {
    console.warn(
      `LUX [searchBroadcast] no allowed origins configured, ignoring "${origin}"`,
    )
    return
  }
  if (!allowedOrigins.includes(origin)) {
    // Deliberately silent: replying would confirm to a caller whether an
    // origin is allowlisted.
    console.warn(
      `LUX [searchBroadcast] rejected BROADCAST_SEARCH from disallowed origin "${origin}"`,
    )
    warn(`rejected BROADCAST_SEARCH from disallowed origin "${origin}"`)
    return
  }

  console.log(`LUX [searchBroadcast] registering target for origin "${origin}"`)
  target = { origin, window: source }
}

export const handleBroadcastSearchMessage = (event: MessageEvent): void => {
  const { data, origin, source } = event
  console.dir(
    { LUX_POST_MESSAGE_RECEIVED: { data, origin, source } },
    { depth: null },
  )

  if (data === null || typeof data !== 'object') {
    return
  }
  if ((data as { type?: unknown }).type !== BROADCAST_SEARCH_REQUEST_TYPE) {
    return
  }
  if (!isWindowSource(source)) {
    warn('BROADCAST_SEARCH had no usable window source, ignoring')
    return
  }

  // The embedder may post before GET /env resolves. Hold the request and
  // validate it once the real allowlist is known.
  if (!allowlistApplied) {
    if (bufferedRequests.length < MAX_BUFFERED_REQUESTS) {
      bufferedRequests.push({ origin, source })
    }
    return
  }

  registerTarget(origin, source)
}

/**
 * Installs the message listener. Called at module scope before React renders
 * so a request sent immediately after load is not missed.
 */
export const installSearchBroadcastListener = (): void => {
  window.addEventListener('message', handleBroadcastSearchMessage)
}

/**
 * Applies the env-sourced allowlist and validates anything buffered while the
 * configuration was still loading. Idempotent.
 */
export const activateSearchBroadcast = (): void => {
  allowedOrigins = parseAllowedOrigins(
    config.env.broadcastSearchAllowedOrigins || '',
  )
  allowlistApplied = true

  const buffered = bufferedRequests
  bufferedRequests = []
  buffered.forEach(({ origin, source }) => registerTarget(origin, source))
}

export const broadcastSearchRequest = (
  params: ISearchParams,
  queryCacheKey: string,
): void => {
  if (target === null || allowedOrigins.length === 0) {
    return
  }
  if (target.window.closed) {
    target = null
    return
  }

  const now = Date.now()
  const previous = lastBroadcastByKey.get(queryCacheKey)
  if (previous !== undefined && now - previous < DUPLICATE_WINDOW_MS) {
    return
  }
  if (lastBroadcastByKey.size > MAX_TRACKED_KEYS) {
    lastBroadcastByKey.clear()
  }
  lastBroadcastByKey.set(queryCacheKey, now)

  const url = buildSearchRequestUrl(params)
  const message: ISearchBroadcastMessage = {
    type: BROADCAST_SEARCH_MESSAGE_TYPE,
    params,
    url,
    absoluteUrl: `${getDataApiBaseUrl()}${url}`,
    timestamp: now,
  }

  try {
    // Never '*'. Posting to the validated origin means a window that has since
    // navigated elsewhere silently drops the message instead of receiving it.
    target.window.postMessage(message, target.origin)
  } catch (err) {
    warn(`postMessage failed, dropping target: ${String(err)}`)
    target = null
  }
}

/** Resets all module state. Intended for tests. */
export const resetSearchBroadcast = (): void => {
  window.removeEventListener('message', handleBroadcastSearchMessage)
  allowedOrigins = []
  allowlistApplied = false
  bufferedRequests = []
  target = null
  lastBroadcastByKey.clear()
}
