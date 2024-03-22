import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import linguisticObjectsMockApi from './utils/linguisticObjectsMockApi'
import siteImproveMock from './utils/mockSiteImprove'

describe('Linguistic Object page', () => {
  const page = '/view/text/mock-linguistic-object'

  beforeEach(async () => {
    linguisticObjectsMockApi()
    siteImproveMock()
  })

  describe('Files containing work', () => {
    it('renders the included works', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/This work is included in the following objects/i)
      const container = screen.getByTestId('carried-by-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('About', () => {
    it('renders the non primary name titles', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Work Display Name/i)
      const names = screen.getByTestId('names-container')
      expect(names).toBeInTheDocument()
    })

    it('renders the identifiers', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/ils:yul:11519799/i)
      const id = screen.getByTestId('identifiers-list-row-0')
      expect(id).toBeInTheDocument()
    })

    it('renders the identifier value', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/ils:yul:11519799/i)
      const id = screen.getByTestId('identifier-value-0')
      expect(id).toBeInTheDocument()
    })

    it('renders the identifier carried out by', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/ils:yul:11519799/i)
      const carriedOutBy = screen.getByTestId('identifier-carried-out-by-0')
      expect(carriedOutBy).toBeInTheDocument()
    })

    it('renders the part of data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Part of/i)
      const partOf = screen.getByTestId('works-part-of-link-container')
      expect(partOf).toBeInTheDocument()
    })

    it('renders the types', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Type/i)
      const types = screen.getByTestId('works-types-link-container')
      expect(types).toBeInTheDocument()
    })

    it('renders the languages', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Mock Language/i)
      const languages = screen.getByTestId('works-languages-link-container')
      expect(languages).toBeInTheDocument()
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

    it('renders the linguistic object notes', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Notes Label/i)
      const notes = screen.getByTestId('works-notes-container-0')
      expect(notes).toBeInTheDocument()
    })
  })

  describe('How do I see it', () => {
    it('renders the component', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/How do I see it/i)
      const component = screen.getByTestId('works-how-do-i-see-it')
      expect(component).toBeInTheDocument()
    })

    it('renders the site links', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/How do I see it/i)
      const links = screen.getByTestId('works-site-links-0')
      expect(links).toBeInTheDocument()
    })
  })

  describe('Can I reuse it', () => {
    it('renders the component', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Can I re-use it/i)
      const component = screen.getByTestId('can-i-reuse-it')
      expect(component).toBeInTheDocument()
    })

    it('renders the subject to data', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Can I re-use it/i)
      const copyright = screen.getByTestId('subject-to-external-link')
      expect(copyright).toBeInTheDocument()
    })
  })

  afterEach(cleanup)
})
