import { vi } from 'vitest'

import config from '../../../config/config'
import {
  activateSearchBroadcast,
  broadcastSearchRequest,
  handleBroadcastSearchMessage,
  installSearchBroadcastListener,
  parseAllowedOrigins,
  resetSearchBroadcast,
} from '../../../lib/searchBroadcast'
import { ISearchParams } from '../../../types/IMlApiParams'

const ALLOWED = 'https://embed.test'
const params: ISearchParams = {
  q: '{"AND":[{"text":"andy"}]}',
  facets: {},
  tab: 'objects',
  page: 1,
}

interface IFakeWindow {
  postMessage: ReturnType<typeof vi.fn>
  closed: boolean
}

/** A stand-in for a cross-origin WindowProxy: has postMessage and closed. */
function fakeWindow(): IFakeWindow {
  return { postMessage: vi.fn(), closed: false }
}

function messageEvent(
  origin: string,
  data: unknown,
  source: unknown,
): MessageEvent {
  return { origin, data, source } as unknown as MessageEvent
}

/** Opt the given origin in, with the allowlist already applied. */
function subscribe(origin = ALLOWED, allowlist = ALLOWED): IFakeWindow {
  config.env.broadcastSearchAllowedOrigins = allowlist
  activateSearchBroadcast()
  const source = fakeWindow()
  handleBroadcastSearchMessage(
    messageEvent(origin, { type: 'BROADCAST_SEARCH' }, source),
  )
  return source
}

describe('searchBroadcast', () => {
  const originalLuxEnv = config.env.luxEnv

  beforeEach(() => {
    // The module warns on rejected input; keep the test output readable.
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    resetSearchBroadcast()
    config.env.broadcastSearchAllowedOrigins = ''
    config.env.luxEnv = originalLuxEnv
    vi.restoreAllMocks()
  })

  describe('parseAllowedOrigins', () => {
    it('parses a comma-separated list', () => {
      expect(parseAllowedOrigins('https://a.test,https://b.test')).toEqual([
        'https://a.test',
        'https://b.test',
      ])
    })

    it('ignores surrounding whitespace and empty entries', () => {
      expect(
        parseAllowedOrigins('  https://a.test , , https://b.test '),
      ).toEqual(['https://a.test', 'https://b.test'])
    })

    it.each([
      ['a trailing slash', 'https://a.test/', 'https://a.test'],
      ['an uppercase host', 'https://A.TEST', 'https://a.test'],
      ['the default https port', 'https://a.test:443', 'https://a.test'],
      ['the default http port', 'http://a.test:80', 'http://a.test'],
      ['a path', 'https://a.test/some/page', 'https://a.test'],
      ['a query string', 'https://a.test/?x=1', 'https://a.test'],
    ])('normalizes %s', (_label, input, expected) => {
      expect(parseAllowedOrigins(input)).toEqual([expected])
    })

    it('keeps a non-default port', () => {
      expect(parseAllowedOrigins('http://localhost:5555')).toEqual([
        'http://localhost:5555',
      ])
    })

    it('collapses duplicates', () => {
      expect(parseAllowedOrigins('https://a.test,https://a.test/')).toEqual([
        'https://a.test',
      ])
    })

    it.each([
      ['an empty string', ''],
      ['whitespace only', '   '],
      ['a bare wildcard', '*'],
      ['a wildcard subdomain', 'https://*.yale.edu'],
      ['an unparseable entry', 'not a url'],
      ['a bare hostname', 'a.test'],
      ['the literal null origin', 'null'],
    ])('rejects %s', (_label, input) => {
      expect(parseAllowedOrigins(input)).toEqual([])
    })

    it('keeps valid entries alongside rejected ones', () => {
      expect(parseAllowedOrigins('*,https://a.test,garbage')).toEqual([
        'https://a.test',
      ])
    })

    it('only warns outside production', () => {
      config.env.luxEnv = 'production'
      parseAllowedOrigins('*')
      expect(console.warn).not.toHaveBeenCalled()

      config.env.luxEnv = 'development'
      parseAllowedOrigins('*')
      expect(console.warn).toHaveBeenCalled()
    })
  })

  describe('handling a BROADCAST_SEARCH request', () => {
    it.each([
      ['a string payload', 'BROADCAST_SEARCH'],
      ['null data', null],
      ['the wrong type', { type: 'SOMETHING_ELSE' }],
      ['no type at all', {}],
    ])('ignores %s', (_label, data) => {
      const source = fakeWindow()
      config.env.broadcastSearchAllowedOrigins = ALLOWED
      activateSearchBroadcast()

      handleBroadcastSearchMessage(messageEvent(ALLOWED, data, source))
      broadcastSearchRequest(params, 'key-1')

      expect(source.postMessage).not.toHaveBeenCalled()
    })

    it('ignores a null source', () => {
      config.env.broadcastSearchAllowedOrigins = ALLOWED
      activateSearchBroadcast()
      handleBroadcastSearchMessage(
        messageEvent(ALLOWED, { type: 'BROADCAST_SEARCH' }, null),
      )
      // Nothing registered, so nothing to post to.
      expect(() => broadcastSearchRequest(params, 'key-1')).not.toThrow()
    })

    it('ignores a MessagePort-shaped source', () => {
      config.env.broadcastSearchAllowedOrigins = ALLOWED
      activateSearchBroadcast()
      // Has postMessage but no `closed`, so it is not a window.
      const port = { postMessage: vi.fn() }

      handleBroadcastSearchMessage(
        messageEvent(ALLOWED, { type: 'BROADCAST_SEARCH' }, port),
      )
      broadcastSearchRequest(params, 'key-1')

      expect(port.postMessage).not.toHaveBeenCalled()
    })

    it('never replies to a disallowed origin', () => {
      const source = subscribe('https://evil.test', ALLOWED)

      broadcastSearchRequest(params, 'key-1')

      expect(source.postMessage).not.toHaveBeenCalled()
    })

    it.each([
      ['a lookalike suffix', 'https://evil-embed.test'],
      ['a subdomain of the allowed host', 'https://sub.embed.test'],
      ['the allowed host as a subdomain', 'https://embed.test.evil.com'],
      ['a different scheme', 'http://embed.test'],
      ['a different port', 'https://embed.test:8443'],
    ])('rejects %s', (_label, origin) => {
      const source = subscribe(origin, ALLOWED)
      broadcastSearchRequest(params, 'key-1')
      expect(source.postMessage).not.toHaveBeenCalled()
    })

    it('does nothing when the allowlist is empty', () => {
      const source = subscribe(ALLOWED, '')

      broadcastSearchRequest(params, 'key-1')

      expect(source.postMessage).not.toHaveBeenCalled()
    })

    it('is wired up by installSearchBroadcastListener', () => {
      config.env.broadcastSearchAllowedOrigins = ALLOWED
      activateSearchBroadcast()
      installSearchBroadcastListener()
      const source = fakeWindow()

      window.dispatchEvent(
        new MessageEvent('message', {
          origin: ALLOWED,
          data: { type: 'BROADCAST_SEARCH' },
          source: source as unknown as Window,
        }),
      )
      broadcastSearchRequest(params, 'key-1')

      expect(source.postMessage).toHaveBeenCalledTimes(1)
    })
  })

  describe('broadcasting', () => {
    it('posts to the validated origin and never to "*"', () => {
      const source = subscribe()

      broadcastSearchRequest(params, 'key-1')

      expect(source.postMessage).toHaveBeenCalledTimes(1)
      const [, targetOrigin] = source.postMessage.mock.calls[0]
      expect(targetOrigin).toEqual(ALLOWED)
      expect(targetOrigin).not.toEqual('*')
    })

    it('sends the search params and both URL forms', () => {
      const source = subscribe()

      broadcastSearchRequest(params, 'key-1')

      const [message] = source.postMessage.mock.calls[0]
      expect(message).toEqual({
        type: 'LUX_SEARCH',
        params,
        url: 'api/search/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%7D%5D%7D&page=1',
        absoluteUrl: `${config.env.dataApiBaseUrl}api/search/item?q=%7B%22AND%22%3A%5B%7B%22text%22%3A%22andy%22%7D%5D%7D&page=1`,
        timestamp: expect.any(Number),
      })
    })

    it('does nothing when no request was ever made', () => {
      config.env.broadcastSearchAllowedOrigins = ALLOWED
      activateSearchBroadcast()

      expect(() => broadcastSearchRequest(params, 'key-1')).not.toThrow()
    })

    it('collapses a repeat of the same cache key', () => {
      const source = subscribe()

      broadcastSearchRequest(params, 'key-1')
      broadcastSearchRequest(params, 'key-1')

      expect(source.postMessage).toHaveBeenCalledTimes(1)
    })

    it('sends distinct cache keys separately', () => {
      const source = subscribe()

      broadcastSearchRequest(params, 'key-1')
      broadcastSearchRequest({ ...params, page: 2 }, 'key-2')

      expect(source.postMessage).toHaveBeenCalledTimes(2)
    })

    it('re-sends the same cache key once the dedupe window passes', () => {
      vi.useFakeTimers()
      try {
        const source = subscribe()

        broadcastSearchRequest(params, 'key-1')
        vi.advanceTimersByTime(600)
        broadcastSearchRequest(params, 'key-1')

        expect(source.postMessage).toHaveBeenCalledTimes(2)
      } finally {
        vi.useRealTimers()
      }
    })

    it('stops once the target window is closed', () => {
      const source = subscribe()
      source.closed = true

      broadcastSearchRequest(params, 'key-1')
      source.closed = false
      broadcastSearchRequest(params, 'key-2')

      expect(source.postMessage).not.toHaveBeenCalled()
    })

    it('drops the target when postMessage throws', () => {
      const source = subscribe()
      source.postMessage.mockImplementation(() => {
        throw new Error('detached frame')
      })

      expect(() => broadcastSearchRequest(params, 'key-1')).not.toThrow()

      source.postMessage.mockImplementation(() => {})
      broadcastSearchRequest(params, 'key-2')
      expect(source.postMessage).toHaveBeenCalledTimes(1)
    })
  })

  describe('requests that arrive before the config loads', () => {
    it('honours a buffered request from an allowed origin', () => {
      const source = fakeWindow()
      // No activateSearchBroadcast() yet: the allowlist is unknown.
      handleBroadcastSearchMessage(
        messageEvent(ALLOWED, { type: 'BROADCAST_SEARCH' }, source),
      )
      broadcastSearchRequest(params, 'key-1')
      expect(source.postMessage).not.toHaveBeenCalled()

      config.env.broadcastSearchAllowedOrigins = ALLOWED
      activateSearchBroadcast()
      broadcastSearchRequest(params, 'key-2')

      expect(source.postMessage).toHaveBeenCalledTimes(1)
    })

    it('still rejects a buffered request from a disallowed origin', () => {
      const source = fakeWindow()
      handleBroadcastSearchMessage(
        messageEvent('https://evil.test', { type: 'BROADCAST_SEARCH' }, source),
      )

      config.env.broadcastSearchAllowedOrigins = ALLOWED
      activateSearchBroadcast()
      broadcastSearchRequest(params, 'key-1')

      expect(source.postMessage).not.toHaveBeenCalled()
    })

    it('caps the buffer', () => {
      const sources = Array.from({ length: 8 }, () => fakeWindow())
      sources.forEach((source, index) => {
        handleBroadcastSearchMessage(
          messageEvent(
            `https://host-${index}.test`,
            { type: 'BROADCAST_SEARCH' },
            source,
          ),
        )
      })

      // Allow the 7th origin, which should have been dropped by the cap.
      config.env.broadcastSearchAllowedOrigins = 'https://host-7.test'
      activateSearchBroadcast()
      broadcastSearchRequest(params, 'key-1')

      expect(sources[7].postMessage).not.toHaveBeenCalled()
    })

    it('leaves the feature off when the config never arrives', () => {
      const source = fakeWindow()
      handleBroadcastSearchMessage(
        messageEvent(ALLOWED, { type: 'BROADCAST_SEARCH' }, source),
      )

      broadcastSearchRequest(params, 'key-1')

      expect(source.postMessage).not.toHaveBeenCalled()
    })

    it('is idempotent across repeated activation', () => {
      const source = subscribe()
      activateSearchBroadcast()

      broadcastSearchRequest(params, 'key-1')

      expect(source.postMessage).toHaveBeenCalledTimes(1)
    })
  })
})
