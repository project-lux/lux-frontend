import config from '../../../config/config'
import AgentData from '../../../features/common/AgentData'
import {
  person as mockPerson,
  agentData as mockAgentData,
} from '../../data/person'

jest.mock('../../../redux/api/ml_api', () => ({
  useGetItemQuery: () => ({
    data: mockPerson,
    isSuccess: true,
  }),
}))

describe('AgentData', () => {
  it('returns agent data', () => {
    const data = AgentData(
      `${config.env.dataApiBaseUrl}view/person/mock-person`,
    )

    expect(data).toEqual(mockAgentData)
  })
})
