import React from 'react'

import IEntity from '../../types/data/IEntity'
import WorkParser from '../../lib/parse/data/WorkParser'
import { carriedBy, shownBy } from '../../config/worksSearchTags'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import ObjectsContainer from '../common/ObjectsContainer'

const CarriedBy: React.FC<{ entity: IEntity }> = ({ entity }) => {
  const work = new WorkParser(entity)
  const workCarriedByQuery = entity.id?.includes('visual')
    ? work.getHalLink(shownBy.searchTag)
    : work.getHalLink(carriedBy.searchTag)

  if (workCarriedByQuery === null) {
    return null
  }

  // if (isSuccess && data && data.orderedItems.length > 0) {
  return (
    <StyledEntityPageSection data-testid="carried-by-container">
      <h2>This dataset is included in the following files</h2>
      <ObjectsContainer uri={workCarriedByQuery} tab="objects" />
    </StyledEntityPageSection>
  )
}

export default CarriedBy
