import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import CanIReuseIt from '../../../features/common/CanIReuseIt'
import { linguisticObject as mockWork } from '../../data/linguisticObject'

describe('CanIReuseIt', () => {
  it('renders the subject to', () => {
    render(
      <BrowserRouter>
        <CanIReuseIt entity={mockWork} entityType="work" />
      </BrowserRouter>,
    )

    const rights = screen.getByTestId('subject-to-external-link')
    expect(rights).toBeInTheDocument()
  })

  it('renders the generic rights statement', () => {
    render(
      <BrowserRouter>
        <CanIReuseIt entity={mockWork} entityType="object" />
      </BrowserRouter>,
    )

    const statement = screen.getByTestId('under-certain-curcumstances')
    expect(statement).toBeInTheDocument()
  })
})
