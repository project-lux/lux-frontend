import { render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

import AgentInHeader from '../../../../features/common/AgentInHeader'
import { agentData as mockAgentData } from '../../../data/person'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'

const mockEntity = reusableMinimalEntity('American')

vi.mock('../../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => ({
      pathname: 'mock-path',
    }),
  }
})

describe('AgentInHeader', () => {
  it('returns agent name', () => {
    render(<AgentInHeader data={mockAgentData} />)

    const name = screen.getByTestId('agent-in-header-name')
    expect(name).toHaveTextContent('Mock Person')
  })

  it('returns agent birth and death years', () => {
    render(<AgentInHeader data={mockAgentData} />)

    const years = screen.getByTestId('agent-in-header-years')
    expect(years).toHaveTextContent('1950-2000')
  })

  it('returns agent name', () => {
    render(<AgentInHeader data={mockAgentData} />)

    const nationality = screen.getByTestId('agent-in-header-nationality')
    expect(nationality).toHaveTextContent('American')
  })
})
