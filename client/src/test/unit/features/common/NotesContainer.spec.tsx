import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import NotesContainer from '../../../../features/common/NotesContainer'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'

const mockContent = 'mock note content'
const mockNotes = {
  access: [
    {
      content: mockContent,
      language: '',
    },
  ],
}
const mockEntity = reusableMinimalEntity('Access')

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

describe('NotesContainer', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <NotesContainer notes={mockNotes} />
      </BrowserRouter>,
    )

    const container = screen.getByTestId('notes-container-0')
    expect(container).toBeInTheDocument()
  })

  it('renders label', async () => {
    render(
      <BrowserRouter>
        <NotesContainer notes={mockNotes} />
      </BrowserRouter>,
    )

    const label = screen.getByTestId('access-text-label')
    expect(label).toBeInTheDocument()
  })

  it('renders note', async () => {
    render(
      <BrowserRouter>
        <NotesContainer notes={mockNotes} />
      </BrowserRouter>,
    )

    const note = screen.getByTestId('notes-container-0-text-note')
    expect(note).toBeInTheDocument()
  })
})
