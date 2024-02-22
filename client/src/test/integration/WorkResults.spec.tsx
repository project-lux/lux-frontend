import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { sortBy } from '../../config/sortingOptions'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import estimatesMockApi from './utils/estimatesMockApi'
import workResultsMockApi from './utils/workResultsMockApi'

describe('Work results page', () => {
  const page =
    '/view/results/works?q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol'

  beforeEach(async () => {
    workResultsMockApi()
    estimatesMockApi()
    cmsMockApi()
  })

  describe('Results header', () => {
    it('renders the correct title', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Works results/i)
      const title = screen.getByTestId('results-header-title')
      expect(title).toHaveTextContent('1266 Works results')
    })

    it('renders the correct results descriptor', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Works results/i)
      const descriptor = screen.getByTestId('results-page-cms-descriptor')
      expect(descriptor).toHaveTextContent('Description of the works results.')
    })

    it('renders the grid view button', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Works results/i)
      const icon = screen.getByTestId('switch-to-grid-view-button')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Works results grid view', () => {
    const gridViewPage =
      '/view/results/works?q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol&view=grid'

    it('renders the list view button', async () => {
      const { findAllByText } = render(<AppRender route={gridViewPage} />)

      await findAllByText(/Works results/i)
      const button = screen.getByTestId('switch-to-list-view-button')
      expect(button).toBeInTheDocument()
    })

    it('renders the work title', async () => {
      const { findAllByText } = render(<AppRender route={gridViewPage} />)

      await findAllByText(/Mock Work/i)
      const title = screen.getByTestId('grid-view-work-results-snippet-title')
      expect(title).toHaveTextContent('Mock Work')
    })

    it('renders the event agent', async () => {
      render(<AppRender route={gridViewPage} />)

      const agent = screen.getByTestId('production-snippet-agent-data')
      expect(agent).toBeInTheDocument()
    })

    it('renders the event dates', async () => {
      render(<AppRender route={gridViewPage} />)

      const dates = screen.getByTestId('production-snippet-agent-data')
      expect(dates).toHaveTextContent('2009-01-01')
    })

    it('renders the icon if no image is available in grid view', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)
      const icon = screen.getByTestId('results-snippet-icon')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('SortDropdown', () => {
    it('renders the correct dropdown options', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)

      // Click on the sorting dropdown
      const sortDropdownButton = screen.getByTestId('sorting-dropdown-button')
      await act(async () => {
        fireEvent.click(sortDropdownButton)
      })
      const options = screen.getAllByTestId('search-results-sorting-option')
      const worksSortingOptions = Object.keys(sortBy.works)
      expect(options.length).toBe(worksSortingOptions.length)
    })
  })

  describe('WorkSnippet', () => {
    it('renders the title with the link to the record', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)
      const header = screen.getByTestId('work-results-snippet-title')
      expect(header).toHaveTextContent('Mock Work')
    })

    it('renders event agent and date', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)
      const creation = screen.getByTestId('production-snippet-agent-data')
      expect(creation).toHaveTextContent('Mock Person in 2009-01-01')
    })

    it('renders work types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)
      const types = screen.getByTestId('entity-type-list')
      expect(types).toBeInTheDocument()
    })

    it('renders the language', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)
      const language = screen.getByTestId('work-snippet-language')
      expect(language).toBeInTheDocument()
    })

    it('renders the language note', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)
      const languageNote = screen.getByTestId('work-snippet-language-notes')
      expect(languageNote).toBeInTheDocument()
    })

    it('renders the imprint statement', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)
      const imprint = screen.getByTestId('work-snippet-imprint-statement')
      expect(imprint).toBeInTheDocument()
    })

    it('renders the identifiers', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)
      const identifiers = screen.getByTestId('work-snippet-identifiers')
      expect(identifiers).toBeInTheDocument()
    })

    it('renders the icon if no image is available', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work/i)
      const icon = screen.getByTestId('results-snippet-icon')
      expect(icon).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
