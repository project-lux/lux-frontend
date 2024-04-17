import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import RecordLink from '../../../../features/common/RecordLink'
import config from '../../../../config/config'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'
import { useGetNameQuery } from '../../../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../../../lib/parse/data/helper'

const mockUrl = `${config.env.dataApiBaseUrl}data/object/test`
const strippedMockUrl = stripYaleIdPrefix(mockUrl)
const mockName = 'Mock Object'
const mockEntity = reusableMinimalEntity(mockName)

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetNameQuery: jest.fn(),
}))

describe('RecordLink', () => {
  describe('successful calls', () => {
    beforeEach(async () => {
      const getName = useGetNameQuery as jest.MockedFunction<
        typeof useGetNameQuery
      >
      getName.mockReturnValueOnce({
        data: mockEntity,
        isSuccess: true,
        refetch(): void {
          throw new Error('Function not implemented.')
        },
      })
    })

    it('renders', async () => {
      render(
        <BrowserRouter>
          <RecordLink url={mockUrl} />
        </BrowserRouter>,
      )

      const link = screen.getByTestId(`${strippedMockUrl}-record-link`)
      expect(link).toBeInTheDocument()
    })

    it('renders the link with the text', async () => {
      render(
        <BrowserRouter>
          <RecordLink url={mockUrl} />
        </BrowserRouter>,
      )

      const link = screen.getByTestId(`${strippedMockUrl}-record-link`)
      expect(link).toHaveTextContent(mockName)
    })

    it('renders the link with the correct href', async () => {
      render(
        <BrowserRouter>
          <RecordLink url={mockUrl} />
        </BrowserRouter>,
      )

      const link = screen.getByTestId(`${strippedMockUrl}-record-link`)
      expect(link).toHaveAttribute('href', '/view/object/test')
    })

    it('renders the link name when passed as a prop', async () => {
      const mockLinkName = 'mock link name'
      render(
        <BrowserRouter>
          <RecordLink url={mockUrl} name={mockLinkName} />
        </BrowserRouter>,
      )

      const link = screen.getByTestId(`${strippedMockUrl}-record-link`)
      expect(link).toHaveTextContent(mockLinkName)
    })
  })

  describe('failed calls', () => {
    const mockReturn404 = jest.fn()

    beforeEach(async () => {
      const getName = useGetNameQuery as jest.MockedFunction<
        typeof useGetNameQuery
      >
      getName.mockReturnValueOnce({
        data: undefined,
        isSuccess: false,
        isError: true,
        refetch(): void {
          throw new Error('Function not implemented.')
        },
      })
    })

    it('renders the error message', async () => {
      render(
        <BrowserRouter>
          <RecordLink url={mockUrl} />
        </BrowserRouter>,
      )

      const message = screen.getByTestId('record-link-error')
      expect(message).toBeInTheDocument()
    })

    it('calls the return404 callback', async () => {
      render(
        <BrowserRouter>
          <RecordLink url={mockUrl} returns404={mockReturn404} />
        </BrowserRouter>,
      )

      expect(mockReturn404).toHaveBeenCalledWith(true)
    })
  })
})
