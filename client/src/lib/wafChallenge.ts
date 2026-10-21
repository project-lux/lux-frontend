/** AWS WAF silent challenge integration. No token is sent to an unlisted origin. */
export interface IWafSettings {
  challengeScriptUrl: string
  contactUrl: string
  protectedOrigins: string[]
}

interface IWafIntegration {
  getToken: () => Promise<string>
}

declare global {
  // Browser API augmentation must use the platform name.
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    AwsWafIntegration?: IWafIntegration
  }
}

let settings: IWafSettings = {
  challengeScriptUrl: '',
  contactUrl: '',
  protectedOrigins: [],
}
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
export const getWafContactUrl = (): string => settings.contactUrl

export class WafChallengeError extends Error {
  constructor() {
    super('Browser verification could not be completed.')
    this.name = 'WafChallengeError'
  }
}

function fail(): WafChallengeError {
  failed = true
  listeners.forEach((listener) => listener())
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
  if (!value) return ''
  const url = new URL(value, window.location.origin)
  return ['https:', 'mailto:'].includes(url.protocol) ? url.href : ''
}

/** Single-flight acquisition also refreshes expired tokens through the AWS SDK. */
export async function getWafToken(): Promise<string | undefined> {
  if (!settings.challengeScriptUrl) return undefined
  if (failed) throw new WafChallengeError()
  if (!pendingToken) {
    pendingToken = withTimeout(
      Promise.resolve().then(() => {
        if (!window.AwsWafIntegration) throw new WafChallengeError()
        return window.AwsWafIntegration.getToken()
      }),
      5000,
    )
      .then((token) => {
        if (!token) throw new WafChallengeError()
        return token
      })
      .catch(() => {
        throw fail()
      })
      .finally(() => {
        pendingToken = undefined
      })
  }
  return pendingToken
}

export function initializeWafChallenge(): Promise<void> {
  if (!initialization) {
    initialization = (async () => {
      try {
        // Local Vite development can configure the same public settings at build time.
        if (import.meta.env.DEV) {
          settings = {
            challengeScriptUrl:
              import.meta.env.REACT_APP_WAF_CHALLENGE_SCRIPT_URL || '',
            contactUrl: import.meta.env.REACT_APP_WAF_CONTACT_URL || '',
            protectedOrigins: (
              import.meta.env.REACT_APP_WAF_PROTECTED_ORIGINS || ''
            )
              .split(',')
              .map((value: string) => value.trim())
              .filter(Boolean),
          }
        } else {
          const response = await fetch('/waf-config.json', {
            cache: 'no-store',
            signal: AbortSignal.timeout(10000),
          })
          if (!response.ok) throw new WafChallengeError()
          settings = await response.json()
        }
        settings.contactUrl = safeContactUrl(settings.contactUrl)
        settings.protectedOrigins = settings.protectedOrigins.map(
          (origin) => new URL(origin).origin,
        )
        if (!settings.challengeScriptUrl) return
        // Only the AWS-issued integration script may execute in this page.
        const scriptUrl = new URL(settings.challengeScriptUrl)
        if (
          scriptUrl.protocol !== 'https:' ||
          !scriptUrl.hostname.endsWith('.awswaf.com') ||
          !scriptUrl.pathname.endsWith('/challenge.js')
        )
          throw new WafChallengeError()
        if (!settings.contactUrl) throw new WafChallengeError()
        await withTimeout(
          new Promise<void>((resolve, reject) => {
            const script = document.createElement('script')
            script.src = scriptUrl.href
            script.async = true
            script.onload = () => resolve()
            script.onerror = () => reject(new WafChallengeError())
            document.head.appendChild(script)
          }),
          10000,
        )
        await getWafToken()
      } catch {
        throw fail()
      }
    })()
  }
  return initialization
}

export function isWafProtectedUrl(url: string): boolean {
  const target = new URL(url, window.location.href)
  return (
    target.origin === window.location.origin ||
    settings.protectedOrigins.includes(target.origin)
  )
}

export function checkWafResponse(status: number, action: string | null): void {
  // Do not mistake other HTTP 202 responses, 403s, or network errors for challenges.
  if (status === 202 && action === 'challenge') throw fail()
}

export async function wafFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response> {
  const request = new Request(input, init)
  if (!isWafProtectedUrl(request.url)) return fetch(request)
  const token = await getWafToken()
  if (token) request.headers.set('x-aws-waf-token', token)
  const response = await fetch(request)
  checkWafResponse(response.status, response.headers.get('x-amzn-waf-action'))
  return response
}
