import { render, screen } from '@testing-library/react'
import React from 'react'

import TextContainer from '../../../features/common/TextContainer'

describe('TextContainer', () => {
  it('renders', async () => {
    render(
      <TextContainer>
        <p>child</p>
      </TextContainer>,
    )

    const container = screen.getByTestId('text-container')
    expect(container).toBeInTheDocument()
  })

  it('renders children', async () => {
    render(
      <TextContainer>
        <p data-testid="text-container-child">child</p>
      </TextContainer>,
    )

    const child = screen.getByTestId('text-container-child')
    expect(child).toBeInTheDocument()
  })

  it('renders TextLabel', async () => {
    render(
      <TextContainer>
        <p>child</p>
      </TextContainer>,
    )

    const label = screen.getByTestId('text-label')
    expect(label).toBeInTheDocument()
  })
})
