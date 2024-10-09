import { isUndefined } from 'lodash'

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
const AgentData = (uri: string | undefined): IAgentSnippet | null => {
  const skip = isUndefined(uri)
  const strippedUrl = !skip ? stripYaleIdPrefix(uri) : undefined
  const { data, isSuccess } = useGetItemQuery(
    {
      uri: strippedUrl,
      profile: 'results',
    },
    {
      skip,
    },
  )

  if (skip) {
    return null
  }

  if (isSuccess && data) {
    const agentData: IAgentSnippet = {
      uri,
      name: undefined,
      birthYear: undefined,
      deathYear: undefined,
      nationalities: undefined,
    }

    const person = new PersonAndGroupParser(data)
    agentData.name = person.getPrimaryName(config.aat.langen)
    agentData.birthYear = person.getBirthYear()
    agentData.deathYear = person.getDeathYear()
    agentData.nationalities = person.getNationalities()

    return agentData
  }

  return null
}

export default AgentData
