import React from 'react'
// import { isNull } from 'lodash'
import { useLocation } from 'react-router-dom'
import { Col } from 'react-bootstrap'

import StyledExploreHierarchy from '../../styles/features/common/ExploreHierarchy'
import { ISearchResults } from '../../types/ISearchResults'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import IEntity from '../../types/data/IEntity'
import SearchResultsLink from '../relatedLists/SearchResultsLink'
import StyledHr from '../../styles/shared/Hr'
import { useAppSelector } from '../../app/hooks'
import { IHierarchy } from '../../redux/slices/hierarchySlice'

import Li from './Li'

interface IProps {
  parents: Array<string>
  descendents: ISearchResults
  currentEntity: IEntity
  children: JSX.Element | boolean
}

const ListContainer: React.FC<IProps> = ({
  parents,
  descendents,
  currentEntity,
  children,
}) => {
  const { currentPageLength, previousPageLength, defaultDisplayLength } =
    useAppSelector((hierarchyState) => hierarchyState.hierarchy as IHierarchy)

  const { pathname } = useLocation()
  let scope: null | string = null
  if (pathname.includes('concept')) {
    scope = 'concepts'
  }

  if (pathname.includes('place')) {
    scope = 'places'
  }

  const parser = new EntityParser(currentEntity)
  const primaryName = parser.getPrimaryName(config.aat.langen)
  const isShowMore = currentPageLength > previousPageLength
  // Set the index of the element that should be focused on after selecting show more/less
  const listElementToFocus = isShowMore
    ? (Math.floor(currentPageLength / 5) - 1) * 5 + 1
    : currentPageLength

  return (
    <StyledExploreHierarchy className="row">
      <Col>
        <strong>{primaryName}</strong>
        <ul>
          {parents.length > 0 && (
            <li>
              Parents
              <ul>
                {parents.slice(0, currentPageLength).map((parent, ind) => (
                  <Li
                    key={parent}
                    id={parent}
                    focusOnLiElement={currentPageLength !== previousPageLength}
                    indexToFocus={ind + 1 === listElementToFocus}
                    ind={(ind + 1).toString()}
                  />
                ))}
              </ul>
              {children}
            </li>
          )}
          <StyledHr width="100%" className="my-3" />
          {descendents.hasOwnProperty('orderedItems') &&
            descendents.orderedItems.length > 0 && (
              <li>
                Children
                <ul>
                  {descendents.orderedItems
                    .slice(0, defaultDisplayLength)
                    .map((item) => (
                      <Li key={item.id} id={item.id} />
                    ))}
                </ul>
                <strong className="ms-4">
                  <SearchResultsLink
                    data={descendents}
                    eventTitle="Hierarchy Children"
                    url={descendents.id}
                    scope={scope !== null ? scope : 'places'}
                    additionalLinkText="child"
                  />
                </strong>
              </li>
            )}
        </ul>
      </Col>
    </StyledExploreHierarchy>
  )
}

export default ListContainer
