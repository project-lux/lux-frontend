import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { physicalObject as mockObject } from '../../../data/object'
import PreviewImageOrIcon from '../../../../features/common/PreviewImageOrIcon'

const mockImages = [
  {
    imageUrls: ['image'],
    attribution: 'attribution',
  },
]

describe('PreviewImageOrIcon', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <PreviewImageOrIcon images={mockImages} entity={mockObject} />
      </BrowserRouter>,
    )

    const preview = screen.getByTestId('results-snippet-preview-image')
    expect(preview).toBeInTheDocument()
  })

  it('renders the images thumbnail', async () => {
    render(
      <BrowserRouter>
        <PreviewImageOrIcon images={mockImages} entity={mockObject} />
      </BrowserRouter>,
    )

    const images = screen.getByTestId('image-thumbnail-container')
    expect(images).toBeInTheDocument()
  })

  it('renders the icon', async () => {
    render(<PreviewImageOrIcon images={[]} entity={mockObject} />)

    const icon = screen.getByTestId('entitiy-type-icon')
    expect(icon).toBeInTheDocument()
  })
})
