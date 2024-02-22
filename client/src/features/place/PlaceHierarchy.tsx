import React from 'react'

import IEntity from '../../types/data/IEntity'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import { getNextPlaceUri } from '../../lib/util/hierarchyHelpers'

interface IProps {
  entity: IEntity
  columnClassName?: string
}

const PlaceHierarchy: React.FC<IProps> = ({ entity, columnClassName }) => (
  <GenericBreadcrumbHierarchy
    entity={entity}
    columnClassName={columnClassName}
    maxLength={8}
    getNextEntityUri={getNextPlaceUri}
  />
)

export default PlaceHierarchy
