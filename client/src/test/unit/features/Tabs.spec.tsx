import { render, screen } from '@testing-library/react'
import React from 'react'

import Tab from '../../../features/common/Tab'
import Tabs from '../../../features/common/Tabs'

describe('Tabs', () => {
  it('renders', async () => {
    render(
      <Tabs>
        <Tab title="Test Title 1">
          <p>testing 1</p>
        </Tab>
        <Tab title="Test Title 2">
          <p>testing 2</p>
        </Tab>
      </Tabs>,
    )

    const child = screen.getByTestId('tabs-unordered-list')
    expect(child).toBeInTheDocument()
  })

  it('renders TabButton', async () => {
    render(
      <Tabs>
        <Tab title="Test Title 1">
          <p>testing 1</p>
        </Tab>
        <Tab title="Test Title 2">
          <p>testing 2</p>
        </Tab>
      </Tabs>,
    )

    const button = screen.getByTestId('test-title-1-button')
    expect(button).toBeInTheDocument()
  })

  it('renders Tab', async () => {
    render(
      <Tabs>
        <Tab title="Test Title 1">
          <p data-testid="test-title-1-tab">testing 1</p>
        </Tab>
        <Tab title="Test Title 2">
          <p>testing 2</p>
        </Tab>
      </Tabs>,
    )

    const tab = screen.getByTestId('test-title-1-tab')
    expect(tab).toBeInTheDocument()
  })
})
