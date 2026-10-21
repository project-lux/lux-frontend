// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const sdk = vi.fn()
let scriptError = false

beforeEach(() => {
  vi.resetModules()
  vi.stubEnv(
    'REACT_APP_WAF_CHALLENGE_SCRIPT_URL',
    'https://example.token.awswaf.com/example/challenge.js',
  )
  vi.stubEnv('REACT_APP_WAF_CONTACT_URL', 'https://support.example.org/contact')
  vi.stubEnv('REACT_APP_WAF_PROTECTED_ORIGINS', 'https://api.example.org')
  sdk.mockReset().mockResolvedValue('test-token')
  scriptError = false
  vi.stubGlobal('window', {
    location: {
      origin: 'https://lux.example.org',
      href: 'https://lux.example.org/',
    },
    setTimeout,
    clearTimeout,
    AwsWafIntegration: { getToken: sdk },
  })
  vi.stubGlobal('document', {
    createElement: () => ({}),
    head: {
      appendChild: (script: { onload: () => void; onerror: () => void }) => {
        queueMicrotask(() => (scriptError ? script.onerror() : script.onload()))
      },
    },
  })
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('{}')))
})
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('silent challenge transport', () => {
  it('leaves verification disabled when the script URL is empty', async () => {
    vi.stubEnv('REACT_APP_WAF_CHALLENGE_SCRIPT_URL', '')
    const waf = await import('./wafChallenge')
    await waf.initializeWafChallenge()
    await waf.wafFetch('https://lux.example.org/api/search')
    expect(sdk).not.toHaveBeenCalled()
    const request = vi.mocked(fetch).mock.calls[0][0] as Request
    expect(request.headers.has('x-aws-waf-token')).toBe(false)
  })
  it('shares concurrent token acquisition and forwards tokens only to trusted origins', async () => {
    const waf = await import('./wafChallenge')
    await waf.initializeWafChallenge()
    sdk.mockClear()
    await Promise.all([waf.getWafToken(), waf.getWafToken()])
    expect(sdk).toHaveBeenCalledTimes(1)
    await waf.wafFetch('https://api.example.org/data/object')
    await waf.wafFetch('https://external.example.org/image')
    const requests = vi
      .mocked(fetch)
      .mock.calls.map((call) => call[0] as Request)
    expect(requests[0].headers.get('x-aws-waf-token')).toBe('test-token')
    expect(requests[1].headers.has('x-aws-waf-token')).toBe(false)
  })
  it('notifies recovery UI when token acquisition fails', async () => {
    const waf = await import('./wafChallenge')
    const listener = vi.fn()
    waf.subscribeToWafFailure(listener)
    sdk.mockRejectedValue(new Error('verification failed'))
    await expect(waf.initializeWafChallenge()).rejects.toThrow(
      'Browser verification',
    )
    expect(waf.hasWafFailure()).toBe(true)
    expect(listener).toHaveBeenCalled()
    expect(waf.getWafContactUrl()).toBe('https://support.example.org/contact')
  })
  it('handles script failure and rejects untrusted script URLs', async () => {
    const waf = await import('./wafChallenge')
    scriptError = true
    await expect(waf.initializeWafChallenge()).rejects.toThrow()
    expect(waf.hasWafFailure()).toBe(true)
    vi.resetModules()
    vi.stubEnv(
      'REACT_APP_WAF_CHALLENGE_SCRIPT_URL',
      'https://untrusted.example.org/challenge.js',
    )
    const other = await import('./wafChallenge')
    await expect(other.initializeWafChallenge()).rejects.toThrow()
  })
  it('recognizes a WAF challenge response without misclassifying ordinary errors', async () => {
    const waf = await import('./wafChallenge')
    expect(() => waf.checkWafResponse(202, null)).not.toThrow()
    expect(() => waf.checkWafResponse(403, null)).not.toThrow()
    expect(() => waf.checkWafResponse(202, 'challenge')).toThrow()
    expect(waf.hasWafFailure()).toBe(true)
  })
  it('bounds token acquisition time and exposes a recovery state', async () => {
    vi.useFakeTimers()
    window.setTimeout = globalThis.setTimeout
    window.clearTimeout = globalThis.clearTimeout
    try {
      sdk.mockImplementation(() => new Promise(() => {}))
      const waf = await import('./wafChallenge')
      const result = expect(waf.initializeWafChallenge()).rejects.toThrow()
      await vi.advanceTimersByTimeAsync(6000)
      await result
      expect(waf.hasWafFailure()).toBe(true)
    } finally {
      vi.useRealTimers()
    }
  })
  it('rejects challenge HTML instead of returning it as API data', async () => {
    const waf = await import('./wafChallenge')
    await waf.initializeWafChallenge()
    vi.mocked(fetch).mockResolvedValue(
      new Response('<html>challenge</html>', {
        status: 202,
        headers: { 'x-amzn-waf-action': 'challenge' },
      }),
    )
    await expect(
      waf.wafFetch('https://lux.example.org/api/search'),
    ).rejects.toThrow()
    expect(waf.hasWafFailure()).toBe(true)
    expect(fetch).toHaveBeenCalledTimes(1)
  })
  it('loads production settings before acquiring a token', async () => {
    vi.stubEnv('DEV', false)
    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify({
          challengeScriptUrl:
            'https://example.token.awswaf.com/example/challenge.js',
          contactUrl: 'mailto:help@example.org',
          protectedOrigins: [],
        }),
      ),
    )
    const waf = await import('./wafChallenge')
    await waf.initializeWafChallenge()
    expect(fetch).toHaveBeenCalledWith(
      '/waf-config.json',
      expect.objectContaining({ cache: 'no-store' }),
    )
    expect(sdk).toHaveBeenCalledOnce()
    expect(waf.getWafContactUrl()).toBe('mailto:help@example.org')
  })
})
