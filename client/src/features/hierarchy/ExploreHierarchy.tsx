import React from 'react'

import StyledExploreHierarchy from '../../styles/features/common/ExploreHierarchy'
import { ISearchResults } from '../../types/ISearchResults'
import ApiText from '../common/ApiText'

import Li from './Li'

interface IProps {
  currentUuid: string
  parents: Array<string>
  descendents: ISearchResults
}

const ExploreHierarchy: React.FC<IProps> = ({
  currentUuid,
  parents,
  descendents,
}) => {
  const entityName = ApiText(currentUuid)
  return (
    <StyledExploreHierarchy>
      {entityName}
      <ul>
        <li>
          Parents
          <ul>
            {parents.map((parent) => (
              <Li key={parent} id={parent} />
            ))}
          </ul>
        </li>
        <li>
          Children
          <ul>
            {descendents.orderedItems.map((item) => (
              <Li key={item.id} id={item.id} />
            ))}
          </ul>
        </li>
      </ul>
    </StyledExploreHierarchy>
  )
}

export default ExploreHierarchy
