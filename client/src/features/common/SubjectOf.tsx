import React from 'react'

import IEntity from '../../types/data/IEntity'
import EntityParser from '../../lib/parse/data/EntityParser'
import { IHalLink } from '../../types/IHalLink'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import DetailedLinkContainer from '../works/DetailedLinkContainer'
import { IOrderedItems } from '../../types/ISearchResults'

interface IProps {
  entity: IEntity
  halLinkConfig: IHalLink
}

const SubjectOf: React.FC<IProps> = ({ entity, halLinkConfig }) => {
  const parser = new EntityParser(entity)
  const halLink = parser.getHalLink(halLinkConfig.searchTag)
  const skip = halLink === null
  const { data, isSuccess, isLoading, isError } = useGetSearchRelationshipQuery(
    {
      uri: halLink!,
    },
    {
      skip,
    },
  )

  // If there are no HAL links
  if (skip || isError) {
    return null
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isSuccess && data) {
    const { orderedItems } = data
    const ids = orderedItems.map((item: IOrderedItems) => item.id)

    return (
      <DetailedLinkContainer
        content={ids}
        label="Subject Of"
        id="works-subject-of-link-container"
      />
    )
  }

  return null
}

export default SubjectOf
