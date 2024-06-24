import { cleanup, render, screen } from '@testing-library/react'
import React from 'react'

import AppRender from './utils/AppRender'
import cmsMockApi from './utils/cmsMockApi'
import eventTrackingMock from './utils/eventTrackingMock'

describe('FAQ page', () => {
  const page = '/content/faq'

  beforeEach(async () => {
    cmsMockApi()
    eventTrackingMock()
  })

  it('renders', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/Frequently Asked Questions/i)
    const aboutPage = screen.getByTestId('faq-page')
    expect(aboutPage).toBeInTheDocument()
  })

  it('renders the title', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/Frequently Asked Questions/i)
    const header = screen.getByTestId('faq-page-header')
    expect(header).toBeInTheDocument()
  })

  it('renders the faq side bar', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/Frequently Asked Questions/i)
    const sideBar = screen.getByTestId('faq-page-side-bar')
    expect(sideBar).toBeInTheDocument()
  })

  it('renders the faq page group section', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/Frequently Asked Questions/i)
    const content = screen.getByTestId('faq-page-body-0')
    expect(content).toBeInTheDocument()
  })

  it('renders the faq page accordion', async () => {
    const { findAllByText } = render(<AppRender route={page} />)

    await findAllByText(/Question One/i)
    const content = screen.getByTestId('question-one-accordion-item')
    expect(content).toBeInTheDocument()
  })

  afterEach(cleanup)
})
