import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import eventTrackingMock from './utils/eventTrackingMock'

describe('CmsRoutingComponent', () => {
  beforeEach(() => {
    cmsMockApi()
    eventTrackingMock()
  })

  afterEach(cleanup)

  describe('About pages', () => {
    it('renders the about page for a valid about route', async () => {
      const { findAllByText } = render(<AppRender route="/content/about-lux" />)

      await findAllByText(/About LUX/i)
      const page = screen.getByTestId('about-page')
      expect(page).toBeInTheDocument()
    })
  })

  describe('Open Access pages', () => {
    it('renders the content page for a valid open access route', async () => {
      const { findAllByText } = render(
        <AppRender route="/content/open-access" />,
      )

      await findAllByText(/Open Access/i)
      const page = screen.getByTestId('open-access-page')
      expect(page).toBeInTheDocument()
    })
  })

  describe('Terms of Use page', () => {
    it('renders the terms of use page for the terms-of-use route', async () => {
      const { findAllByText } = render(
        <AppRender route="/content/terms-of-use" />,
      )

      await findAllByText(/This is a test of the terms of use page body./i)
      const page = screen.getByTestId('terms-of-use-page')
      expect(page).toBeInTheDocument()
    })

    it('renders the terms of use page header', async () => {
      const { findAllByText } = render(
        <AppRender route="/content/terms-of-use" />,
      )

      await findAllByText(/This is a test of the terms of use page body./i)
      const header = screen.getByTestId('terms-of-use-page-header')
      expect(header).toBeInTheDocument()
    })

    it('renders the terms of use page body', async () => {
      const { findAllByText } = render(
        <AppRender route="/content/terms-of-use" />,
      )

      await findAllByText(/This is a test of the terms of use page body./i)
      const body = screen.getByTestId('terms-of-use-page-body')
      expect(body).toBeInTheDocument()
    })
  })

  describe('FAQ pages', () => {
    const faqPage = '/content/faq'
    it('renders the faq page for the faq route', async () => {
      const { findAllByText } = render(<AppRender route={faqPage} />)

      await findAllByText(/Frequently Asked Questions/i)
      const page = screen.getByTestId('faq-page')
      expect(page).toBeInTheDocument()
    })

    it('renders the faq page body for the advanced search terms route', async () => {
      const { findAllByText } = render(
        <AppRender route="/content/advanced-search-terms" />,
      )

      await findAllByText(/Frequently Asked Questions/i)
      const body = screen.getByText('Advanced Search Terms')
      expect(body).toBeInTheDocument()
    })

    it('renders the title', async () => {
      const { findAllByText } = render(<AppRender route={faqPage} />)

      await findAllByText(/Frequently Asked Questions/i)
      const header = screen.getByTestId('faq-page-header')
      expect(header).toBeInTheDocument()
    })

    it('renders the faq side bar', async () => {
      const { findAllByText } = render(<AppRender route={faqPage} />)

      await findAllByText(/Frequently Asked Questions/i)
      const sideBar = screen.getByTestId('faq-page-side-bar')
      expect(sideBar).toBeInTheDocument()
    })

    it('renders the faq page group section', async () => {
      const { findAllByText } = render(<AppRender route={faqPage} />)

      await findAllByText(/Frequently Asked Questions/i)
      const content = screen.getByTestId('faq-page-body-0')
      expect(content).toBeInTheDocument()
    })

    it('renders the faq page accordion', async () => {
      const { findAllByText } = render(<AppRender route={faqPage} />)

      await findAllByText(/Question One/i)
      const content = screen.getByTestId('question-one-accordion-item')
      expect(content).toBeInTheDocument()
    })
  })

  describe('Unknown routes', () => {
    it('renders a 404 error page for an unrecognized content route', async () => {
      const { findAllByText } = render(
        <AppRender route="/content/not-a-real-page" />,
      )

      await findAllByText(/Sorry/i)
      const errorPage = screen.getByTestId('error-page')
      expect(errorPage).toBeInTheDocument()
    })
  })
})
