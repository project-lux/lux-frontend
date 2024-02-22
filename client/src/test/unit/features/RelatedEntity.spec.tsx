import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { objectsIcon } from '../../../config/resources'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'
import RelatedEntity from '../../../features/common/RelatedEntity'

const mockName = 'Mock Object'
const mockEntity = reusableMinimalEntity(mockName)
const mockId = 'test'
const mockText = 'Physical Item'
const mockUri = 'testUri'

jest.mock('../../../redux/api/ml_api', () => ({
  useGetNameQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

describe('RelatedEntity', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <RelatedEntity
          icon={objectsIcon}
          text={mockText}
          uri={mockUri}
          id={mockId}
        />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('record-link')
    expect(link).toBeInTheDocument()
  })

  it('renders the img with icon', async () => {
    render(
      <BrowserRouter>
        <RelatedEntity
          icon={objectsIcon}
          text={mockText}
          uri={mockUri}
          id={mockId}
        />
      </BrowserRouter>,
    )

    const link = screen.getByTestId(`${mockId}-img-icon`)
    expect(link).toHaveAttribute('src', objectsIcon)
  })

  it('renders the text', async () => {
    render(
      <BrowserRouter>
        <RelatedEntity
          icon={objectsIcon}
          text={mockText}
          uri={mockUri}
          id={mockId}
        />
      </BrowserRouter>,
    )

    const text = screen.getByTestId(`${mockId}-term`)
    expect(text).toHaveTextContent(mockText)
  })

  it('renders the RecordLink', async () => {
    render(
      <BrowserRouter>
        <RelatedEntity
          icon={objectsIcon}
          text={mockText}
          uri={mockUri}
          id={mockId}
        />
      </BrowserRouter>,
    )

    const link = screen.getByTestId('record-link')
    expect(link).toBeInTheDocument()
  })
})
