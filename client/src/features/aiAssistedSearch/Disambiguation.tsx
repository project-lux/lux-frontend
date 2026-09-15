import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
`

const Disambiguation: React.FC<{
  aiDisambiguation: Array<IAiDisambiguation>
  searchString: string
}> = ({ aiDisambiguation, searchString }) => (
  <StyledDisambiguation>
    <Col xs={12} className="mt-3 d-flex justify-content-start">
      <p className="mb-0 fw-semibold">Keyword Search</p>
    </Col>
    <Col xs={12} className="mb-3 d-flex justify-content-start">
      <KeywordSearchLink searchString={searchString} />
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
                    search: `q=${JSON.stringify(queryData.query)}&pageLength=${DEFAULT_PAGE_LENGTH}&aiSearch=true&sq=${queryData.natural}`,
                  }}
                  className="fw-medium"
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

export default Disambiguation
