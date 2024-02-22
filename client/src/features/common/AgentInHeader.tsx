import React from 'react'
import styled from 'styled-components'

import { IAgentSnippet } from '../../types/derived-data/IAgentSnippet'

import ApiText from './ApiText'

interface IAgents {
  data: IAgentSnippet
}

const StyledSpan = styled.span`
  font-size: 24px;
  color: #222222;
  letter-spacing: 0;
  text-align: left;
  font-weight: 500;
`

/**
 * Renders the data retrieved in the AgentData component
 * @param {IAgentSnippet} data the agent's data from the AgentData component
 * @returns {JSX.Element}
 */
const AgentInHeader: React.FC<IAgents> = ({ data }) => {
  const { name, birthYear, deathYear, nationalities } = data
  const nationality =
    nationalities !== undefined && nationalities.length > 0
      ? ApiText(nationalities[0])
      : null

  return (
    <React.Fragment>
      {name !== undefined && name !== '' && (
        <StyledSpan data-testid="agent-in-header-name">{name}</StyledSpan>
      )}
      {(birthYear !== '' || deathYear !== '') && (
        <StyledSpan data-testid="agent-in-header-years">
          , {birthYear || ''}-{deathYear || ''}
        </StyledSpan>
      )}
      {nationality !== null && (
        <StyledSpan data-testid="agent-in-header-nationality">
          , {nationality}
        </StyledSpan>
      )}
    </React.Fragment>
  )
}

export default AgentInHeader
