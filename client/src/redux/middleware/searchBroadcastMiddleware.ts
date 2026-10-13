/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Middleware } from '@reduxjs/toolkit'

import { broadcastSearchRequest } from '../../lib/searchBroadcast'
import { mlApi } from '../api/ml_api'

/**
 * True when RTK Query has just been asked for the `search` endpoint, whether
 * or not that results in a network request.
 *
 * - fresh fetch -> `mlApi/executeQuery/pending`
 * - cache hit   -> `mlApi/executeQuery/rejected` with `meta.condition === true`
 *
 * The cache-hit case works because RTK Query builds its query thunk with
 * `dispatchConditionRejection: true`, so a thunk skipped by the thunk's
 * `condition` still dispatches a rejected action carrying the full `meta.arg`.
 * That is the one RTK internal this relies on -- check it on a major upgrade.
 *
 * A genuine network failure also dispatches `rejected`, but without
 * `meta.condition`, so it does not broadcast.
 */
const isSearchRequested = (action: any): boolean => {
  if (mlApi.endpoints.search.matchPending(action)) {
    return true
  }
  if (mlApi.endpoints.search.matchRejected(action)) {
    return action.meta?.condition === true
  }
  return false
}

export const searchBroadcastMiddleware: Middleware =
  () => (next) => (action) => {
    // Update the store first so a broadcast never precedes the state it
    // describes.
    const result = next(action)

    if (isSearchRequested(action)) {
      const { originalArgs, queryCacheKey } = (action as any).meta.arg
      broadcastSearchRequest(originalArgs, queryCacheKey)
    }

    return result
  }
