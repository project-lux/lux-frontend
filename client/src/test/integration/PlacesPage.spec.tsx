import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import placeMockApi from './utils/placesMockApi'

jest.mock('leaflet')

describe('Place page', () => {
  const page = '/view/place/mock-place'

  beforeEach(async () => {
    placeMockApi()
  })

  describe('About', () => {
    it('renders the place About name header', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Pittsburgh/i)
      const name = screen.getByTestId('place-page-about-header')
      expect(name).toBeInTheDocument()
    })

    it('renders the place names', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Pittsburgh/i)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the place types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Type/i)
      const types = screen.getByTestId('place-types-link-container')
      expect(types).toBeInTheDocument()
    })

    it('renders the place web pages', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/testing.com/i)
      const links = screen.getByTestId('place-web-pages-0-external-link')
      expect(links).toBeInTheDocument()
    })

    it('renders the place notes', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Note/i)
      const notes = screen.getByTestId('notes-container-0')
      expect(notes).toBeInTheDocument()
    })

    it('renders the place breadcrumb hierarchy', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Pennsylvania/i)
      const hierarchy = screen.getByTestId('generic-breadcrumb-hierarchy')
      expect(hierarchy).toBeInTheDocument()
    })

    it('renders the place map', async () => {
      render(<AppRender route={page} />)

      await screen.getByTestId('map-container')
      const map = screen.getByTestId('map-container')
      expect(map).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
