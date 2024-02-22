import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import productionEventMockApi from './utils/productionEventMockApi'
import visualItemsMockApi from './utils/visualItemsMockApi'

describe('Visual Item page', () => {
  const page = '/view/visual/mock-visual-item'

  beforeEach(async () => {
    visualItemsMockApi()
    productionEventMockApi()
  })

  describe('About', () => {
    it('renders the non primary name titles', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Visual Item Name/i)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Type/i)
      const types = screen.getByTestId('works-types-link-container')
      expect(types).toBeInTheDocument()
    })

    it('renders about data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock About/i)
      const about = screen.getByTestId('works-about-link-container')
      expect(about).toBeInTheDocument()
    })

    it('renders the represents', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Represents/i)
      const represents = screen.getByTestId('works-represents-link-container')
      expect(represents).toBeInTheDocument()
    })

    it('renders the work publication event', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Publication/i)
      const statement = screen.getByTestId('works-publication-container')
      expect(statement).toBeInTheDocument()
    })

    it('renders the creation event', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Creation/i)
      const notes = screen.getByTestId('works-creation-container')
      expect(notes).toBeInTheDocument()
    })

    it('renders the visual item notes', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Notes Label/i)
      const notes = screen.getByTestId('works-notes-container-0')
      expect(notes).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
