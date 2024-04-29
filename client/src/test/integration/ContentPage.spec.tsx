import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import siteImproveMock from './utils/mockSiteImprove'

describe('Content page', () => {
  const page = '/content/open-access'

  beforeEach(async () => {
    cmsMockApi()
    siteImproveMock()
  })

  it('renders', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/Open Access/i)
    const aboutPage = screen.getByTestId('content-page')
    expect(aboutPage).toBeInTheDocument()
  })

  it('renders the title', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/Content page body/i)
    const header = screen.getByTestId('content-page-header')
    expect(header).toBeInTheDocument()
  })

  it('renders the content page body', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/Content page body/i)
    const content = screen.getByTestId('content-page-body')
    expect(content).toBeInTheDocument()
  })

  afterEach(cleanup)
})
