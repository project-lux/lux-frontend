import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import Name from '../../../../features/common/Name'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'

const mockContent = 'Mock Name'
const mockLanguage = 'language'
const mockLanguageId = 'languageId'
const mockEntity = reusableMinimalEntity(mockLanguage)

vi.mock('../../../../redux/api/ml_api', () => ({
  useGetNameQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

describe('Name', () => {
  it('renders name', async () => {
    render(
      <BrowserRouter>
        <Name
          content={mockContent}
          language={mockLanguage}
          languageId={mockLanguageId}
        />
      </BrowserRouter>,
    )

    const name = screen.getByText('Mock Name')
    expect(name).toBeInTheDocument()
  })

  it('renders language superscript', async () => {
    render(
      <BrowserRouter>
        <Name
          content={mockContent}
          language={mockLanguage}
          languageId={mockLanguageId}
        />
      </BrowserRouter>,
    )

    const superscript = screen.getByTestId(
      `${mockLanguageId}-language-superscript`,
    )
    expect(superscript).toBeInTheDocument()
  })
})
