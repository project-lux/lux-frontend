import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import config from '../../config/config'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import statsMockApi from './utils/statsMockApi'

describe('Landing page', () => {
  const page = '/'

  beforeEach(async () => {
    cmsMockApi()
    statsMockApi()
  })

  describe('Search bar', () => {
    it('renders', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const searchBar = screen.getByTestId(
        'landing-page-search-container-simple-search-form',
      )
      expect(searchBar).toBeInTheDocument()
    })

    it('renders a disabled search button if text is invalid', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const input = screen.getByTestId(
        'landing-page-search-container-search-submit-input',
      )
      // type invalid data
      await act(async () => {
        fireEvent.change(input, { target: { value: '    ' } })
      })

      // get the search button
      const button = screen.getByTestId(
        'landing-page-search-container-search-submit-button',
      )
      expect(button).toBeDisabled()
    })

    it('renders a enabled search button if text is valid', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const input = screen.getByTestId(
        'landing-page-search-container-search-submit-input',
      )
      // type valid data
      await act(async () => {
        fireEvent.change(input, { target: { value: 'andy warhol' } })
      })
      // get the search button
      const button = screen.getByTestId(
        'landing-page-search-container-search-submit-button',
      )
      expect(button).toBeEnabled()
    })

    it('renders an error message if the text input fails translating', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const input = screen.getByTestId(
        'landing-page-search-container-search-submit-input',
      )
      // type invalid string for translation
      await act(async () => {
        fireEvent.change(input, {
          target: { value: '{ name: "andy warhol"' },
        })
      })

      // get the search button
      const button = screen.getByTestId(
        'landing-page-search-container-search-submit-button',
      )
      await act(async () => {
        fireEvent.click(button)
      })

      await findAllByText(/Invalid search string detected/)
      const alert = screen.getByTestId('search-error-message')
      expect(alert).toBeInTheDocument()
    })

    it('renders the advanced search button', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const dropdown = screen.getByTestId(
        'landing-page-search-container-advanced-search-switch-dropdown-toggle',
      )
      expect(dropdown).toBeInTheDocument()
    })
  })

  describe('What Is LUX', () => {
    it('renders', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const section = screen.getByTestId('what-is-lux')
      expect(section).toBeInTheDocument()
    })

    it('renders What is LUX section hero image', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const container = screen.getByTestId('hero-image-container')
      expect(container).toBeInTheDocument()
    })

    it('renders What is LUX section collection link', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const link = screen.getByTestId('hero-image-caption-link')
      expect(link).toBeInTheDocument()
    })
  })

  describe('Featured collections', () => {
    it('renders', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/YUAG attributes title/i)
      const collections = screen.getByTestId('featured-collections-container')
      expect(collections).toBeInTheDocument()
    })
  })

  describe('More About LUX', () => {
    it('renders', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const about = screen.getByTestId('more-about-lux-container')
      expect(about).toBeInTheDocument()
    })
  })

  describe('Whats in LUX', () => {
    it('renders', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/What's in LUX/i)
      const section = screen.getByTestId('whats-in-lux-container')
      expect(section).toBeInTheDocument()
    })
  })

  describe('additional information', () => {
    it('renders', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const descriptor = screen.getByTestId('footer-blocks-section')
      expect(descriptor).toBeInTheDocument()
    })

    it('renders the footer', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const footer = screen.getByTestId('lux-footer')
      expect(footer).toBeInTheDocument()
    })

    it('renders the contact link', async () => {
      const { findAllByText } = render(<AppRender route={page} />)

      await findAllByText(/Explore Yale Collections/i)
      const link = screen.getByTestId('feedback-external-link')
      expect(link).toHaveAttribute(
        'href',
        `${config.env.luxFeedbackUrl}https%3A%2F%2Fendpoint.yale.edu%2F`,
      )
    })
  })

  afterEach(cleanup)
})
