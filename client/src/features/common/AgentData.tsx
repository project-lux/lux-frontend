import { useGetItemQuery } from '../../redux/api/ml_api'
import PersonAndGroupParser from '../../lib/parse/data/PersonAndGroupParser'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import config from '../../config/config'
import { IAgentSnippet } from '../../types/derived-data/IAgentSnippet'

/**
 * Gets the agent data and parses it, returning the required data for rendering
 * @param {string} uri the URI of the agent
 * @returns {IAgentSnippet | null}
 */
const AgentData = (uri: string): IAgentSnippet | null => {
  const strippedUrl = stripYaleIdPrefix(uri)
  const { data, isSuccess } = useGetItemQuery({
    uri: strippedUrl,
    profile: 'results',
  })

  if (isSuccess && data) {
    const agentData: IAgentSnippet = {
      uri,
      name: undefined,
      birthYear: undefined,
      deathYear: undefined,
      nationalities: undefined,
    }

    const person = new PersonAndGroupParser(data)
    agentData.name = person.getPrimaryName(config.dc.langen)
    agentData.birthYear = person.getBirthYear()
    agentData.deathYear = person.getDeathYear()
    agentData.nationalities = person.getNationalities()

    return agentData
  }

  return null
}

export default AgentData
