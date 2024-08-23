import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import groupMockApi from './utils/groupMockApi'
import eventTrackingMock from './utils/eventTrackingMock'
import sharedMock from './utils/sharedMockApi'

describe('Group page', () => {
  const page = '/view/group/mock-group'

  beforeEach(async () => {
    groupMockApi()
    sharedMock()
    eventTrackingMock()
  })

  describe('About', () => {
    it('renders the names', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Group/i)
      const name = screen.getByTestId('names-container')
      expect(name).toBeInTheDocument()
    })

    it('renders the formation date', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/1990/i)
      const date = screen.getByText('4/10/1990')
      expect(date).toBeInTheDocument()
    })

    it('renders the formation place', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Formation Place/i)
      const place = screen.getByTestId('group-formed-location')
      expect(place).toBeInTheDocument()
    })

    it('renders the dissolution date', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/1994/i)
      const date = screen.getByText('5/13/1994')
      expect(date).toBeInTheDocument()
    })

    it('renders the dissolution place', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Dissolution Place/i)
      const place = screen.getByTestId('group-dissolved-location')
      expect(place).toBeInTheDocument()
    })

    it('renders the formed by data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Formed By Person/i)
      const formed = screen.getByTestId('group-formed-by-links-container')
      expect(formed).toBeInTheDocument()
    })

    it('renders the dissolved by data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Dissolved By Person/i)
      const dissolved = screen.getByTestId('group-dissolved-by-links-container')
      expect(dissolved).toBeInTheDocument()
    })

    it('renders the member of', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Member Of/i)
      const member = screen.getByTestId('member-of-links-container')
      expect(member).toBeInTheDocument()
    })

    it('renders the classified as data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Classified As/i)
      const about = screen.getByTestId('classified-as-links-container-0')
      expect(about).toBeInTheDocument()
    })

    it('renders the residence', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Residence/i)
      const residence = screen.getByTestId('group-residence-links-container')
      expect(residence).toBeInTheDocument()
    })

    it('renders the professional activity', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Professional Activities/i)
      const map = screen.getByTestId('agent-activity-container')
      expect(map).toBeInTheDocument()
    })

    it('renders the group web pages', async () => {
      render(<AppRender route={page} />)

      await screen.getByText('Web Pages')
      const links = screen.getByText('http://www.mock.org/')
      expect(links).toBeInTheDocument()
    })

    it('renders the notes', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Description/i)
      const notes = screen.getByTestId('notes-container-0')
      expect(notes).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
