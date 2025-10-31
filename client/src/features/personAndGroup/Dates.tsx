import React from 'react'
import { Col } from 'react-bootstrap'

import TextValue from '../common/TextValue'
import TextContainer from '../common/TextContainer'
import LinkContainer from '../common/LinkContainer'
import StyledHr from '../../styles/shared/Hr'

interface IDatesData {
  date: string
  place: string
  dateLabel: string
  placeLabel: string
  id: string
}

const Dates: React.FC<IDatesData> = ({
  date,
  place,
  dateLabel,
  placeLabel,
  id,
}) => (
  <React.Fragment>
    {date !== '' && (
      <React.Fragment>
        <TextContainer label={dateLabel}>
          <TextValue values={[date]} />
        </TextContainer>
        <Col xs={12}>
          <StyledHr
            className="personOrGroupClassHr"
            width="100%"
            $hiddenOnDesktop
          />
        </Col>
      </React.Fragment>
    )}
    {place !== '' && (
      <LinkContainer
        label={placeLabel}
        content={[place]}
        expandColumns
        itemSpacing="single"
        id={`${id}-location`}
      />
    )}
  </React.Fragment>
)

export default Dates
