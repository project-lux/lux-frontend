import { render, screen } from '@testing-library/react'
import React from 'react'

import PageLoading from '../../../../features/common/PageLoading'

describe('PageLoading', () => {
  it('renders', async () => {
    render(<PageLoading />)

    const page = screen.getByTestId('page-loading')
    expect(page).toBeInTheDocument()
  })
})
