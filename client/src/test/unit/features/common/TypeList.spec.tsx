/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import TypeList from '../../../../features/common/TypeList'
import { useGetNameQuery } from '../../../../redux/api/ml_api'

const mockTypeOne = 'mock type one'
const mockTypeTwo = 'mock type two'
const mockValues = [mockTypeOne, mockTypeTwo]
const mockLabel = 'Object'

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetNameQuery: jest.fn(),
}))

describe('TypeList', () => {
  beforeEach(async () => {
    const getName = useGetNameQuery as jest.MockedFunction<
      typeof useGetNameQuery
    >
    getName
      .mockReturnValueOnce({
        data: mockTypeOne,
        isSuccess: true,
        refetch(): any {
          throw new Error('Function not implemented.')
        },
      })
      .mockReturnValueOnce({
        data: mockTypeTwo,
        isSuccess: true,
        refetch(): any {
          throw new Error('Function not implemented.')
        },
      })
  })

  it('renders the label', async () => {
    render(
      <BrowserRouter>
        <TypeList label={mockLabel} types={mockValues} />
      </BrowserRouter>,
    )

    const label = screen.getByTestId('types-label')
    expect(label).toBeInTheDocument()
  })

  it('renders the list', async () => {
    render(
      <BrowserRouter>
        <TypeList label={mockLabel} types={mockValues} />
      </BrowserRouter>,
    )

    const list = screen.getByTestId('entity-type-list')
    expect(list).toBeInTheDocument()
  })

  it('renders the record links', async () => {
    render(
      <BrowserRouter>
        <TypeList label={mockLabel} types={mockValues} />
      </BrowserRouter>,
    )

    const link = screen.getByTestId(`${mockTypeOne}-record-link`)
    expect(link).toBeInTheDocument()
  })
})
