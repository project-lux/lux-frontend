import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { sortBy } from '../../config/sortingOptions'
import { setMockLocation } from '../utils/mockUseLocation'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import estimatesMockApi from './utils/estimatesMockApi'
import workResultsMockApi from './utils/workResultsMockApi'
import eventTrackingMock from './utils/eventTrackingMock'
import sharedMock from './utils/sharedMockApi'

describe('Work results page', () => {
  const pathname = '/view/results/works'
  const search =
    'q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol&pageLength=20'
  const resultsPage = `${pathname}?${search}`

  beforeEach(async () => {
    workResultsMockApi()
    estimatesMockApi()
    cmsMockApi()
    eventTrackingMock()
    sharedMock()
    setMockLocation({ pathname, search })
  })

  describe('Results header', () => {
    it('renders the correct title', async () => {
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/results-header-title/i)
      const title = screen.getByTestId('results-header-title')
      expect(title).toHaveTextContent('1266 Works results')
    })

    it('renders the correct results descriptor', async () => {
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/results-page-cms-descriptor/i)
      const descriptor = screen.getByTestId('results-page-cms-descriptor')
      expect(descriptor).toHaveTextContent('Description of the works results.')
    })

    it('renders the grid view button', async () => {
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/switch-to-grid-view-button/i)
      const icon = screen.getByTestId('switch-to-grid-view-button')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('Works results grid view', () => {
    const gridSearch =
      'q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol&view=grid&pageLength=20'
    const gridResultsPage = `${pathname}?${gridSearch}`
    beforeEach(async () => {
      setMockLocation({ pathname, search: gridSearch })
    })
    it('renders the list view button', async () => {
      const { findByTestId } = render(<AppRender route={gridResultsPage} />)

      await findByTestId(/switch-to-list-view-button/i)
      const button = screen.getByTestId('switch-to-list-view-button')
      expect(button).toBeInTheDocument()
    })

    it('renders the work title', async () => {
      const { findByTestId } = render(<AppRender route={gridResultsPage} />)

      await findByTestId(/grid-view-work-results-snippet-title/i)
      const title = screen.getByTestId('grid-view-work-results-snippet-title')
      expect(title).toBeInTheDocument()
    })

    it('renders the event agent', async () => {
      render(<AppRender route={gridResultsPage} />)

      const agent = screen.getByTestId('production-snippet-agent-data')
      expect(agent).toBeInTheDocument()
    })

    it('renders the event dates', async () => {
      render(<AppRender route={gridResultsPage} />)

      const dates = screen.getByTestId('production-snippet-agent-data')
      expect(dates).toHaveTextContent('2009-01-01')
    })

    it('renders the icon if no image is available in grid view', async () => {
      const { findByTestId } = render(<AppRender route={gridResultsPage} />)

      await findByTestId(/results-snippet-icon/i)
      const icon = screen.getByTestId('results-snippet-icon')
      expect(icon).toBeInTheDocument()
    })
  })

  describe('SortDropdown', () => {
    it('renders the correct dropdown options', async () => {
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/sorting-dropdown-button/i)

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
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/results-snippet-title/i)
      const header = screen.getByTestId('results-snippet-title')
      expect(header).toHaveTextContent('Mock Work')
    })

    it('renders event agent and date', async () => {
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/production-snippet-agent-data/i)
      const creation = screen.getByTestId('production-snippet-agent-data')
      expect(creation).toHaveTextContent('Mock Person in 2009-01-01')
    })

    it('renders work types', async () => {
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/entity-type-list/i)
      const types = screen.getByTestId('entity-type-list')
      expect(types).toBeInTheDocument()
    })

    it('renders the work language', async () => {
      const { findAllByTestId } = render(<AppRender route={resultsPage} />)

      await findAllByTestId(/work-snippet-language/i)
      const language = screen.getByTestId('work-snippet-language')
      expect(language).toBeInTheDocument()
    })

    it('renders the language note', async () => {
      const { findAllByTestId } = render(<AppRender route={resultsPage} />)

      await findAllByTestId(/work-snippet-language-notes/i)
      const languageNote = screen.getByTestId('work-snippet-language-notes')
      expect(languageNote).toBeInTheDocument()
    })

    it('renders the imprint statement', async () => {
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/work-snippet-imprint-statement/i)
      const imprint = screen.getByTestId('work-snippet-imprint-statement')
      expect(imprint).toBeInTheDocument()
    })

    it('renders the identifiers', async () => {
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/work-snippet-identifiers/i)
      const identifiers = screen.getByTestId('work-snippet-identifiers')
      expect(identifiers).toBeInTheDocument()
    })

    it('renders the icon if no image is available', async () => {
      const { findByTestId } = render(<AppRender route={resultsPage} />)

      await findByTestId(/results-snippet-icon/i)
      const icon = screen.getByTestId('results-snippet-icon')
      expect(icon).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
