import React from 'react'

import IEntity from '../../types/data/IEntity'
import {
  getNextSetUris,
  isEntityAnArchive,
} from '../../lib/util/hierarchyHelpers'

import GenericBreadcrumbHierarchy from './GenericBreadcrumbHierarchy'

interface IProps {
  entity: IEntity
  columnClassName?: string
}

const ObjectSetHierarchy: React.FC<IProps> = ({ entity, columnClassName }) => (
  <GenericBreadcrumbHierarchy
    entity={entity}
    columnClassName={columnClassName}
    getNextEntityUri={getNextSetUris}
    linkFilter={isEntityAnArchive}
    maxLength={8}
  />
)

export default ObjectSetHierarchy
