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
  wafProtectedOrigins: API,
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

  it('skips invalid protected origins and tolerates a missing contact URL', async () => {
    const waf = await load({
      wafContactUrl: '',
      wafProtectedOrigins: `api.example.org, ${API}`,
    })
    expect(console.warn).toHaveBeenCalled()
    expect(waf.hasWafFailure()).toBe(false)
    expect(waf.getWafContactUrl()).toBe('')
    expect(waf.isWafProtectedUrl(`${API}/data/object`)).toBe(true)
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

  it('shares concurrent token acquisition and sends tokens only to trusted origins', async () => {
    const waf = await load()
    getToken.mockClear()
    await Promise.all([waf.getWafToken(), waf.getWafToken()])
    expect(getToken).toHaveBeenCalledTimes(1)
    await waf.wafFetch(`${API}/data/object`)
    await waf.wafFetch('https://external.example.org/image')
    const [trusted, external] = sentRequests()
    expect(trusted.headers.get('x-aws-waf-token')).toBe('test-token')
    expect(external.headers.has('x-aws-waf-token')).toBe(false)
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

  it('retries cross-origin network errors without showing the failure screen', async () => {
    const waf = await load()
    vi.mocked(fetch).mockRejectedValue(new TypeError('Failed to fetch'))
    await expect(waf.wafFetch(`${API}/data/object`)).rejects.toThrow(TypeError)
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(waf.hasWafFailure()).toBe(false)
  })

  it('reports failure when the challenge script cannot load', async () => {
    scriptError = true
    const waf = await load()
    expect(waf.hasWafFailure()).toBe(true)
    await expect(waf.getWafToken()).rejects.toThrow(waf.WafChallengeError)
  })
})
