import React from 'react'
// import { isNull } from 'lodash'
import { useLocation } from 'react-router-dom'
import { Col } from 'react-bootstrap'

import StyledExploreHierarchy from '../../styles/features/common/ExploreHierarchy'
import { ISearchResults } from '../../types/ISearchResults'
// import { useAppSelector } from '../../app/hooks'
// import { IHierarchyVisualization } from '../../redux/slices/hierarchyVisualizationSlice'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import IEntity from '../../types/data/IEntity'
import SearchResultsLink from '../relatedLists/SearchResultsLink'

import Li from './Li'

interface IProps {
  parents: Array<string>
  descendents: ISearchResults
  currentEntity: IEntity
  displayLength: number
  children: JSX.Element
}

const ListContainer: React.FC<IProps> = ({
  parents,
  descendents,
  currentEntity,
  displayLength,
  children,
}) => {
  const defaultLength = 5
  const { pathname } = useLocation()
  let scope: null | string = null
  if (pathname.includes('concept')) {
    scope = 'concepts'
  }

  if (pathname.includes('place')) {
    scope = 'places'
  }

  const parser = new EntityParser(currentEntity)
  const primaryName = parser.getPrimaryName(config.dc.langen)

  return (
    <StyledExploreHierarchy>
      <Col>
        {primaryName}
        <ul>
          <li>
            Parents
            <ul>
              {parents.slice(0, displayLength).map((parent) => (
                <Li key={parent} id={parent} />
              ))}
            </ul>
            {children}
          </li>
          {descendents.hasOwnProperty('orderedItems') &&
            descendents.orderedItems.length > 0 && (
              <li>
                Children
                <ul>
                  {descendents.orderedItems
                    .slice(0, defaultLength)
                    .map((item) => (
                      <Li key={item.id} id={item.id} />
                    ))}
                </ul>
                <SearchResultsLink
                  data={descendents}
                  eventTitle="Hierarchy Children"
                  url={descendents.id}
                  scope={scope !== null ? scope : 'places'}
                  additionalLinkText="children"
                />
              </li>
            )}
        </ul>
      </Col>
    </StyledExploreHierarchy>
  )
}

export default ListContainer
