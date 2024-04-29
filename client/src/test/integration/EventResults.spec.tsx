import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { sortBy } from '../../config/sortingOptions'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import estimatesMockApi from './utils/estimatesMockApi'
import eventResultsMockApi from './utils/eventResultsMockApi'
import siteImproveMock from './utils/mockSiteImprove'

describe('Event results page', () => {
  const page =
    '/view/results/events?q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol'

  beforeEach(async () => {
    eventResultsMockApi()
    estimatesMockApi()
    cmsMockApi()
    siteImproveMock()
  })

  describe('Results header', () => {
    it('renders the correct title', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Events results/i)
      const title = screen.getByTestId('results-header-title')
      expect(title).toHaveTextContent('6 Events results')
    })

    it('renders the correct results descriptor', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Events results/i)
      const descriptor = screen.getByTestId('results-page-cms-descriptor')
      expect(descriptor).toHaveTextContent('Description of the events results.')
    })
  })

  describe('SortDropdown', () => {
    it('renders the correct dropdown options', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Event/i)

      // Click on the sorting dropdown
      const sortDropdownButton = screen.getByTestId('sorting-dropdown-button')
      await act(async () => {
        fireEvent.click(sortDropdownButton)
      })
      const options = screen.getAllByTestId('search-results-sorting-option')
      const eventsSortingOptions = Object.keys(sortBy.events)
      expect(options.length).toBe(eventsSortingOptions.length)
    })
  })

  describe('EventSnippet', () => {
    it('renders the title with the link to the record', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Event/i)
      const header = screen.getByTestId('event-results-snippet-title')
      expect(header).toHaveTextContent('Mock Event')
    })

    it('renders the types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Event/i)
      const type = screen.getByTestId('entity-type-list')
      expect(type).toBeInTheDocument()
    })

    it('renders the carried out by data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Event/i)
      const agent = screen.getByTestId('event-snippet-carried-out-by')
      expect(agent).toBeInTheDocument()
    })

    it('renders the dates', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Event/i)
      const dates = screen.getByTestId('event-snippet-dates')
      expect(dates).toHaveTextContent('1988-01-01 - 1988-07-24')
    })

    it('renders the took place at data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Event/i)
      const location = screen.getByTestId('event-snippet-took-place-at')
      expect(location).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
