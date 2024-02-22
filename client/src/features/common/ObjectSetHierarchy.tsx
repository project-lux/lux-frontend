import React from 'react'

import IEntity from '../../types/data/IEntity'
import SetParser from '../../lib/parse/data/SetParser'
import { getNextSetUri } from '../../lib/util/hierarchyHelpers'

import GenericBreadcrumbHierarchy from './GenericBreadcrumbHierarchy'

interface IProps {
  entity: IEntity
  columnClassName?: string
}

function isArchive(entity: IEntity): boolean {
  const setParser = new SetParser(entity)
  return setParser.isArchive()
}

const ObjectSetHierarchy: React.FC<IProps> = ({ entity, columnClassName }) => (
  <GenericBreadcrumbHierarchy
    entity={entity}
    columnClassName={columnClassName}
    getNextEntityUri={getNextSetUri}
    linkFilter={isArchive}
    maxLength={8}
  />
)

export default ObjectSetHierarchy
