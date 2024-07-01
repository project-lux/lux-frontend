import React from 'react'

import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import IEntity from '../../types/data/IEntity'
import WorkParser from '../../lib/parse/data/WorkParser'
import { carriedBy } from '../../config/worksSearchTags'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import config from '../../config/config'

import IiifImageViewer from './IiifImageViewer'
import WikiDataImageViewer from './WikiDataImageViewer'

const Images: React.FC<{ entity: IEntity }> = ({ entity }) => {
  const work = new WorkParser(entity)
  const workCarriedByQuery = work.getHalLink(carriedBy.searchTag)
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

  // If there are no HAL links
  if (skip) {
    return <WikiDataImageViewer entity={entity} />
  }

  if (isError && !config.env.luxEnv.includes('production')) {
    return <h2>We encountered an error retrieving the item</h2>
  }

  if (isLoading) {
    return (
      <StyledEntityPageSection>
        <h2>Loading...</h2>
      </StyledEntityPageSection>
    )
  }

  if (isSuccess && data && data.orderedItems.length > 0) {
    const { orderedItems } = data
    const [item] = orderedItems

    return <IiifImageViewer uri={item.id} />
  }

  return null
}

export default Images
