import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import { advancedSearch } from '../../config/advancedSearch/advancedSearch'
import config from '../../config/config'
import { getCollections } from '../../lib/util/collectionHelper'
import { getEstimatesRequests } from '../../lib/parse/search/estimatesParser'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import objectsResultsMockApi from './utils/objectResultsMockAPI'
import resultsErrorsMockApi from './utils/resultsErrorsMockApi'
import eventTrackingMock from './utils/eventTrackingMock'

const mockEstimatesResults = [
  {
    objects: 801,
  },
  {
    works: 1266,
  },
  {
    people: 64,
  },
  {
    places: 10,
  },
  {
    concepts: 55,
  },
  {
    events: 6,
  },
]

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

// Mock the request for collections
vi.mock('../../lib/parse/search/estimatesParser', () => ({
  __esModule: true,
  getEstimatesRequests:vi.fn(() => ({
    data: mockEstimatesResults,
  })),
  isAdvancedSearch: vi.fn(),
  isSimpleSearch: vi.fn(),
}))

describe('Results page shared components', () => {
  config.advancedSearch = advancedSearch()

  beforeEach(async () => {
    eventTrackingMock()
  })

  describe('Passing results requests', () => {
    const page =
      '/view/results/objects?q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol'

    beforeEach(async () => {
      objectsResultsMockApi()
      cmsMockApi()

      // const collection = getCollections as jest.MockedFunction<
      //   typeof getCollections
      // >
      // collection.mockImplementation(() => ({
      //   data: [
      //     `${config.env.dataApiBaseUrl}data/set/member-of-collection-1`,
      //     `${config.env.dataApiBaseUrl}data/set/member-of-collection-2`,
      //   ],
      // }))

      // const estimates = getEstimatesRequests as jest.MockedFunction<
      //   typeof getEstimatesRequests
      // >
      // estimates.mockImplementation(() => ({
      //   data: mockEstimatesResults,
      // }))
    })

    describe('Navigation', () => {
      it('renders the navigation component', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/Objects results/i)
        const navbar = screen.getByTestId('results-page-navbar')
        expect(navbar).toBeInTheDocument()
      })

      it('renders the correct estimate for the current tab', async () => {
        const { findByText } = render(<AppRender route={page} />)

        await findByText(/801 Objects results/i)
        const tabButton = screen.getByTestId('objects-results-tab-button')
        expect(tabButton).toHaveTextContent('Objects (801)')
      })
    })

    describe('Pagination', () => {
      it('renders the component if more than 20 results', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/Go to page/i)
        const pagination = screen.getByTestId('results-page-pagination')
        expect(pagination).toBeInTheDocument()
      })

      it('renders the Go To Page input field with the correct number of pages', async () => {
        const totalPages = Math.ceil(801 / 20)
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/Go to page/i)
        const goToPage = screen.getByTestId('pagination-page-input')
        expect(goToPage).toHaveTextContent(`of ${totalPages}`)
      })
    })

    describe('SearchContainer', () => {
      it('renders the simple search', async () => {
        const { findAllByText } = render(<AppRender route={page} />)

        await findAllByText(/Objects results/i)
        const simpleSearch = screen.getByTestId(
          'results-search-container-simple-search-form',
        )
        expect(simpleSearch).toBeInTheDocument()
      })
    })
  })

  describe('Failing results requests', () => {
    const errorPage =
      '/view/results/objects?q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol&ip=0'

    beforeEach(async () => {
      resultsErrorsMockApi()
      cmsMockApi()
    })

    describe('Errors', () => {
      it('renders the no results message if there are no results', async () => {
        const { findAllByText } = render(<AppRender route={errorPage} />)

        await findAllByText(/Objects results/i)
        const header = screen.getByTestId('results-error-alert')
        expect(header).toHaveTextContent(
          'Error message that should display in the alert.',
        )
      })
    })
  })

  afterEach(cleanup)
})
