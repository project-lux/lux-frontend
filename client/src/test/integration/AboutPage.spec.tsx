import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'

describe('About page', () => {
  const page = '/content/about-lux'

  beforeEach(async () => {
    cmsMockApi()
  })

  it('renders', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/About LUX/i)
    const aboutPage = screen.getByTestId('about-page')
    expect(aboutPage).toBeInTheDocument()
  })

  it('renders the CMS content title', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/About LUX/i)
    const header = screen.getByTestId('about-page-header')
    expect(header).toBeInTheDocument()
  })

  it('renders the about side bar', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/About LUX/i)
    const sideBar = screen.getByTestId('about-page-side-bar')
    expect(sideBar).toBeInTheDocument()
  })

  it('renders the about page content', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/About Page/i)
    const content = screen.getByTestId('about-page-body')
    expect(content).toBeInTheDocument()
  })

  afterEach(cleanup)
})
