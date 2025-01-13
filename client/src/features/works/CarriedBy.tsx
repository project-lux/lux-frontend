import React from 'react'

import IEntity from '../../types/data/IEntity'
import WorkParser from '../../lib/parse/data/WorkParser'
import { carriedBy } from '../../config/worksSearchTags'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import ObjectsContainer from '../common/ObjectsContainer'
import StyledObjectWorkHeader from '../../styles/shared/ObjectWorkHeader'

const CarriedBy: React.FC<{ entity: IEntity }> = ({ entity }) => {
  const work = new WorkParser(entity)
  const workCarriedByQuery = work.getHalLink(carriedBy.searchTag)

  if (workCarriedByQuery === null) {
    return null
  }

  const title = 'This work is included in the following objects'

  return (
    <StyledEntityPageSection data-testid="carried-by-container">
      <StyledObjectWorkHeader>{title}</StyledObjectWorkHeader>
      <ObjectsContainer uri={workCarriedByQuery} tab="objects" title={title} />
    </StyledEntityPageSection>
  )
}

export default CarriedBy
