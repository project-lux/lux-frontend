import { render, screen } from '@testing-library/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'

import config from '../../../../config/config'
import LanguageSuperscript from '../../../../features/common/LanguageSuperscript'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'

const mockId = 'test'
const mockLanguage = `${config.env.dataApiBaseUrl}data/test`
const mockLanguageName = 'English'
const mockEntity = reusableMinimalEntity(mockLanguageName)

vi.mock('../../../../redux/api/ml_api', () => ({
  useGetNameQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

describe('LanguageSuperscript', () => {
  it('renders', async () => {
    render(
      <BrowserRouter>
        <LanguageSuperscript language={mockLanguage} id={mockId} />
      </BrowserRouter>,
    )

    const language = screen.getByTestId(`${mockId}-language-superscript`)
    expect(language).toBeInTheDocument()
  })

  it('renders the record link as content', async () => {
    render(
      <BrowserRouter>
        <LanguageSuperscript language={mockLanguage} id={mockId} />
      </BrowserRouter>,
    )

    const language = screen.getByTestId(`${mockId}-language-superscript`)
    expect(language).toHaveTextContent(`(${mockLanguageName})`)
  })
})
