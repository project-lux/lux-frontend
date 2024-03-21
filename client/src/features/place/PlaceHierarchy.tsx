import React from 'react'

import IEntity from '../../types/data/IEntity'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import { getNextPlaceUris } from '../../lib/util/hierarchyHelpers'

interface IProps {
  entity: IEntity
  columnClassName?: string
}

const PlaceHierarchy: React.FC<IProps> = ({ entity, columnClassName }) => (
  <GenericBreadcrumbHierarchy
    entity={entity}
    columnClassName={columnClassName}
    maxLength={8}
    getNextEntityUri={getNextPlaceUris}
  />
)

export default PlaceHierarchy
