import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { sortBy } from '../../config/sortingOptions'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import estimatesMockApi from './utils/estimatesMockApi'
import placeResultsMockApi from './utils/placeResultsMockApi'
import eventTrackingMock from './utils/eventTrackingMock'
import sharedMock from './utils/sharedMockApi'

describe('Place results page', () => {
  const page =
    '/view/results/places?q=%7B"AND"%3A%5B%7B"text"%3A"andy"%2C"_lang"%3A"en"%7D%2C%7B"text"%3A"warhol"%2C"_lang"%3A"en"%7D%5D%7D&sq=andy+warhol'

  beforeEach(async () => {
    placeResultsMockApi()
    sharedMock()
    estimatesMockApi()
    cmsMockApi()
    eventTrackingMock()
  })

  describe('Results header', () => {
    it('renders the correct title', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Places results/i)
      const title = screen.getByTestId('results-header-title')
      expect(title).toHaveTextContent('10 Places results')
    })

    it('renders the correct results descriptor', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Places results/i)
      const descriptor = screen.getByTestId('results-page-cms-descriptor')
      expect(descriptor).toHaveTextContent('Description of the places results.')
    })
  })

  describe('SortDropdown', () => {
    it('renders the correct dropdown options', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Pittsburgh/i)

      // Click on the sorting dropdown
      const sortDropdownButton = screen.getByTestId('sorting-dropdown-button')
      await act(async () => {
        fireEvent.click(sortDropdownButton)
      })
      const options = screen.getAllByTestId('search-results-sorting-option')
      const placesSortingOptions = Object.keys(sortBy.places)
      expect(options.length).toBe(placesSortingOptions.length)
    })
  })

  describe('PlaceSnippet', () => {
    it('renders the title with the link to the record', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Pittsburgh/i)
      const header = screen.getByTestId('place-results-snippet-title')
      expect(header).toHaveTextContent('Pittsburgh')
    })

    it('renders the types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Pittsburgh/i)
      const types = screen.getByTestId('entity-type-list')
      expect(types).toBeInTheDocument()
    })

    it('renders the hierarchy', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Pittsburgh/i)
      const hierarchy = screen.getByTestId(
        'place-snippet-generic-breadcrumb-hierarchy',
      )
      expect(hierarchy).toBeInTheDocument()
    })

    it('renders the map component', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Pittsburgh/i)
      const map = screen.getByTestId('map-container')
      expect(map).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
