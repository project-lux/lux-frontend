import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import config from '../../../config/config'
import ExternalLink from '../../../features/common/ExternalLink'

describe('ExternalLink', () => {
  const linkName = 'test link'
  const id = 'test'

  it('renders', () => {
    render(
      <BrowserRouter>
        <ExternalLink url={config.env.dataApiBaseUrl} name={linkName} id={id} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('test-external-link')
    expect(link).toBeInTheDocument()
  })

  it('renders the name', () => {
    render(
      <BrowserRouter>
        <ExternalLink url={config.env.dataApiBaseUrl} name={linkName} id={id} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('test-external-link')
    expect(link).toHaveTextContent('test link')
  })

  it('contains the correct href', () => {
    render(
      <BrowserRouter>
        <ExternalLink url={config.env.dataApiBaseUrl} name={linkName} id={id} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('test-external-link')
    expect(link).toHaveAttribute('href', config.env.dataApiBaseUrl)
  })
})
