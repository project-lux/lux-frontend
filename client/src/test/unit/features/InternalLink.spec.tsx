import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import config from '../../../config/config'
import InternalLink from '../../../features/common/InternalLink'

const mockUri = `${config.env.dataApiBaseUrl}data/test`
const mockName = 'Mock Link Name'

describe('InternalLink', () => {
  it('renders with correct name', async () => {
    render(
      <BrowserRouter>
        <InternalLink uri={mockUri} name={mockName} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('internal-link')
    expect(link).toHaveTextContent(mockName)
  })

  it('renders with correct href', async () => {
    render(
      <BrowserRouter>
        <InternalLink uri={mockUri} name={mockName} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('internal-link')
    expect(link).toHaveAttribute('href', `/view/test`)
  })
})
