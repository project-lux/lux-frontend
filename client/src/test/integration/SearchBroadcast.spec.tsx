import { cleanup, render, screen } from '@testing-library/react'
import nock from 'nock'
import React from 'react'
import { Provider } from 'react-redux'
import { vi } from 'vitest'

import App from '../../App'
import { store as appStore } from '../../app/store'
import { advancedSearch } from '../../config/advancedSearch/advancedSearch'
import config from '../../config/config'
import { mlApi } from '../../redux/api/ml_api'
import {
  activateSearchBroadcast,
  installSearchBroadcastListener,
  resetSearchBroadcast,
} from '../../lib/searchBroadcast'
import { setMockLocation } from '../utils/mockUseLocation'
import { setMockEstimatesQuery } from '../utils/mockUseGetEstimatesQuery'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import objectsResultsMockApi from './utils/objectResultsMockAPI'
import eventTrackingMock from './utils/eventTrackingMock'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mockEstimatesResults: any = {
  objects: 801,
  works: 1266,
  collections: 2,
  people: 64,
  places: 10,
  concepts: 55,
  events: 6,
}

vi.mock('../../lib/util/collectionHelper', () => ({
  __esModule: true,
  getCollections: vi.fn(() => ({ data: [] })),
}))

vi.mock('../../lib/parse/search/estimatesParser', () => ({
  __esModule: true,
  defaultEstimates: vi.fn(() => mockEstimatesResults),
  isAdvancedSearch: vi.fn(),
  isSimpleSearch: vi.fn(),
}))

const ALLOWED = 'https://embed.test'

interface IFakeWindow {
  postMessage: ReturnType<typeof vi.fn>
  closed: boolean
}

/** A stand-in for a cross-origin WindowProxy. */
function fakeWindow(): IFakeWindow {
  return { postMessage: vi.fn(), closed: false }
}

describe('Search broadcasting', () => {
  config.advancedSearch = advancedSearch()
  const page = '/view/results/objects'
  const search =
    'q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol&pageLength=20'
  const route = `${page}?${search}`

  beforeEach(() => {
    eventTrackingMock()
    objectsResultsMockApi()
    cmsMockApi()
    setMockEstimatesQuery({ data: mockEstimatesResults, isSuccess: true })
    setMockLocation({ pathname: page, search })
  })

  afterEach(() => {
    cleanup()
    resetSearchBroadcast()
    config.env.broadcastSearchAllowedOrigins = ''
  })

  /** Opts the given origin in, as index.tsx and App.tsx do at startup. */
  function subscribe(origin: string, allowlist: string): IFakeWindow {
    config.env.broadcastSearchAllowedOrigins = allowlist
    installSearchBroadcastListener()
    const source = fakeWindow()
    window.dispatchEvent(
      new MessageEvent('message', {
        origin,
        data: { type: 'BROADCAST_SEARCH' },
        source: source as unknown as Window,
      }),
    )
    activateSearchBroadcast()
    return source
  }

  it('broadcasts the search a subscribed embedder asked for', async () => {
    const source = subscribe(ALLOWED, ALLOWED)

    render(<AppRender route={route} />)
    await screen.findByTestId('results-page')

    expect(source.postMessage).toHaveBeenCalled()
    const [message, targetOrigin] = source.postMessage.mock.calls[0]
    expect(targetOrigin).toEqual(ALLOWED)
    expect(message.type).toEqual('LUX_SEARCH')
    expect(message.url).toContain('api/search/item?q=')
    expect(message.params.tab).toEqual('objects')
    expect(message.params.pageLength).toEqual(20)
  })

  it('does not broadcast to an origin outside the allowlist', async () => {
    const source = subscribe('https://evil.test', ALLOWED)

    render(<AppRender route={route} />)
    await screen.findByTestId('results-page')

    expect(source.postMessage).not.toHaveBeenCalled()
  })

  it('does not broadcast when no allowlist is configured', async () => {
    const source = subscribe(ALLOWED, '')

    render(<AppRender route={route} />)
    await screen.findByTestId('results-page')

    expect(source.postMessage).not.toHaveBeenCalled()
  })

  it('does not broadcast when no embedder asked', async () => {
    config.env.broadcastSearchAllowedOrigins = ALLOWED
    installSearchBroadcastListener()
    activateSearchBroadcast()
    const spy = vi.spyOn(window, 'postMessage')

    render(<AppRender route={route} />)
    await screen.findByTestId('results-page')

    expect(spy).not.toHaveBeenCalled()
  })

  describe('startup wiring', () => {
    it('activates broadcasting once App finishes initializing', async () => {
      // No manual activateSearchBroadcast() here: App's own effect must do it.
      config.env.broadcastSearchAllowedOrigins = ALLOWED
      installSearchBroadcastListener()
      const source = fakeWindow()
      window.dispatchEvent(
        new MessageEvent('message', {
          origin: ALLOWED,
          data: { type: 'BROADCAST_SEARCH' },
          source: source as unknown as Window,
        }),
      )

      nock(config.env.dataApiBaseUrl)
        .get('/api/search/item?q=activated')
        .reply(200, JSON.stringify({ orderedItems: [] }), {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        })

      render(
        <Provider store={appStore}>
          <App />
        </Provider>,
      )
      // The advanced search config is not mocked, so init fails -- which still
      // sets `initialized` and so still runs the activation effect.
      await screen.findByText(/Configuration from the backend failed to load/i)

      await appStore.dispatch(
        mlApi.endpoints.search.initiate({
          q: 'activated',
          facets: {},
          tab: 'objects',
        }),
      )

      expect(source.postMessage).toHaveBeenCalledTimes(1)
    })

    it('installs the listener from the app entrypoint', async () => {
      // index.tsx installs the listener at module scope. Importing it here
      // proves that call exists and runs before anything renders.
      document.body.innerHTML = '<div id="root"></div>'
      await import('../../index')

      nock(config.env.dataApiBaseUrl)
        .get('/api/search/item?q=startup')
        .reply(200, JSON.stringify({ orderedItems: [] }), {
          'Access-Control-Allow-Origin': '*',
          'Content-type': 'application/json',
        })

      config.env.broadcastSearchAllowedOrigins = ALLOWED
      const source = fakeWindow()
      window.dispatchEvent(
        new MessageEvent('message', {
          origin: ALLOWED,
          data: { type: 'BROADCAST_SEARCH' },
          source: source as unknown as Window,
        }),
      )
      // The request was captured while the allowlist was still unknown.
      activateSearchBroadcast()

      await appStore.dispatch(
        mlApi.endpoints.search.initiate({
          q: 'startup',
          facets: {},
          tab: 'objects',
        }),
      )

      expect(source.postMessage).toHaveBeenCalledTimes(1)
      const [message, targetOrigin] = source.postMessage.mock.calls[0]
      expect(targetOrigin).toEqual(ALLOWED)
      expect(message.type).toEqual('LUX_SEARCH')
    })
  })
})
