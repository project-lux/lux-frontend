import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import personMockApi from './utils/personMockApi'
import eventTrackingMock from './utils/eventTrackingMock'
import sharedMock from './utils/sharedMockApi'

describe('Person page', () => {
  const page = '/view/person/mock-person'

  beforeEach(async () => {
    personMockApi()
    sharedMock()
    eventTrackingMock()
  })

  describe('About', () => {
    it('renders the person names', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Person/i)
      const name = screen.getByTestId('names-container')
      expect(name).toBeInTheDocument()
    })

    it('renders the birth date', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/1950/i)
      const date = screen.getByText('3/4/1950')
      expect(date).toBeInTheDocument()
    })

    it('renders the birth place', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Birth Place/i)
      const location = screen.getByTestId('person-born-location')
      expect(location).toBeInTheDocument()
    })

    it('renders the death date', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/2000/i)
      const date = screen.getByText('5/10/2000')
      expect(date).toBeInTheDocument()
    })

    it('renders the death place', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Death Place/i)
      const location = screen.getByTestId('person-died-location')
      expect(location).toBeInTheDocument()
    })

    it('renders the classified as data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Occupation/i)
      const about = screen.getByTestId('classified-as-links-container-0')
      expect(about).toBeInTheDocument()
    })

    it('renders the member of', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Member Of/i)
      const memberOf = screen.getByTestId('member-of-links-container')
      expect(memberOf).toBeInTheDocument()
    })

    it('renders the professional activity', async () => {
      render(<AppRender route={page} />)

      const activity = screen.getByTestId('agent-activity-container')
      expect(activity).toBeInTheDocument()
    })

    it('renders the professional activity location', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Place of Activity/i)
      const location = screen.getByTestId('professional-activity-location')
      expect(location).toBeInTheDocument()
    })

    it('renders the professional activity type', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Activity Type/i)
      const type = screen.getByText('Mock Activity Type')
      expect(type).toBeInTheDocument()
    })

    it('renders the professional activity dates', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Professional Activities/i)
      const dates = screen.getByTestId('professional-activity-dates')
      expect(dates).toHaveTextContent('during 2000-2010')
    })

    it('renders the web pages', async () => {
      render(<AppRender route={page} />)

      await screen.getByText('Web Pages')
      const links = screen.getByText('http://www.mock.org')
      expect(links).toBeInTheDocument()
    })

    it('renders the person notes', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Note Label/i)
      const notes = screen.getByTestId('notes-container-0')
      expect(notes).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
