import React from 'react'
import { Col, Row } from 'react-bootstrap'

import { reuse } from '../../config/tooltips'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import WorkParser from '../../lib/parse/data/WorkParser'
import StyledDataRow from '../../styles/shared/DataRow'
import IEntity from '../../types/data/IEntity'
import { INoteContent } from '../../types/IContentWithLanguage'

import ExternalLink from './ExternalLink'
import TextNote from './TextNote'
import Tooltip from './Tooltip'
import InternalLink from './InternalLink'

interface IProps {
  entity: IEntity
  entityType: 'object' | 'work'
}

const CanIReuseIt: React.FC<IProps> = ({ entity, entityType }) => {
  // get work specific data
  let subjectTo: Array<{ url: string; text: string }> = []
  if (entityType === 'work') {
    const work = new WorkParser(entity)
    subjectTo = work.getSubjectTo()
  }

  // get object specific data
  let copyright: Array<INoteContent> = []
  let carries: Array<string> = []
  if (entityType === 'object') {
    const object = new ObjectParser(entity)
    copyright = object.getCopyrightLicensingStatement()
    const works = object.getWorks()
    const digitallyCarries = object.getDigitallyCarries()
    const digitallyShows = object.getDigitallyShows()
    carries = [...works, ...digitallyCarries, ...digitallyShows]
  }

  return (
    <StyledDataRow className="row" data-testid="can-i-reuse-it">
      <Col xs={12}>
        <h2 data-testid="can-i-reuse-it-header">Can I re-use it?</h2>
      </Col>
      <Col xs={12}>
        {entityType === 'work' && subjectTo.length > 0 && (
          <Row>
            <dl className="mb-1">
              <Col xs={12}>
                <dt>Subject To</dt>
              </Col>
              {subjectTo.map((subject, ind) => (
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
        )}
        {entityType !== 'work' && carries.length > 0 && (
          <p data-testid="rights-information-statement">
            Rights information may be available on the associated Works page.
          </p>
        )}
        {carries.length === 0 && subjectTo.length === 0 && (
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
      {copyright.length > 0 &&
        copyright.map((cr) => (
          <Col xs={12} key={cr.content}>
            <TextNote content={cr.content} id="copyright-statement" />
          </Col>
        ))}
      <Col xs={12}>
        <InternalLink
          uri="/content/rights-info"
          name="For more information about Rights and Usage, visit the LUX Frequently
          Asked Questions."
          linkCategory="FAQ Rights Info"
        />
      </Col>
    </StyledDataRow>
  )
}

export default CanIReuseIt
