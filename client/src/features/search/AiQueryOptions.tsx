import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import {
  DEFAULT_PAGE_LENGTH,
  scopeToTabTranslation,
} from '../../config/searchTypes'

const AiQueryOptions: React.FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  aiDisambiguation: Array<any>
  setIsAiSearch?: (x: boolean) => void
}> = ({ aiDisambiguation, setIsAiSearch }) => (
  <React.Fragment>
    <Col xs={12} className="mt-3 d-flex justify-content-center">
      <strong>
        Your query returned more than one option. Please select a query to
        continue:
      </strong>
    </Col>
    <Col xs={12} className="mt-2 d-flex justify-content-center">
      <ul>
        {aiDisambiguation.map((queryData) => (
          <li>
            <Link
              to={{
                pathname: `/view/results/${scopeToTabTranslation[queryData.query._scope]}`,
                search: `q=${JSON.stringify(queryData.query)}&pageLength=${DEFAULT_PAGE_LENGTH}&aiSearch=true&sq=${queryData.natural}`,
              }}
              onClick={() => setIsAiSearch && setIsAiSearch(false)}
            >
              {queryData.natural}
            </Link>
            <ul className="ms-3">
              <li>Parsed Query: {queryData.parsed}</li>
            </ul>
          </li>
        ))}
      </ul>
    </Col>
  </React.Fragment>
)

export default AiQueryOptions
