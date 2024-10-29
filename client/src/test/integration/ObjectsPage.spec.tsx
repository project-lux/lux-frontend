import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import config from '../../config/config'
import { getCollections } from '../../lib/util/collectionHelper'
import { reusableMinimalEntity } from '../data/reusableMinimalEntity'
import { getItems } from '../../lib/util/fetchItems'
import { archive as mockArchive } from '../data/archive'

import AppRender from './utils/AppRender'
import physicalObjectsMockApi from './utils/physicalObjectsMockApi'
import eventTrackingMock from './utils/eventTrackingMock'
import sharedMock from './utils/sharedMockApi'
import linguisticObjectsMockApi from './utils/linguisticObjectsMockApi'
import workResultsMockApi from './utils/workResultsMockApi'

// Mock the request for collections
vi.mock('../../lib/util/collectionHelper', () => ({
  __esModule: true,
  getCollections: vi.fn(() => ({
    data: [
      'https://endpoint.yale.edu/data/set/member-of-collection-1',
      'https://endpoint.yale.edu/data/set/member-of-collection-2',
    ],
  })),
}))

// Mock the request for items
const mockItems = [
  mockArchive,
  reusableMinimalEntity(
    'Mock Item 2',
    `${config.env.dataApiBaseUrl}data/set/member-of-collection-2`,
  ),
  reusableMinimalEntity(
    'Mock Item 3',
    `${config.env.dataApiBaseUrl}data/set/member-of-unit-1`,
  ),
]

vi.mock('../../lib/util/fetchItems', () => ({
  __esModule: true,
  getItems: vi.fn(() => ({
    data: mockItems,
  })),
}))

// mock leaflet
vi.mock('leaflet')

describe('Objects page', () => {
  const page = '/view/object/mock-object'

  beforeEach(async () => {
    physicalObjectsMockApi()
    linguisticObjectsMockApi()
    workResultsMockApi()
    sharedMock()
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

  describe('Works included', () => {
    it('renders the component', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/includes the following works/i)
      const container = screen.getByTestId('carries-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('About', () => {
    it('renders the non object primary name titles', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Display Name/i)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the language superscript of the title', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/(English)/i)
      const superscript = screen.getByTestId(
        'object-that-is-mocked-language-superscript',
      )
      expect(superscript).toBeInTheDocument()
    })

    it('renders the identifiers container', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Call Number/i)
      const container = screen.getByTestId('identifiers-list-row-0')
      expect(container).toBeInTheDocument()
    })

    it('renders the identifier value', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Call Number/i)
      const id = screen.getByTestId('identifier-value-0')
      expect(id).toBeInTheDocument()
    })

    it('renders the object types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Categorized As/i)
      const types = screen.getByTestId('object-types-link-container')
      expect(types).toBeInTheDocument()
    })

    it('renders the materials', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Materials/i)
      const materials = screen.getByTestId('object-materials-link-container')
      expect(materials).toBeInTheDocument()
    })

    it('renders the dimensions statement over the dimensions', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Dimension Statement/i)
      const statement = screen.getByText(/Dimension Statement/i)
      expect(statement).toBeInTheDocument()
    })

    it('renders the notes', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Notes Label/i)
      const notes = screen.getByTestId('objects-notes-container-0')
      expect(notes).toBeInTheDocument()
    })

    it('renders the exhibtions', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Exhibitions Description/i)
      const exhibitions = screen.getByTestId('exhibitions-notes-container-0')
      expect(exhibitions).toBeInTheDocument()
    })

    describe('production event', () => {
      it('renders the production agent', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/Creation/i)
        const agents = screen.getByTestId(
          'object-production-agent-link-container',
        )
        expect(agents).toBeInTheDocument()
      })

      it('renders the production dates', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/1983/i)
        const dates = screen.getByTestId('object-production-event-dates')
        expect(dates).toBeInTheDocument()
      })

      it('renders the production location', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/Pittsburgh/i)
        const location = screen.getByTestId(
          'object-production-0-event-location',
        )
        expect(location).toBeInTheDocument()
      })

      it('renders the production technique', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/creation technique/i)
        const technique = screen.getByTestId(
          'object-production-event-technique',
        )
        expect(technique).toBeInTheDocument()
      })

      it('renders the production time period', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/Time Period/i)
        const timePeriod = screen.getByTestId(
          'object-production-event-time-period',
        )
        expect(timePeriod).toBeInTheDocument()
      })
    })

    describe('encounter event', () => {
      // the rendering of other components is covered by the production events tests
      it('renders the encounter event', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/Encountered/i)
        const agents = screen.getByTestId('object-encounter-container')
        expect(agents).toBeInTheDocument()
      })
    })

    describe('publication event', () => {
      // the rendering of other components is covered by the production events tests
      it('renders the object publication event', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/Publication Location/i)
        const agents = screen.getByTestId('object-publication-container')
        expect(agents).toBeInTheDocument()
      })
    })
  })

  describe('Hierarchy', () => {
    it('renders the object hierarchy', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Archive/i)
      const hierarchy = screen.getByTestId(
        'object-page-generic-breadcrumb-hierarchy',
      )
      expect(hierarchy).toBeInTheDocument()
    })
  })

  describe('How do I see it', () => {
    it('renders the component', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/How do I see it/i)
      const component = screen.getByTestId('how-do-i-see-it')
      expect(component).toBeInTheDocument()
    })

    it('renders the access statement', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/How do I see it/i)
      const statement = screen.getByTestId('access-statement-0')
      expect(statement).toBeInTheDocument()
    })

    it('renders the access point', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/How do I see it/i)
      const link = screen.getByText('Online dataset')
      expect(link).toHaveAttribute(
        'href',
        'https://yale.test.org/test?URL=testing.com',
      )
    })

    it('renders the site links', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/How do I see it/i)
      const links = screen.getByTestId('site-links')
      expect(links).toBeInTheDocument()
    })

    it('renders the collection', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Collection/i)
      const collection = screen.getByTestId('collection-container')
      expect(collection).toBeInTheDocument()
    })

    it('renders the campus division', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Unit/i)
      const campusDivision = screen.getByTestId('campus-division-container')
      expect(campusDivision).toBeInTheDocument()
    })

    it('renders the plan your visit link', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Plan Your Visit/i)
      const link = screen.getByTestId('plan-your-visit-link')
      expect(link).toBeInTheDocument()
    })
  })

  describe('Can I reuse it', () => {
    it('renders the component', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Can I re-use it/i)
      const component = screen.getByTestId('can-i-reuse-it')
      expect(component).toBeInTheDocument()
    })

    it('renders the copyright information', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Can I re-use it/i)
      const copyright = screen.getByTestId('copyright-statement-text-note')
      expect(copyright).toBeInTheDocument()
    })
  })

  describe('Feedback button', () => {
    it('renders with correct href', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Submit feedback/i)
      const link = screen.getByTestId('submit-feedback-button')
      expect(link).toHaveAttribute(
        'href',
        `${config.env.luxFeedbackUrl}https%3A%2F%2Fendpoint.yale.edu%2Fview%2Fobject%2Fmock-object`,
      )
    })
  })

  describe('Data Sources', () => {
    it('renders', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Data Sources/i)
      const header = screen.getByTestId('data-sources-header')
      expect(header).toBeInTheDocument()
    })

    it('renders the record link', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Data Sources/i)
      const link = screen.getByTestId('This-Record-0-external-link')
      expect(link).toHaveAttribute(
        'href',
        `${config.env.dataApiBaseUrl}data/object/mock-object`,
      )
    })

    it('renders the IIIF manifest', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Data Sources/i)
      const link = screen.getByTestId('IIIF-Manifest-0-external-link')
      expect(link).toHaveAttribute(
        'href',
        'https://manifests.collections.yale.edu/test',
      )
    })

    it('renders the internal data source', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Data Sources/i)
      const link = screen.getByTestId(
        'Yale-Contributing-Records-0-external-link',
      )
      expect(link).toHaveAttribute(
        'href',
        'https://media.art.yale.edu/content/test.json',
      )
    })

    it('renders the external data source', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Data Sources/i)
      const link = screen.getByTestId(
        'External-Contributing-Records-0-external-link',
      )
      expect(link).toHaveAttribute(
        'href',
        'http://www.wikidata.org/entity/externalSource',
      )
    })
  })

  afterEach(cleanup)
})
