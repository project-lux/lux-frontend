import React from 'react'
import { skipToken } from '@reduxjs/toolkit/query/react'

import ObjectParser from '../../lib/parse/data/ObjectParser'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import IObject from '../../types/data/IObject'
import LinkContainer from '../common/LinkContainer'

interface IProps {
  entity: IObject
}

const RelatedEvents: React.FC<IProps> = ({ entity }) => {
  const parser = new ObjectParser(entity)
  const queryUrl = parser.getHalLink('lux:itemEvents')

  const { data, isSuccess } = useGetSearchRelationshipQuery(
    queryUrl !== null ? { uri: queryUrl } : skipToken,
  )

  if (isSuccess && data) {
    const links = data.orderedItems.map((item: { id: string }) => item.id)

    return <LinkContainer content={links} label="Exhibitions" />
  }

  return null
}

export default RelatedEvents
