import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import FeedbackButton from '../../../../features/common/FeedbackButton'
import config from '../../../../config/config'

const mockPathname = `${config.env.dataApiBaseUrl}mock-path`

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => ({
      pathname: mockPathname,
      search: '',
    }),
  }
})

describe('FeedbackButton', () => {
  it('renders', async () => {
    render(<FeedbackButton />)

    const link = screen.getByTestId('submit-feedback-button')
    expect(link).toBeInTheDocument()
  })

  it('renders with correct href', async () => {
    render(<FeedbackButton />)

    const link = screen.getByTestId('submit-feedback-button')
    expect(link).toHaveAttribute(
      'href',
      `${config.env.luxFeedbackUrl}https%3A%2F%2Fendpoint.yale.edu%2Fttps%3A%2F%2Fendpoint.yale.edu%2Fmock-path`,
    )
  })

  describe('FeedbackButton when linkName is provided', () => {
    it('renders the link', async () => {
      render(
        <BrowserRouter>
          <FeedbackButton linkName="contact" />
        </BrowserRouter>,
      )

      const link = screen.getByTestId('feedback-external-link')
      expect(link).toBeInTheDocument()
    })

    it('renders the link with the correct name', async () => {
      render(
        <BrowserRouter>
          <FeedbackButton linkName="contact" />
        </BrowserRouter>,
      )

      const link = screen.getByTestId('feedback-external-link')
      expect(link).toHaveTextContent('contact')
    })

    it('renders the link with the correct href', async () => {
      render(
        <BrowserRouter>
          <FeedbackButton linkName="contact" />
        </BrowserRouter>,
      )

      const link = screen.getByTestId('feedback-external-link')
      expect(link).toHaveAttribute(
        'href',
        `${config.env.luxFeedbackUrl}https%3A%2F%2Fendpoint.yale.edu%2Fttps%3A%2F%2Fendpoint.yale.edu%2Fmock-path`,
      )
    })
  })
})
