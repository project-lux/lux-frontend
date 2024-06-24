import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import conceptMockApi from './utils/conceptMockApi'
import eventTrackingMock from './utils/eventTrackingMock'

describe('Concept page', () => {
  const page = '/view/concept/mock-concept'

  beforeEach(async () => {
    conceptMockApi()
    eventTrackingMock()
  })

  describe('About', () => {
    it('renders the concept About name header', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Concept/i)
      const name = screen.getByTestId('concept-about-header')
      expect(name).toBeInTheDocument()
    })

    it('renders the concept names', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Concept/i)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the concept types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Type/i)
      const types = screen.getByTestId('concept-types-link-container')
      expect(types).toBeInTheDocument()
    })

    it('renders the concept influenced by', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Influenced By/i)
      const types = screen.getByTestId('concept-influences-link-container')
      expect(types).toBeInTheDocument()
    })

    it('renders the concept notes', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Rights Statement/i)
      const notes = screen.getByTestId('notes-container-0')
      expect(notes).toBeInTheDocument()
    })

    it('renders the concept breadcrumb hierarchy', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Concept Parent/i)
      const notes = screen.getByTestId(
        'concept-page-generic-breadcrumb-hierarchy',
      )
      expect(notes).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
