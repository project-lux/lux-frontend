import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { reuse } from '../../config/tooltips'
import EntityParser from '../../lib/parse/data/EntityParser'
import WorkParser from '../../lib/parse/data/WorkParser'
import StyledDataRow from '../../styles/shared/DataRow'
import IEntity from '../../types/data/IEntity'

import ExternalLink from './ExternalLink'
import TextNote from './TextNote'
import Tooltip from './Tooltip'

interface IProps {
  entity: IEntity
  entityType: 'object' | 'work'
}

const CanIReuseIt: React.FC<IProps> = ({ entity, entityType }) => {
  let subjectTo: Array<{ url: string; text: string }> = []
  if (entityType === 'work') {
    const work = new WorkParser(entity)
    subjectTo = work.getSubjectTo()
  }
  const record = new EntityParser(entity)
  const copyright = record.getCopyrightLicensingStatement()

  return (
    <StyledDataRow className="row" data-testid="can-i-reuse-it">
      <Col xs={12}>
        <h2 data-testid="can-i-reuse-it-header">Can I re-use it?</h2>
      </Col>
      <Col xs={12}>
        {subjectTo.length > 0 ? (
          <Row>
            <dl className="mb-1">
              <Col xs={12}>
                <dt>Subject To</dt>
              </Col>
              {subjectTo.map((subject, ind) => (
                // eslint-disable-next-line react/no-array-index-key
                <Col xs={12} key={`${subject.text}_${ind}`}>
                  <dd>
                    <ExternalLink
                      url={subject.url}
                      name={subject.text}
                      id="subject-to"
                    />
                  </dd>
                </Col>
              ))}
            </dl>
          </Row>
        ) : (
          <p data-testid="under-certain-curcumstances">
            Under Certain Circumstances
            <Tooltip html={reuse} placement="bottom">
              <i
                className="bi bi-question-circle"
                style={{ fontSize: '1rem', marginLeft: '0.25rem' }}
              />
            </Tooltip>
          </p>
        )}
      </Col>
      {copyright !== null && (
        <Col xs={12}>
          <TextNote content={copyright.content} id="copyright-statement" />
        </Col>
      )}
      <Col xs={12}>
        <Link to="/content/rights-info">
          For rights and re-use information, visit this page
        </Link>
      </Col>
    </StyledDataRow>
  )
}

export default CanIReuseIt
