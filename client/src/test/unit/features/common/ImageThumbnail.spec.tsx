import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import ImageThumbnail from '../../../../features/common/ImageThumbnail'

const mockImageInfo = {
  imageUrls: ['test-url'],
  attribution: 'attribution',
}

describe('ImageThumbnail', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <ImageThumbnail imageInfo={mockImageInfo} />
      </BrowserRouter>,
    )

    const label = screen.getByTestId('image-thumbnail-container')
    expect(label).toBeInTheDocument()
  })

  it('renders the image as a link', async () => {
    render(
      <BrowserRouter>
        <ImageThumbnail imageInfo={mockImageInfo} linkUrl="test" />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('image-link')
    expect(link).toBeInTheDocument()
  })

  it('renders the image', async () => {
    render(
      <BrowserRouter>
        <ImageThumbnail imageInfo={mockImageInfo} />
      </BrowserRouter>,
    )

    const img = screen.getByTestId('img-thumbnail')
    expect(img).toBeInTheDocument()
  })

  it('renders the image with correct src', async () => {
    render(
      <BrowserRouter>
        <ImageThumbnail imageInfo={mockImageInfo} />
      </BrowserRouter>,
    )

    const img = screen.getByTestId('img-thumbnail')
    expect(img).toHaveAttribute('src', 'test-url')
  })

  it('renders the image attribution button', async () => {
    render(
      <BrowserRouter>
        <ImageThumbnail imageInfo={mockImageInfo} />
      </BrowserRouter>,
    )

    const button = screen.getByTestId('image-attribution-overlay-button')
    expect(button).toBeInTheDocument()
  })
})
