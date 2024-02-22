import React from 'react'

import StyledExploreHierarchy from '../../styles/features/common/ExploreHierarchy'
import { ISearchResults } from '../../types/ISearchResults'
import ParentLi from '../hierarchy/ParentLi'
import ChildLi from '../hierarchy/ChildLi'

import ApiText from './ApiText'

interface IProps {
  currentUuid: string
  parents: Array<string>
  descendents: ISearchResults
  expandType?: string
}

const ExploreHierarchy: React.FC<IProps> = ({
  currentUuid,
  parents,
  descendents,
  expandType,
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
              <ParentLi key={parent} item={parent} />
            ))}
          </ul>
          {/* <div className="moreless">
            {parentElems.length > LOWER_ITEM_LIMIT && (
              <button data-fn="less" type="button" onClick={onLessParents}>
                [Show less]
              </button>
            )}
            {parentElems.length < result.data.parents.length && (
              <button data-fn="more" type="button" onClick={onAllParents}>
                [Show all]
              </button>
            )}
          </div> */}
        </li>
        <li>
          Children
          <ul>
            {descendents.orderedItems.map((item) => (
              <ChildLi key={item.id} item={item} />
            ))}
          </ul>
          {/* <div className="moreless">
            {childElems.length > LOWER_ITEM_LIMIT && (
              <button type="button" onClick={onLessChildren}>
                [Show less]
              </button>
            )}
            {childElems.length < result.data.children.length && (
              <button type="button" onClick={onAllChildren}>
                [Show all]
              </button>
            )}
          </div> */}
        </li>
      </ul>
    </StyledExploreHierarchy>
  )
}

export default ExploreHierarchy
