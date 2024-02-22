import React from 'react'

import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import IEntity from '../../types/data/IEntity'
import WorkParser from '../../lib/parse/data/WorkParser'
import { carriedBy, shownBy } from '../../config/worksSearchTags'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { getIconFromUri } from '../../lib/parse/data/helper'
import RelatedEntity from '../common/RelatedEntity'
import config from '../../config/config'
import { IOrderedItems } from '../../types/ISearchResults'

const CarriedBy: React.FC<{ entity: IEntity }> = ({ entity }) => {
  const work = new WorkParser(entity)
  const workCarriedByQuery = entity.id?.includes('visual')
    ? work.getHalLink(shownBy.searchTag)
    : work.getHalLink(carriedBy.searchTag)
  const skip = workCarriedByQuery === null
  const { data, isSuccess, isLoading, isError } = useGetSearchRelationshipQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uri: workCarriedByQuery!,
    },
    {
      skip,
    },
  )

  if (isError && !config.env.luxEnv.includes('production')) {
    return <h2>We encountered an error retrieving the item</h2>
  }

  if (skip) {
    return null
  }

  if (isLoading) {
    return (
      <StyledEntityPageSection>
        <h2>Loading...</h2>
      </StyledEntityPageSection>
    )
  }

  if (isSuccess && data && data.orderedItems.length > 0) {
    return (
      <StyledEntityPageSection data-testid="carried-by-container">
        <h2>This work is included in the following objects</h2>
        {data.orderedItems.map((item: IOrderedItems, ind: number) => {
          const { id } = item
          const [icon, accompanyingText] = getIconFromUri(id)
          return (
            <RelatedEntity
              key={id}
              icon={icon}
              text={accompanyingText}
              uri={id}
              id={`related-entity-${ind}`}
            />
          )
        })}
      </StyledEntityPageSection>
    )
  }
  return null
}

export default CarriedBy
