import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import config from '../../../config/config'
import { reusableMinimalEntity } from '../../data/reusableMinimalEntity'
import RecordLinksList from '../../../features/common/RecordLinkList'

const mockUrls = [`${config.env.dataApiBaseUrl}data/object/test`]
const mockName = 'Mock Object'
const mockEntity = reusableMinimalEntity(mockName)

jest.mock('../../../redux/api/ml_api', () => ({
  useGetNameQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

describe('RecordLinkList', () => {
  it('renders RecordLink', async () => {
    render(<BrowserRouter>{RecordLinksList(mockUrls)}</BrowserRouter>)

    const link = screen.getByTestId('record-link')
    expect(link).toBeInTheDocument()
  })
})
