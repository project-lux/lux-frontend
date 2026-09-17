import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import {
  AI_REFINEMENT_PARAM,
  SEARCH_TYPE_PARAM,
} from '../../config/aiAssistedSearch/variables'
import {
  DEFAULT_PAGE_LENGTH,
  scopeToTabTranslation,
} from '../../config/searchTypes'
import IAiDisambiguation from '../../types/ai/IAiDisambiguation'
import theme from '../../styles/theme'

import KeywordSearchLink from './KeywordSearchLink'
import InterpretationRow from './InterpretationRow'

const StyledDisambiguation = styled(Row)`
  width: ${theme.searchBox.width};
  border: solid 1px #979797;
  border-top: 0;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: ${theme.searchBox.borderRadiusMobile};
  border-bottom-left-radius: ${theme.searchBox.borderRadiusMobile};
  position: absolute;
  z-index: 1000;
  background-color: white;
  margin-top: -${theme.searchBox.borderRadiusMobile};
  padding-top: ${theme.searchBox.borderRadiusMobile};

  @media (min-width: ${theme.breakpoints.md}px) {
    margin-top: -${theme.searchBox.borderRadius};
    padding-top: ${theme.searchBox.borderRadius};
  }

  &.refinementDisambiguation {
    top: 85%;
    left: 0;
    width: 100%;
    margin-top: 0;
    padding-top: 0;
    margin-left: 0px;
  }
`

const Disambiguation: React.FC<{
  aiDisambiguation: Array<IAiDisambiguation>
  searchString: string
  className: string
  onSelect?: () => void
}> = ({ aiDisambiguation, searchString, className, onSelect }) => {
  const { search } = useLocation()
  const urlParams = new URLSearchParams(search)
  const isAiRefinementSearch =
    urlParams.get(AI_REFINEMENT_PARAM) === 'true' || false

  return (
    <StyledDisambiguation className={className}>
      <Col xs={12} className="mt-3 d-flex justify-content-start">
        <p className="mb-0 fw-semibold">Keyword Search</p>
      </Col>
      <Col xs={12} className="mb-3 d-flex justify-content-start">
        <KeywordSearchLink searchString={searchString} onSelect={onSelect} />
      </Col>
      <Col xs={12}>
        <p className="mb-0 fw-semibold">
          <i className="bi bi-stars" />
          AI-Assisted Suggestions
        </p>
      </Col>
      <Col xs={12} className="mt-2 d-flex justify-content-start">
        <Row as="ul" className="list-unstyled">
          {aiDisambiguation.map((queryData) => (
            <Col as="li" xs={12}>
              <Row>
                <Col xs={12}>
                  <Link
                    to={{
                      pathname: `/view/results/${scopeToTabTranslation[queryData.query._scope as string]}`,
                      search: `q=${JSON.stringify(queryData.query)}&pageLength=${DEFAULT_PAGE_LENGTH}&${SEARCH_TYPE_PARAM}=aiAssisted&sq=${queryData.natural}${isAiRefinementSearch ? `&${AI_REFINEMENT_PARAM}=true` : ''}`,
                    }}
                    className="fw-medium"
                    onClick={onSelect}
                  >
                    {queryData.natural}
                  </Link>
                </Col>
                <Col xs={12}>
                  <InterpretationRow disambiguation={queryData} />
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
      </Col>
    </StyledDisambiguation>
  )
}

export default Disambiguation
