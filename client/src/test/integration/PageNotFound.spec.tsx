import { render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'

describe('Page not found', () => {
  const page = '/fake/page'

  it('renders the 404 error', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/Sorry/i)
    const errorPage = screen.getByTestId('error-page')
    expect(errorPage).toBeInTheDocument()
  })
})
