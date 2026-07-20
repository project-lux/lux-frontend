import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import { advancedSearch } from '../../config/advancedSearch/advancedSearch'
import config from '../../config/config'
import { setMockLocation } from '../utils/mockUseLocation'
import { setMockEstimatesQuery } from '../utils/mockUseGetEstimatesQuery'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import objectsResultsMockApi from './utils/objectResultsMockAPI'
import resultsErrorsMockApi from './utils/resultsErrorsMockApi'
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
  defaultEstimates: vi.fn(() => mockEstimatesResults),
  isAdvancedSearch: vi.fn(),
  isSimpleSearch: vi.fn(),
}))

describe('Results page shared components', () => {
  config.advancedSearch = advancedSearch()
  const page = '/view/results/objects'

  beforeEach(async () => {
    eventTrackingMock()
  })

  describe('Passing results requests', () => {
    const validSearch =
      'q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol&pageLength=20'
    const validPage = `${page}?${validSearch}`

    beforeEach(async () => {
      objectsResultsMockApi()
      cmsMockApi()
      setMockEstimatesQuery({ data: mockEstimatesResults, isSuccess: true })
      setMockLocation({ pathname: page, search: validSearch })
    })

    describe('Navigation', () => {
      it('renders the navigation component', async () => {
        const { findAllByText } = render(<AppRender route={validPage} />)

        await findAllByText(/Objects results/i)
        const navbar = screen.getByTestId('results-page-navbar')
        expect(navbar).toBeInTheDocument()
      })

      it('renders the correct estimate for the current tab', async () => {
        const { findAllByTestId } = render(<AppRender route={validPage} />)

        await findAllByTestId(/objects-results-tab-button/i)
        const tabButton = screen.getByTestId('objects-results-tab-button')
        expect(tabButton).toHaveTextContent('801 results')
      })
    })

    describe('Pagination', () => {
      it('renders the component if more than 20 results', async () => {
        const { findAllByTestId } = render(<AppRender route={validPage} />)

        await findAllByTestId(/results-page-pagination/i)
        const pagination = screen.getByTestId('results-page-pagination')
        expect(pagination).toBeInTheDocument()
      })

      it('renders the Go To Page input field with the correct number of pages', async () => {
        const totalPages = Math.ceil(801 / 20)
        const { findAllByTestId } = render(<AppRender route={validPage} />)

        await findAllByTestId(/pagination-page-input/i)
        const goToPage = screen.getByTestId('pagination-page-input')
        expect(goToPage).toHaveTextContent(`of ${totalPages}`)
      })
    })

    describe('SearchContainer', () => {
      it('renders the simple search', async () => {
        const { findAllByText } = render(<AppRender route={validPage} />)

        await findAllByText(/Objects results/i)
        const simpleSearch = screen.getByTestId(
          'results-search-container-simple-search-form',
        )
        expect(simpleSearch).toBeInTheDocument()
      })
    })
  })

  describe('Failing results requests', () => {
    const failingSearch =
      'q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol&ip=0&pageLength=20'

    beforeEach(async () => {
      resultsErrorsMockApi()
      cmsMockApi()
      setMockLocation({ pathname: page, search: failingSearch })
    })

    describe('Errors', () => {
      it('renders the no results message if there are no results', async () => {
        const { findAllByTestId } = render(
          <AppRender route={`${page}?${failingSearch}`} />,
        )

        await findAllByTestId(/results-error-alert/i)
        const header = screen.getByTestId('results-error-alert')
        expect(header).toHaveTextContent(
          'Your search yielded no results. Please try another search.',
        )
      })
    })
  })

  afterEach(cleanup)
})
