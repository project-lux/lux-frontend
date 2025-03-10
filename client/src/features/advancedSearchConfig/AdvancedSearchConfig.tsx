import React from 'react'
import styled from 'styled-components'

import theme from '../../styles/theme'
import config from '../../config/config'
import {
  searchScope,
  scopeToTabTranslation,
  advancedSearchTitles,
} from '../../config/searchTypes'

const StyledH1 = styled.h1`
  background-color: ${theme.color.white};
  text-align: center;
`
const StyledDiv = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  /* background-color: ${theme.color.lightGray}; */
`
const StyledUl = styled.ul`
  margin-left: 20px;
`

const StyledSummary = styled.summary`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 2rem;
  &::marker {
    font-size: 1rem;
  }
`
const StyledDetailsContainer = styled.div``
const StyledDetails = styled.details`
  margin-bottom: 2px;
  background-color: ${theme.color.white};
  box-shadow: ${theme.color.borderShadow} 1px 1px 5px;
  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`

const AdvancedSearchConfig: React.FC = () => {
  return (
    <React.Fragment>
      <StyledH1>Advanced Search Terms</StyledH1>

      <StyledDiv>
        <StyledDetailsContainer>
          {Object.values(searchScope).map((scope) => {
            const advancedSearchName =
              advancedSearchTitles[scopeToTabTranslation[scope]]
            return (
              <React.Fragment key={advancedSearchName}>
                <StyledDetails>
                  <StyledSummary>{advancedSearchName}</StyledSummary>
                  <StyledUl>
                    {Object.keys(config.advancedSearch.terms[scope])
                      .sort((a, b) =>
                        config.advancedSearch.terms[scope][
                          a
                        ].label.localeCompare(
                          config.advancedSearch.terms[scope][b].label,
                        ),
                      )
                      .map((term) => {
                        return (
                          <React.Fragment key={term}>
                            <li>
                              <b>
                                {config.advancedSearch.terms[scope][term].label}
                              </b>{' '}
                              {' - '}
                              {
                                config.advancedSearch.terms[scope][term]
                                  .helpText
                              }
                            </li>
                          </React.Fragment>
                        )
                      })}
                  </StyledUl>
                </StyledDetails>
              </React.Fragment>
            )
          })}
        </StyledDetailsContainer>
      </StyledDiv>
    </React.Fragment>
  )
}

export default AdvancedSearchConfig
