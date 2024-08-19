import { render, screen } from '@testing-library/react'
import React from 'react'

import AgentInHeader from '../../../../features/common/AgentInHeader'
import { agentData as mockAgentData } from '../../../data/person'
import { reusableMinimalEntity } from '../../../data/reusableMinimalEntity'

const mockEntity = reusableMinimalEntity('American')

jest.mock('../../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockEntity,
    isSuccess: true,
  }),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: 'mock-path',
  }),
}))

describe('AgentInHeader', () => {
  it('returns agent name', () => {
    render(<AgentInHeader data={mockAgentData} />)

    const name = screen.getByTestId('agent-in-header-name')
    expect(name).toHaveTextContent('Mock Person')
  })

  it('returns agent birth and death years', () => {
    render(<AgentInHeader data={mockAgentData} />)

    const years = screen.getByTestId('agent-in-header-years')
    expect(years).toHaveTextContent('1950 CE-2000 CE')
  })

  it('returns agent name', () => {
    render(<AgentInHeader data={mockAgentData} />)

    const nationality = screen.getByTestId('agent-in-header-nationality')
    expect(nationality).toHaveTextContent('American')
  })
})
