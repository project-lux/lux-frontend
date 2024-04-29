import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { sortBy } from '../../config/sortingOptions'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import estimatesMockApi from './utils/estimatesMockApi'
import personAndGroupResultsMockApi from './utils/personAndGroupMockApi'
import siteImproveMock from './utils/mockSiteImprove'

describe('Person and Group results page', () => {
  const page =
    '/view/results/people?q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol'

  beforeEach(async () => {
    personAndGroupResultsMockApi()
    estimatesMockApi()
    cmsMockApi()
    siteImproveMock()
  })

  describe('Results header', () => {
    it('renders the correct title', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/People & Groups results/i)
      const title = screen.getByTestId('results-header-title')
      expect(title).toHaveTextContent('64 People & Groups results')
    })

    it('renders the correct results descriptor', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/People & Groups results/i)
      const descriptor = screen.getByTestId('results-page-cms-descriptor')
      expect(descriptor).toHaveTextContent(
        'Description of the people and groups results.',
      )
    })

    it('renders the grid view button', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/People & Groups results/i)
      const icon = screen.getByTestId('switch-to-grid-view-button')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Person and group results grid view', () => {
    const gridViewPage =
      '/view/results/people?q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol&view=grid'

    it('renders the list view button', async () => {
      const { findAllByText } = render(<AppRender route={gridViewPage} />)

      await findAllByText(/People & Groups results/i)
      const icon = screen.getByTestId('switch-to-list-view-button')
      expect(icon).toBeInTheDocument()
    })

    it('renders the person title', async () => {
      const { findAllByText } = render(<AppRender route={gridViewPage} />)

      await findAllByText(/Mock Person/i)
      const title = screen.getByTestId(
        'grid-view-person-group-results-snippet-title',
      )
      expect(title).toHaveTextContent('Mock Person')
    })

    it('renders the birth and death dates', async () => {
      render(<AppRender route={gridViewPage} />)

      const dates = screen.getByTestId('start-end-dates')
      expect(dates).toHaveTextContent('1950-2000')
    })

    it('renders the image in grid view', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Person/i)
      const icon = screen.getByTestId('results-snippet-preview-image')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('SortDropdown', () => {
    it('renders the correct dropdown options', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Person/i)

      // Click on the sorting dropdown
      const sortDropdownButton = screen.getByTestId('sorting-dropdown-button')
      await act(async () => {
        fireEvent.click(sortDropdownButton)
      })
      const options = screen.getAllByTestId('search-results-sorting-option')
      const peopleAndGroupsSortingOptions = Object.keys(sortBy.people)
      expect(options.length).toBe(peopleAndGroupsSortingOptions.length)
    })
  })

  describe('PersonSnippet', () => {
    it('renders the title with the link to the record', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Person/i)
      const header = screen.getByTestId('person-group-results-snippet-title')
      expect(header).toHaveTextContent('Mock Person')
    })

    it('renders birth and death date', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Person/i)
      const dates = screen.getByTestId('start-end-dates')
      expect(dates).toHaveTextContent('1950-2000')
    })

    it('renders the occupation', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Person/i)
      const occupation = screen.getByTestId(
        'person-group-result-snippet-occupation',
      )
      expect(occupation).toBeInTheDocument()
    })

    it('renders the nationality', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Person/i)
      const nationality = screen.getByTestId(
        'person-group-result-snippet-nationality',
      )
      expect(nationality).toBeInTheDocument()
    })

    it('renders the image', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Person/i)
      const icon = screen.getByTestId('results-snippet-preview-image')
      expect(icon).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
