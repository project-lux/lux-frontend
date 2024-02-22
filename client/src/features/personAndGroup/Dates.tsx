/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
      <TextContainer label={dateLabel}>
        <TextValue values={[date]} />
      </TextContainer>
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
