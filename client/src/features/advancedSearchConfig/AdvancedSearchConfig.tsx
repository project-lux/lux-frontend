import React from 'react'
import styled from 'styled-components'

import config from '../../config/config'
import {
  searchScope,
  scopeToTabTranslation,
  advancedSearchTitles,
} from '../../config/searchTypes'

const StyledDiv = styled.div`
  margin: 20px;
`
const StyledUl = styled.ul`
  margin-left: 20px;
`

const AdvancedSearchConfig: React.FC = () => {
  return (
    <StyledDiv>
      <h1>Advanced Search Terms</h1>
      {Object.values(searchScope).map((scope) => {
        const advancedSearchName =
          advancedSearchTitles[scopeToTabTranslation[scope]]
        return (
          <React.Fragment key={advancedSearchName}>
            <h2>
              <b>{advancedSearchName}</b>
            </h2>
            <StyledUl>
              {Object.keys(config.advancedSearch.terms[scope])
                .sort((a, b) =>
                  config.advancedSearch.terms[scope][a].label.localeCompare(
                    config.advancedSearch.terms[scope][b].label,
                  ),
                )
                .map((term) => {
                  return (
                    <React.Fragment key={term}>
                      <li>
                        <b>{config.advancedSearch.terms[scope][term].label}</b>{' '}
                        {' - '}
                        {config.advancedSearch.terms[scope][term].helpText}
                      </li>
                    </React.Fragment>
                  )
                })}
            </StyledUl>
          </React.Fragment>
        )
      })}
    </StyledDiv>
  )
}

export default AdvancedSearchConfig
