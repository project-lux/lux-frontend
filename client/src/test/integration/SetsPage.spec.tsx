import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import config from '../../config/config'
import { getCollections } from '../../lib/util/collectionHelper'
import { reusableMinimalEntity } from '../data/reusableMinimalEntity'
import { getItems } from '../../lib/util/fetchItems'

import AppRender from './utils/AppRender'
import productionEventMockApi from './utils/productionEventMockApi'
import setsMockApi from './utils/setsMockApi'
import eventTrackingMock from './utils/eventTrackingMock'
import sharedMock from './utils/sharedMockApi'

// Mock the request for collections
jest.mock('../../lib/util/collectionHelper', () => ({
  __esModule: true,
  getCollections: jest.fn(() => ({
    data: [
      'https://endpoint.yale.edu/data/set/member-of-collection-1',
      'https://endpoint.yale.edu/data/set/member-of-collection-2',
    ],
  })),
}))

const mockItems = [
  reusableMinimalEntity(
    'Mock Item 1',
    `${config.env.dataApiBaseUrl}data/set/member-of-collection-1`,
  ),
  reusableMinimalEntity(
    'Mock Item 2',
    `${config.env.dataApiBaseUrl}data/set/member-of-collection-2`,
  ),
  reusableMinimalEntity(
    'Mock Item 3',
    `${config.env.dataApiBaseUrl}data/set/member-of-unit-1`,
  ),
]

jest.mock('../../lib/util/fetchItems', () => ({
  __esModule: true,
  getItems: jest.fn(() => ({
    data: mockItems,
  })),
}))

describe('Set page', () => {
  const page = '/view/set/mock-set'

  beforeEach(async () => {
    setsMockApi()
    sharedMock()
    productionEventMockApi()
    eventTrackingMock()

    const collection = getCollections as jest.MockedFunction<
      typeof getCollections
    >
    collection.mockImplementation(() => ({
      data: [
        `${config.env.dataApiBaseUrl}data/set/member-of-collection-1`,
        `${config.env.dataApiBaseUrl}data/set/member-of-collection-2`,
      ],
    }))

    const items = getItems as jest.MockedFunction<typeof getItems>
    items.mockImplementation(() => ({
      data: mockItems,
    }))
  })

  describe('About', () => {
    it('renders the set names', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Set/i)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Type/i)
      const event = screen.getByTestId('set-types-link-container')
      expect(event).toBeInTheDocument()
    })

    it('renders the identifiers', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/mssa.ms.1824/i)
      const id = screen.getByTestId('identifiers-list-row-0')
      expect(id).toBeInTheDocument()
    })

    it('renders the identifier value', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/mssa.ms.1824/i)
      const id = screen.getByTestId('identifier-value-0')
      expect(id).toBeInTheDocument()
    })

    it('renders the identifier carried out by', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Concept/i)
      const id = screen.getByTestId('identifier-carried-out-by-0')
      expect(id).toBeInTheDocument()
    })

    it('renders the about', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock About/i)
      const event = screen.getByTestId('set-about-link-container')
      expect(event).toBeInTheDocument()
    })

    it('renders the depicts', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Depicts/i)
      const event = screen.getByTestId('set-depicts-link-container')
      expect(event).toBeInTheDocument()
    })

    it('renders sets notes', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Note/i)
      const event = screen.getByTestId('notes-container-0')
      expect(event).toBeInTheDocument()
    })

    it('renders the publication event', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Event Label/i)
      const event = screen.getByTestId('set-publication-container')
      expect(event).toBeInTheDocument()
    })

    it('renders the source object creation event', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Creation of Archival Objects/i)
      const event = screen.getByTestId('set-source-object-creation-container')
      expect(event).toBeInTheDocument()
    })

    it('renders the set creation event', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Creation of Archive/i)
      const event = screen.getByTestId('set-creation-container')
      expect(event).toBeInTheDocument()
    })

    it('renders the set breadcrumb hierarchy', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Archive/i)
      const hierarchy = screen.getByTestId(
        'sets-page-generic-breadcrumb-hierarchy',
      )
      expect(hierarchy).toBeInTheDocument()
    })
  })

  describe('Archives page', () => {
    const setsPage = '/view/set/mock-archive'
    it('renders the Where at Yale section', async () => {
      const { findAllByText } = render(<AppRender route={setsPage} />)

      await findAllByText(/Where is it at Yale/i)
      const container = screen.getByTestId('where-at-yale')
      expect(container).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
