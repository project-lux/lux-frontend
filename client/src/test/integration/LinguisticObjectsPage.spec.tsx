import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import { setMockLocation } from '../utils/mockUseLocation'

import AppRender from './utils/AppRender'
import linguisticObjectsMockApi from './utils/linguisticObjectsMockApi'
import eventTrackingMock from './utils/eventTrackingMock'
import sharedMock from './utils/sharedMockApi'
import productionEventMockApi from './utils/productionEventMockApi'

describe('Linguistic Object page', () => {
  const page = '/view/text/mock-linguistic-object'

  beforeEach(async () => {
    linguisticObjectsMockApi()
    productionEventMockApi()
    sharedMock()
    eventTrackingMock()
    setMockLocation({ pathname: page })
  })

  describe('Objects containing work', () => {
    it('renders the included works', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/carried-by-container/i)
      const container = screen.getByTestId('carried-by-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('About linguistic object', () => {
    it('renders the non primary name titles', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/names-container/i)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the identifiers', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/identifiers-list-row-0/i)
      const id = screen.getByTestId('identifiers-list-row-0')
      expect(id).toBeInTheDocument()
    })

    it('renders the identifier value', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/identifier-value-0/i)
      const id = screen.getByTestId('identifier-value-0')
      expect(id).toBeInTheDocument()
    })

    it('renders the identifier carried out by', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/identifier-carried-out-by-0/i)
      const carriedOutBy = screen.getByTestId('identifier-carried-out-by-0')
      expect(carriedOutBy).toBeInTheDocument()
    })

    it('renders the part of data', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/works-part-of-link-container/i)
      const partOf = screen.getByTestId('works-part-of-link-container')
      expect(partOf).toBeInTheDocument()
    })

    it('renders the types', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/works-types-link-container/i)
      const types = screen.getByTestId('works-types-link-container')
      expect(types).toBeInTheDocument()
    })

    it('renders the linguistic object languages', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/works-languages-link-container/i)
      const languages = screen.getByTestId('works-languages-link-container')
      expect(languages).toBeInTheDocument()
    })

    it('renders the linguistic object publication event', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/works-publication-container/i)
      const statement = screen.getByTestId('works-publication-container')
      expect(statement).toBeInTheDocument()
    })

    it('renders the creation event', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/works-creation-container/i)
      const notes = screen.getByTestId('works-creation-container')
      expect(notes).toBeInTheDocument()
    })

    it('renders about data', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/works-about-link-container/i)
      const about = screen.getByTestId('works-about-link-container')
      expect(about).toBeInTheDocument()
    })

    it('renders the represents', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/works-represents-link-container/i)
      const represents = screen.getByTestId('works-represents-link-container')
      expect(represents).toBeInTheDocument()
    })

    it('renders the linguistic object notes', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/works-notes-container-0/i)
      const notes = screen.getByTestId('works-notes-container-0')
      expect(notes).toBeInTheDocument()
    })
  })

  describe('How do I see it', () => {
    it('renders the component', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/how-do-i-see-it/i)
      const component = screen.getByTestId('how-do-i-see-it')
      expect(component).toBeInTheDocument()
    })

    it('renders the site links', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/site-links/i)
      const links = screen.getByTestId('site-links')
      expect(links).toBeInTheDocument()
    })
  })

  describe('Can I reuse it', () => {
    it('renders the component', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/can-i-reuse-it/i)
      const component = screen.getByTestId('can-i-reuse-it')
      expect(component).toBeInTheDocument()
    })

    it('renders the subject to data', async () => {
      const { findAllByTestId } = render(<AppRender route={page} />)

      await findAllByTestId(/subject-to-external-link/i)
      const copyright = screen.getByTestId('subject-to-external-link')
      expect(copyright).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
