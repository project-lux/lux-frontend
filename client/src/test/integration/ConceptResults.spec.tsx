import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { sortBy } from '../../config/sortingOptions'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import conceptResultsMockApi from './utils/conceptResultsMockApi'
import estimatesMockApi from './utils/estimatesMockApi'
import eventTrackingMock from './utils/eventTrackingMock'

describe('Concept results page', () => {
  const page =
    '/view/results/concepts?q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol'

  beforeEach(async () => {
    conceptResultsMockApi()
    estimatesMockApi()
    cmsMockApi()
    eventTrackingMock()
  })

  describe('Results header', () => {
    it('renders the correct title', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Concepts results/i)
      const title = screen.getByTestId('results-header-title')
      expect(title).toHaveTextContent('55 Concepts results')
    })

    it('renders the correct results descriptor', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Concepts results/i)
      const descriptor = screen.getByTestId('results-page-cms-descriptor')
      expect(descriptor).toHaveTextContent(
        'Description of the concepts results.',
      )
    })
  })

  describe('SortDropdown', () => {
    it('renders the correct dropdown options', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Concept/i)

      // Click on the sorting dropdown
      const sortDropdownButton = screen.getByTestId('sorting-dropdown-button')
      await act(async () => {
        fireEvent.click(sortDropdownButton)
      })

      const options = screen.getAllByTestId('search-results-sorting-option')
      const conceptsSortingOptions = Object.keys(sortBy.concepts)
      expect(options.length).toBe(conceptsSortingOptions.length)
    })
  })

  describe('ConceptSnippet', () => {
    it('renders the title with the link to the record', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Concept/i)
      const header = screen.getByTestId('concept-results-snippet-title')
      expect(header).toHaveTextContent('Mock Concept')
    })

    it('renders the description', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Concept/i)
      const dates = screen.getByTestId('concept-snippet-description')
      expect(dates).toBeInTheDocument()
    })

    it('renders the hierarchy', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Concept/i)
      const hierarchy = screen.getByTestId(
        'concept-snippet-generic-breadcrumb-hierarchy',
      )
      expect(hierarchy).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
