import React from 'react'

import TextValue from '../common/TextValue'
import TextContainer from '../common/TextContainer'
import LinkContainer from '../common/LinkContainer'

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
      </React.Fragment>
    )}
    {place !== '' && (
      <LinkContainer
        label={placeLabel}
        content={[place]}
        expandColumns
        itemSpacing="single"
        id={`${id}-location`}
        hrClassName="hideOnAboutSectionSidePanels"
      />
    )}
  </React.Fragment>
)

export default Dates
