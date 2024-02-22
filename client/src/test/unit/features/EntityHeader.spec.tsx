import { render, screen } from '@testing-library/react'
import React from 'react'

import { entity as mockEntity } from '../../data/entity'
import { person as mockPerson } from '../../data/person'
import EntityHeader from '../../../features/common/EntityHeader'
import { objectsIcon } from '../../../config/resources'

jest.mock('../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockPerson,
    isSuccess: true,
  }),
  useGetNameQuery: () => ({
    data: mockPerson,
    isSuccess: true,
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'mock-path',
  }),
}))

describe('EntityHeader', () => {
  it('renders the title', () => {
    render(
      <EntityHeader
        entity={mockEntity}
        icon={objectsIcon}
        entityTypeForIcon="physical object"
        primaryAgent=""
        start="2000"
        end="2024"
      />,
    )

    const date = screen.getByTestId('entity-header')
    expect(date).toHaveTextContent('Mock Entity')
  })

  it('renders the icon', () => {
    render(
      <EntityHeader
        entity={mockEntity}
        icon={objectsIcon}
        entityTypeForIcon="physical object"
        primaryAgent=""
        start="2000"
        end="2024"
      />,
    )

    const img = screen.getByTestId('entity-icon-img')
    expect(img).toBeInTheDocument()
  })
})
