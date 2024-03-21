import React from 'react'

import { getNextConceptUris } from '../../lib/util/hierarchyHelpers'
import IEntity from '../../types/data/IEntity'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'

interface IProps {
  entity: IEntity
  columnClassName?: string
}

const ConceptHierarchy: React.FC<IProps> = ({ entity, columnClassName }) => (
  <GenericBreadcrumbHierarchy
    entity={entity}
    getNextEntityUri={getNextConceptUris}
    maxLength={10}
    columnClassName={columnClassName}
  />
)

export default ConceptHierarchy
