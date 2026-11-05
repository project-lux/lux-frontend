import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import type { IWafEnv } from '../../../lib/wafChallenge'

type WafModule = typeof import('../../../lib/wafChallenge')

const ORIGIN = window.location.origin
const API = 'https://api.example.org'
const SCRIPT_URL = 'https://example.token.awswaf.com/example/challenge.js'

const enabledEnv: IWafEnv = {
  useWafChallenge: true,
  wafChallengeScriptUrl: SCRIPT_URL,
  wafContactUrl: 'https://support.example.org/contact',
}

const getToken = vi.fn()
const forceRefreshToken = vi.fn()
let scriptError = false
let appendChild: ReturnType<typeof vi.spyOn>

const challengeResponse = (): Response =>
  new Response('<html>challenge</html>', {
    status: 202,
    headers: { 'x-amzn-waf-action': 'challenge' },
  })

const sentRequests = (): Request[] =>
  vi.mocked(fetch).mock.calls.map((call) => call[0] as Request)

async function load(env: Partial<IWafEnv> = {}): Promise<WafModule> {
  const waf = await import('../../../lib/wafChallenge')
  await waf.initializeWafChallenge({ ...enabledEnv, ...env })
  return waf
}

describe('wafChallenge', () => {
  beforeEach(() => {
    vi.resetModules()
    getToken.mockReset().mockResolvedValue('test-token')
    forceRefreshToken.mockReset().mockResolvedValue(undefined)
    scriptError = false
    window.AwsWafIntegration = { getToken, forceRefreshToken }
    appendChild = vi
      .spyOn(document.head, 'appendChild')
      .mockImplementation((node) => {
        const script = node as HTMLScriptElement
        queueMicrotask(() =>
          scriptError
            ? script.onerror?.(new Event('error'))
            : script.onload?.(new Event('load')),
        )
        return node
      })
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response('{}'))),
    )
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    delete window.AwsWafIntegration
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('does nothing when USE_WAF_CHALLENGE is off', async () => {
    const waf = await load({ useWafChallenge: false })
    await waf.wafFetch(`${ORIGIN}/api/search`)
    expect(appendChild).not.toHaveBeenCalled()
    expect(getToken).not.toHaveBeenCalled()
    expect(sentRequests()[0].headers.has('x-aws-waf-token')).toBe(false)
    expect(waf.hasWafFailure()).toBe(false)
  })

  it('makes plain requests when initialization never ran', async () => {
    const waf = await import('../../../lib/wafChallenge')
    await waf.wafFetch(`${ORIGIN}/api/search`)
    expect(sentRequests()[0].headers.has('x-aws-waf-token')).toBe(false)
  })

  it.each(['', 'https://untrusted.example.org/challenge.js', 'not a url'])(
    'stays disabled without failing for script URL %j',
    async (wafChallengeScriptUrl) => {
      const waf = await load({ wafChallengeScriptUrl })
      await waf.wafFetch(`${ORIGIN}/api/search`)
      expect(console.error).toHaveBeenCalled()
      expect(appendChild).not.toHaveBeenCalled()
      expect(waf.hasWafFailure()).toBe(false)
      expect(sentRequests()[0].headers.has('x-aws-waf-token')).toBe(false)
    },
  )

  it('protects only same-origin URLs', async () => {
    const waf = await load()
    expect(waf.isWafProtectedUrl('/api/search')).toBe(true)
    expect(waf.isWafProtectedUrl(`${ORIGIN}/api/search`)).toBe(true)
    expect(waf.isWafProtectedUrl(`${API}/data/object`)).toBe(false)
  })

  it.each(['', 'http://support.example.org/contact', 'javascript:alert(1)'])(
    'warns and hides the contact link for contact URL %j',
    async (wafContactUrl) => {
      const waf = await load({ wafContactUrl })
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('WAF contact URL'),
      )
      expect(waf.getWafContactUrl()).toBe('')
      expect(waf.hasWafFailure()).toBe(false)
    },
  )

  it('accepts a mailto contact URL without warning', async () => {
    const waf = await load({ wafContactUrl: 'mailto:help@example.org' })
    expect(console.warn).not.toHaveBeenCalled()
    expect(waf.getWafContactUrl()).toBe('mailto:help@example.org')
  })

  it('shares concurrent token acquisition and sends tokens only to the same origin', async () => {
    const waf = await load()
    getToken.mockClear()
    await Promise.all([waf.getWafToken(), waf.getWafToken()])
    expect(getToken).toHaveBeenCalledTimes(1)
    await waf.wafFetch(`${ORIGIN}/api/search`)
    await waf.wafFetch(`${API}/data/object`)
    const [sameOrigin, external] = sentRequests()
    expect(sameOrigin.headers.get('x-aws-waf-token')).toBe('test-token')
    expect(external.headers.has('x-aws-waf-token')).toBe(false)
  })

  it('does not let a forced refresh reuse a pending unforced token request', async () => {
    const waf = await load()
    getToken.mockClear()
    let release: (token: string) => void = () => {}
    getToken.mockReturnValueOnce(
      new Promise<string>((resolve) => {
        release = resolve
      }),
    )
    const stale = waf.getWafToken()
    const forced = waf.getWafToken(true)
    await new Promise((resolve) => setTimeout(resolve, 0))
    release('stale-token')
    await expect(stale).resolves.toBe('stale-token')
    await expect(forced).resolves.toBe('test-token')
    expect(forceRefreshToken).toHaveBeenCalledTimes(1)
    expect(getToken).toHaveBeenCalledTimes(2)
  })

  it('refreshes the token and retries once after a challenge', async () => {
    const waf = await load()
    vi.mocked(fetch)
      .mockResolvedValueOnce(challengeResponse())
      .mockResolvedValueOnce(new Response('{"ok":true}'))
    const response = await waf.wafFetch(`${ORIGIN}/api/search`)
    expect(await response.json()).toEqual({ ok: true })
    expect(forceRefreshToken).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(waf.hasWafFailure()).toBe(false)
  })

  it('reports failure once when the retry is also challenged', async () => {
    const waf = await load()
    const listener = vi.fn()
    waf.subscribeToWafFailure(listener)
    vi.mocked(fetch).mockImplementation(() =>
      Promise.resolve(challengeResponse()),
    )
    await expect(waf.wafFetch(`${ORIGIN}/api/search`)).rejects.toThrow(
      waf.WafChallengeError,
    )
    await expect(waf.wafFetch(`${ORIGIN}/api/search`)).rejects.toThrow(
      waf.WafChallengeError,
    )
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(waf.hasWafFailure()).toBe(true)
    expect(listener).toHaveBeenCalledTimes(1)
    expect(waf.getWafContactUrl()).toBe('https://support.example.org/contact')
  })

  it('still sends unprotected requests after a failure', async () => {
    const waf = await load()
    vi.mocked(fetch)
      .mockResolvedValueOnce(challengeResponse())
      .mockResolvedValueOnce(challengeResponse())
    await expect(waf.wafFetch(`${ORIGIN}/api/search`)).rejects.toThrow(
      waf.WafChallengeError,
    )
    await waf.wafFetch(`${API}/cms/page`)
    expect(sentRequests()[2].headers.has('x-aws-waf-token')).toBe(false)
  })

  it('does not treat ordinary 202 or 403 responses as challenges', async () => {
    const waf = await import('../../../lib/wafChallenge')
    expect(waf.isWafChallenge(202, null)).toBe(false)
    expect(waf.isWafChallenge(403, 'challenge')).toBe(false)
    expect(waf.isWafChallenge(202, 'challenge')).toBe(true)
  })

  it('recovers when one token request times out', async () => {
    const waf = await load()
    vi.useFakeTimers()
    try {
      getToken
        .mockImplementationOnce(() => new Promise(() => {}))
        .mockResolvedValue('fresh-token')
      const pending = waf.wafFetch(`${ORIGIN}/api/search`)
      await vi.advanceTimersByTimeAsync(10000)
      await pending
      expect(sentRequests()[0].headers.get('x-aws-waf-token')).toBe(
        'fresh-token',
      )
      expect(waf.hasWafFailure()).toBe(false)
    } finally {
      vi.useRealTimers()
    }
  })

  it('passes network errors through without retrying or showing the failure screen', async () => {
    const waf = await load()
    vi.mocked(fetch).mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(waf.wafFetch(`${ORIGIN}/api/search`)).rejects.toThrow(
      TypeError,
    )
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(waf.hasWafFailure()).toBe(false)
  })

  it('reports failure when the challenge script cannot load', async () => {
    scriptError = true
    const waf = await load()
    expect(waf.hasWafFailure()).toBe(true)
    await expect(waf.getWafToken()).rejects.toThrow(waf.WafChallengeError)
  })
})
