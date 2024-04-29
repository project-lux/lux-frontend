import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import collectionsMockApi from './utils/collectionsMockApi'
import productionEventMockApi from './utils/productionEventMockApi'
import siteImproveMock from './utils/mockSiteImprove'

describe('Collection page', () => {
  const page = '/view/set/mock-collection'

  beforeEach(async () => {
    collectionsMockApi()
    productionEventMockApi()
    siteImproveMock()
  })

  describe('About', () => {
    it('renders the About name header', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Collection/i)
      const name = screen.getByTestId('collection-name-header')
      expect(name).toHaveTextContent('About Mock Collection')
    })

    it('renders the names', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Collection/i)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the publication event', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Event Label/i)
      const event = screen.getByTestId('collection-publication-container')
      expect(event).toBeInTheDocument()
    })

    it('renders the collection hierarchy', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Parent of Collection/i)
      const hierarchy = screen.getByTestId('collections-hierarchy-0')
      expect(hierarchy).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
