/**
 * AWS WAF silent challenge integration. Disabled unless useWafChallenge is
 * true. Configuration problems are logged and leave verification disabled;
 * only runtime verification failures (after one retry) show the failure UI.
 * Tokens are only sent to this site's own origin; challenged APIs must be
 * served from it.
 */
export interface IWafEnv {
  useWafChallenge: boolean
  wafChallengeScriptUrl: string
  wafContactUrl: string
}

interface IWafIntegration {
  getToken: () => Promise<string>
  forceRefreshToken?: () => Promise<unknown>
}

declare global {
  // Browser API augmentation must use the platform name.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    AwsWafIntegration?: IWafIntegration
  }
}

const SCRIPT_TIMEOUT_MS = 10000
const TOKEN_TIMEOUT_MS = 10000

let enabled = false
let contactUrl = ''
let initialization: Promise<void> | undefined
let pendingToken: { forced: boolean; promise: Promise<string> } | undefined
let failed = false
const listeners = new Set<() => void>()

export const subscribeToWafFailure = (listener: () => void): (() => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
export const hasWafFailure = (): boolean => failed
export const getWafContactUrl = (): string => contactUrl

export class WafChallengeError extends Error {
  constructor() {
    super('Browser verification could not be completed.')
    this.name = 'WafChallengeError'
  }
}

function fail(): WafChallengeError {
  if (!failed) {
    failed = true
    listeners.forEach((listener) => listener())
  }
  return new WafChallengeError()
}

function withTimeout<T>(
  operation: Promise<T>,
  milliseconds: number,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(
      () => reject(new WafChallengeError()),
      milliseconds,
    )
    operation.then(
      (value) => {
        window.clearTimeout(timer)
        resolve(value)
      },
      (error) => {
        window.clearTimeout(timer)
        reject(error)
      },
    )
  })
}

function safeContactUrl(value: string): string {
  if (!value) {
    console.warn('WAF contact URL is not set; hiding the Contact us button.')
    return ''
  }
  try {
    const url = new URL(value, window.location.origin)
    if (['https:', 'mailto:'].includes(url.protocol)) return url.href
  } catch {
    // Reported below
  }
  console.warn(
    `Ignoring WAF contact URL that is not an https: or mailto: URL: ${value}`,
  )
  return ''
}

/** Only the AWS-issued integration script may execute in this page. */
function trustedScriptUrl(value: string): URL | undefined {
  try {
    const url = new URL(value)
    if (
      url.protocol === 'https:' &&
      url.hostname.endsWith('.awswaf.com') &&
      url.pathname.endsWith('/challenge.js')
    )
      return url
  } catch {
    // Reported below
  }
  return undefined
}

function loadScript(url: URL): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url.href
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new WafChallengeError())
    document.head.appendChild(script)
  })
}

/**
 * Single-flight acquisition; the AWS SDK also refreshes expired tokens. A
 * forced refresh never joins an unforced request, which could return the
 * token that was just challenged; it runs after that request settles.
 */
function acquireToken(forceRefresh: boolean): Promise<string> {
  if (pendingToken && (pendingToken.forced || !forceRefresh))
    return pendingToken.promise
  const previous = pendingToken?.promise.catch(() => undefined)
  const promise = Promise.resolve(previous)
    .then(() =>
      withTimeout(
        Promise.resolve().then(async () => {
          const sdk = window.AwsWafIntegration
          if (!sdk) throw new WafChallengeError()
          if (forceRefresh && sdk.forceRefreshToken)
            await sdk.forceRefreshToken()
          return sdk.getToken()
        }),
        TOKEN_TIMEOUT_MS,
      ),
    )
    .then((token) => {
      if (!token) throw new WafChallengeError()
      return token
    })
    .finally(() => {
      if (pendingToken?.promise === promise) pendingToken = undefined
    })
  pendingToken = { forced: forceRefresh, promise }
  return promise
}

/**
 * Starts verification once. Never rejects: failures are reported through
 * hasWafFailure/subscribeToWafFailure.
 */
export function initializeWafChallenge(env: IWafEnv): Promise<void> {
  if (!initialization) {
    initialization = (async () => {
      if (!env.useWafChallenge) return
      const scriptUrl = trustedScriptUrl(env.wafChallengeScriptUrl)
      if (!scriptUrl) {
        console.error(
          'WAF challenge is enabled but the script URL is missing or not an AWS challenge.js URL; continuing without verification.',
        )
        return
      }
      contactUrl = safeContactUrl(env.wafContactUrl)
      try {
        await withTimeout(loadScript(scriptUrl), SCRIPT_TIMEOUT_MS)
      } catch {
        fail()
        return
      }
      enabled = true
      // Prime a token for the first request; failures are retried on demand.
      await acquireToken(false).catch(() => undefined)
    })()
  }
  return initialization
}

/** Returns undefined when verification is disabled. */
export async function getWafToken(
  forceRefresh = false,
): Promise<string | undefined> {
  await initialization
  if (failed) throw new WafChallengeError()
  if (!enabled) return undefined
  return acquireToken(forceRefresh)
}

export const isWafProtectedUrl = (url: string): boolean =>
  new URL(url, window.location.href).origin === window.location.origin

/** Does not mistake other HTTP 202 responses, 403s, or errors for challenges. */
export const isWafChallenge = (status: number, action: unknown): boolean =>
  status === 202 && action === 'challenge'

/**
 * Runs a same-origin request with a WAF token, refreshing the token and
 * retrying once if the token can't be obtained or the response is a challenge.
 */
export async function withWafRetry<T>(
  url: string,
  attempt: (token: string | undefined) => Promise<T>,
  isChallenge: (result: T) => boolean,
): Promise<T> {
  await initialization
  if (!enabled || !isWafProtectedUrl(url)) return attempt(undefined)
  if (failed) throw new WafChallengeError()

  const run = async (forceRefresh: boolean): Promise<{ result: T } | null> => {
    let token: string
    try {
      token = await acquireToken(forceRefresh)
    } catch {
      return null
    }
    const result = await attempt(token)
    return isChallenge(result) ? null : { result }
  }

  const outcome = (await run(false)) ?? (await run(true))
  if (outcome) return outcome.result
  throw fail()
}

export function wafFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const request = new Request(input, init)
  return withWafRetry(
    request.url,
    (token) => {
      const attemptRequest = request.clone()
      if (token) attemptRequest.headers.set('x-aws-waf-token', token)
      return fetch(attemptRequest)
    },
    (response) =>
      isWafChallenge(
        response.status,
        response.headers.get('x-amzn-waf-action'),
      ),
  )
}
