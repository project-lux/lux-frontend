import React from 'react'
import { Col } from 'react-bootstrap'

import StyledHr from '../../styles/shared/Hr'
import StyledDataRow from '../../styles/shared/DataRow'
import theme from '../../styles/theme'
import IEntity from '../../types/data/IEntity'
import ExternalLink from '../common/ExternalLink'
import EventParser from '../../lib/parse/data/EventParser'
import ApiText from '../common/ApiText'

interface IProps {
  entity: IEntity
}

const HowDoISeeIt: React.FC<IProps> = ({ entity }) => {
  const event = new EventParser(entity)
  const unitLink = event.getLinkToUnitSite()
  const unitName =
    unitLink !== undefined ? ApiText(unitLink.contentIdentifier) : 'unit'

  if (unitLink === undefined) {
    return null
  }

  return (
    <StyledDataRow className="row">
      <Col xs={12}>
        <h2 data-testid="works-how-do-i-see-it">How do I see it?</h2>
      </Col>
      <Col
        xs={12}
        key={unitLink.link}
        style={{ marginBottom: theme.spacing.verticalItemDoubleSpacing }}
      >
        <ExternalLink
          url={unitLink.link}
          name={`View this item on the ${unitName || "unit's"} website`}
          id="event-unit"
        />
      </Col>
      <StyledHr />
    </StyledDataRow>
  )
}

export default HowDoISeeIt
