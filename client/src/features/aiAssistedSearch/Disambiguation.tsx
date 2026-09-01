import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import {
  DEFAULT_PAGE_LENGTH,
  scopeToTabTranslation,
} from '../../config/searchTypes'
import IAiDisambiguation from '../../types/ai/IAiDisambiguation'

import KeywordSearchLink from './KeywordSearchLink'
import InterpretationRow from './InterpretationRow'

const AiQueryOptions: React.FC<{
  aiDisambiguation: Array<IAiDisambiguation>
  searchString: string
  setIsAiSearch?: (x: boolean) => void
}> = ({ aiDisambiguation, searchString, setIsAiSearch }) => (
  <React.Fragment>
    <Col xs={12} className="mt-3 d-flex justify-content-start">
      <strong>Keyword Search</strong>
    </Col>
    <Col xs={12} className="mt-2 d-flex justify-content-start">
      <KeywordSearchLink searchString={searchString} />
    </Col>
    <Col xs={12}>
      <strong>AI-Assisted Suggestions</strong>
    </Col>
    <Col xs={12} className="mt-2 d-flex justify-content-start">
      <ul className="list-unstyled">
        {aiDisambiguation.map((queryData) => (
          <li>
            <Link
              to={{
                pathname: `/view/results/${scopeToTabTranslation[queryData.query._scope as string]}`,
                search: `q=${JSON.stringify(queryData.query)}&pageLength=${DEFAULT_PAGE_LENGTH}&aiSearch=true&sq=${queryData.natural}`,
              }}
              onClick={() => setIsAiSearch && setIsAiSearch(false)}
            >
              {queryData.natural}
            </Link>
            <InterpretationRow disambiguation={queryData} />
          </li>
        ))}
      </ul>
    </Col>
  </React.Fragment>
)

export default AiQueryOptions
