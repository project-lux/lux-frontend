import React from 'react'
// import { isNull } from 'lodash'

import StyledExploreHierarchy from '../../styles/features/common/ExploreHierarchy'
import { ISearchResults } from '../../types/ISearchResults'
// import { useAppSelector } from '../../app/hooks'
// import { IHierarchyVisualization } from '../../redux/slices/hierarchyVisualizationSlice'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import IEntity from '../../types/data/IEntity'

import Li from './Li'

interface IProps {
  parents: Array<string>
  descendents: ISearchResults
  currentEntity: IEntity
}

const ListContainer: React.FC<IProps> = ({
  parents,
  descendents,
  currentEntity,
}) => {
  // const currentState = useAppSelector(
  //   (state) => state.hierarchyVisualization as IHierarchyVisualization,
  // )

  const parser = new EntityParser(currentEntity)
  const primaryName = parser.getPrimaryName(config.dc.langen)

  return (
    <StyledExploreHierarchy>
      {primaryName}
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

export default ListContainer
