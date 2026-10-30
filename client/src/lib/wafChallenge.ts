/**
 * AWS WAF silent challenge integration. Disabled unless useWafChallenge is
 * true. Configuration problems are logged and leave verification disabled;
 * only runtime verification failures (after one retry) show the failure UI.
 * No token is sent to an unlisted origin.
 */
export interface IWafEnv {
  useWafChallenge: boolean
  wafChallengeScriptUrl: string
  wafContactUrl: string
  /** Comma-separated cross-origin API origins; same-origin is automatic. */
  wafProtectedOrigins: string
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
let protectedOrigins: string[] = []
let initialization: Promise<void> | undefined
let pendingToken: Promise<string> | undefined
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

function parseOrigins(value: string): string[] {
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .flatMap((entry) => {
      try {
        return [new URL(entry).origin]
      } catch {
        console.warn(`Ignoring invalid WAF protected origin: ${entry}`)
        return []
      }
    })
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

/** Single-flight acquisition; the AWS SDK also refreshes expired tokens. */
function acquireToken(forceRefresh: boolean): Promise<string> {
  if (!pendingToken) {
    pendingToken = withTimeout(
      Promise.resolve().then(async () => {
        const sdk = window.AwsWafIntegration
        if (!sdk) throw new WafChallengeError()
        if (forceRefresh && sdk.forceRefreshToken) await sdk.forceRefreshToken()
        return sdk.getToken()
      }),
      TOKEN_TIMEOUT_MS,
    )
      .then((token) => {
        if (!token) throw new WafChallengeError()
        return token
      })
      .finally(() => {
        pendingToken = undefined
      })
  }
  return pendingToken
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
      protectedOrigins = parseOrigins(env.wafProtectedOrigins)
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

export function isWafProtectedUrl(url: string): boolean {
  const target = new URL(url, window.location.href)
  return (
    target.origin === window.location.origin ||
    protectedOrigins.includes(target.origin)
  )
}

/** Does not mistake other HTTP 202 responses, 403s, or errors for challenges. */
export const isWafChallenge = (status: number, action: unknown): boolean =>
  status === 202 && action === 'challenge'

type AttemptOutcome<T> =
  | { kind: 'ok'; result: T }
  | { kind: 'challenge' }
  | { kind: 'networkError'; error: unknown }

/**
 * Runs a request with a WAF token, refreshing the token and retrying once if
 * the token can't be obtained or the response is a challenge. Cross-origin
 * challenge responses usually lack CORS headers and surface as network
 * errors, so those are retried too but reported as ordinary errors.
 */
export async function withWafRetry<T>(
  url: string,
  attempt: (token: string | undefined) => Promise<T>,
  isChallenge: (result: T) => boolean,
  isNetworkError: (error: unknown) => boolean,
): Promise<T> {
  await initialization
  if (failed) throw new WafChallengeError()
  if (!enabled || !isWafProtectedUrl(url)) return attempt(undefined)
  const crossOrigin =
    new URL(url, window.location.href).origin !== window.location.origin

  const run = async (forceRefresh: boolean): Promise<AttemptOutcome<T>> => {
    let token: string | undefined
    try {
      token = await getWafToken(forceRefresh)
    } catch {
      return { kind: 'challenge' }
    }
    try {
      const result = await attempt(token)
      return isChallenge(result)
        ? { kind: 'challenge' }
        : { kind: 'ok', result }
    } catch (error) {
      if (crossOrigin && isNetworkError(error))
        return { kind: 'networkError', error }
      throw error
    }
  }

  const first = await run(false)
  if (first.kind === 'ok') return first.result
  const second = await run(true)
  if (second.kind === 'ok') return second.result
  if (second.kind === 'networkError') throw second.error
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
    (error) => error instanceof TypeError,
  )
}
