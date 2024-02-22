import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import eventsMockApi from './utils/eventsMockApi'

describe('Events page', () => {
  const page = '/view/activity/mock-event'

  beforeEach(async () => {
    eventsMockApi()
  })

  describe('About', () => {
    it('renders the title', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Event/i)
      const header = screen.getByTestId('event-about-header')
      expect(header).toBeInTheDocument()
    })

    it('renders the additional titles', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Event/i)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the carried out by data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Agent/i)
      const container = screen.getByTestId('event-agent-link-container')
      expect(container).toBeInTheDocument()
    })

    it('renders the dates', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Dates/i)
      const date = screen.getByTestId('event-date-container')
      expect(date).toBeInTheDocument()
    })

    it('renders the location', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Location/i)
      const location = screen.getByTestId('event-location-link-container')
      expect(location).toBeInTheDocument()
    })

    it('renders the types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Types/i)
      const types = screen.getByTestId('event-types-link-container')
      expect(types).toBeInTheDocument()
    })

    it('renders the identifiers', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Identifier Label/i)
      const identifiers = screen.getByText(/407-1988-05-29/i)
      expect(identifiers).toBeInTheDocument()
    })

    it('renders the objects', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Objects/i)
      const objects = screen.getByTestId('event-objects-link-container')
      expect(objects).toBeInTheDocument()
    })

    it('renders the part container', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Transferred Title Of/i)
      const part = screen.getByTestId('event-part-container-0')
      expect(part).toBeInTheDocument()
    })

    it('renders the part date', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/1900-01-01 - 2000-01-01/i)
      const part = screen.getByText('1900-01-01 - 2000-01-01')
      expect(part).toBeInTheDocument()
    })

    it('renders the notes', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Notes Label/i)
      const note = screen.getByTestId('notes-container-0')
      expect(note).toBeInTheDocument()
    })
  })

  describe('How Do I See It?', () => {
    it('renders the link to the record on the unit site', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/View this item on the/i)
      const link = screen.getByTestId('event-unit-external-link')
      expect(link).toBeInTheDocument()
    })

    it('renders the link to the record on the unit site with correct href', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/View this item on the/i)
      const link = screen.getByTestId('event-unit-external-link')
      expect(link).toHaveAttribute(
        'href',
        'https://artgallery.yale.edu/exhibitions/exhibition/test-unit-link',
      )
    })
  })

  afterEach(cleanup)
})
