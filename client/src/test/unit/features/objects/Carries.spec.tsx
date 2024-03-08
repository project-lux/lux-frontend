import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Carries from '../../../../features/objects/Carries'
import { physicalObject as mockObject } from '../../../data/object'

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockObject,
    isSuccess: true,
  }),
  useGetNameQuery: () => ({
    data: mockObject,
    isSuccess: true,
  }),
}))

describe('Carries', () => {
  it('renders the works snippet', () => {
    render(
      <BrowserRouter>
        <Carries entity={mockObject} defaultLength={1} />
      </BrowserRouter>,
    )

    const carries = screen.getByTestId('work-snippet-list-view')
    expect(carries).toBeInTheDocument()
  })

  it('renders the show all button', () => {
    render(
      <BrowserRouter>
        <Carries entity={mockObject} defaultLength={0} />
      </BrowserRouter>,
    )

    const button = screen.getByTestId('carries-show-all')
    expect(button).toBeInTheDocument()
  })

  it('renders the show less button', () => {
    render(
      <BrowserRouter>
        <Carries entity={mockObject} defaultLength={0} />
      </BrowserRouter>,
    )

    // Click show all button
    const showAll = screen.getByTestId('carries-show-all')
    fireEvent.click(showAll)

    const button = screen.getByTestId('carries-show-less')
    expect(button).toBeInTheDocument()
  })
})
