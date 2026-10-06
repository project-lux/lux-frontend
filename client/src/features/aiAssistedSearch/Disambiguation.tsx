import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { scopeToTabTranslation } from '../../config/searchTypes'
import IAiDisambiguation from '../../types/ai/IAiDisambiguation'
import theme from '../../styles/theme'
import AiDisambigationParser from '../../lib/ai/AiDisambigationParser'

import KeywordSearchLink from './KeywordSearchLink'
import InterpretationRow from './InterpretationRow'

const StyledDisambiguation = styled(Row)<{ $width?: number }>`
  width: ${(props): string =>
    props.$width === undefined ? '100%' : `${props.$width}px`};
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
  resetDisambiguation: (value: Array<IAiDisambiguation>) => void
  width?: number
}> = ({
  aiDisambiguation,
  searchString,
  className,
  resetDisambiguation,
  width,
}) => {
  // const { search } = useLocation()
  // const urlParams = new URLSearchParams(search)
  // const isAiRefinementSearch =
  //   urlParams.get(AI_REFINEMENT_PARAM) === 'true' || false

  const { search } = useLocation()
  return (
    <StyledDisambiguation className={className} $width={width}>
      <Col xs={12} className="mt-3 d-flex justify-content-start">
        <p className="mb-0 fw-semibold">Keyword Search</p>
      </Col>
      <Col xs={12} className="mb-3 d-flex justify-content-start">
        <KeywordSearchLink
          searchString={searchString}
          resetDisambiguation={resetDisambiguation}
        />
      </Col>
      <Col xs={12}>
        <p className="mb-0 fw-semibold">
          <i
            className="bi bi-stars"
            style={{ color: theme.color.primary.blue }}
          />
          AI-Assisted Suggestions
        </p>
      </Col>
      <Col xs={12} className="mt-2 d-flex justify-content-start">
        <Row as="ul" className="list-unstyled">
          {aiDisambiguation.map((queryData, ind) => {
            const newTab =
              scopeToTabTranslation[queryData.query._scope as string]
            const newUrlParams = AiDisambigationParser.getUrlParams(
              search,
              queryData.query,
              queryData.natural,
              newTab,
            )
            return (
              <Col as="li" xs={12} key={ind}>
                <Row>
                  <Col xs={12}>
                    <Link
                      to={{
                        pathname: `/view/results/${newTab}`,
                        search: newUrlParams.toString(),
                      }}
                      className="fw-medium"
                      onClick={(): void => resetDisambiguation([])}
                    >
                      {queryData.natural}
                    </Link>
                  </Col>
                  <Col xs={12}>
                    <InterpretationRow disambiguation={queryData} />
                  </Col>
                </Row>
              </Col>
            )
          })}
        </Row>
      </Col>
    </StyledDisambiguation>
  )
}

export default Disambiguation
