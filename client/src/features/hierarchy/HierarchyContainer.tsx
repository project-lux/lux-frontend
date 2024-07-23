import 'reactflow/dist/style.css'
import React from 'react'
import { useLocation } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import {
  getChildEdges,
  getChildNodes,
  getDefaultNode,
  getParentEdges,
  getParentNodes,
} from '../../lib/util/hierarchyHelpers'
import SearchResultsLink from '../relatedLists/SearchResultsLink'
import { ISearchResults } from '../../types/ISearchResults'
import { IHierarchy } from '../../redux/slices/hierarchySlice'
import IConcept from '../../types/data/IConcept'
import IPlace from '../../types/data/IPlace'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'

import Hierarchy from './Hierarchy'
import ParentCustomNode from './ParentCustomNode'
import ChildCustomNode from './ChildCustomNode'
import ListContainer from './ListContainer'
import Toolbar from './Toolbar'
import MoreLessButton from './MoreLessButton'
import OriginNode from './OriginNode'

interface IProps {
  entity: IPlace | IConcept
  view: string
  parents: Array<string>
  childrenHalLink: string | null
}

const HierarchyContainer: React.FC<IProps> = ({
  entity,
  view,
  parents,
  childrenHalLink,
}) => {
  const { pathname } = useLocation()

  const currentState = useAppSelector(
    (hierarchyState) => hierarchyState.hierarchy as IHierarchy,
  )

  let scope: null | string = null
  if (pathname.includes('concept')) {
    scope = 'concepts'
  }

  if (pathname.includes('place')) {
    scope = 'places'
  }

  // get children based on HAL link
  const skip = childrenHalLink === null
  const { data, isSuccess, isError, isUninitialized } =
    useGetSearchRelationshipQuery(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        uri: childrenHalLink!,
      },
      {
        skip,
      },
    )

  if (isError) {
    console.log(
      'An error occurred retrieving the children of the current entity.',
    )
  }

  if (skip && parents.length === 0) {
    return null
  }

  if ((isSuccess && data) || skip) {
    // get nodes
    const currentUuid: string = entity.id as string
    const parentNodes = getParentNodes(parents).slice(
      0,
      currentState.currentPageLength,
    )
    const childNodes =
      !isUninitialized && data ? getChildNodes(data).slice(0, 5) : []
    const currentNode = getDefaultNode(currentUuid)

    // get edges
    const parentEdges = getParentEdges(parentNodes, currentUuid)
    const childEdges = getChildEdges(childNodes, currentUuid)

    // Format nodes with custom node components
    parentNodes.map((parentNode) => {
      parentNode.data.label = (
        <ParentCustomNode entityId={parentNode.data.label} />
      )
      return null
    })

    childNodes.map((childNode) => {
      childNode.data.label = <ChildCustomNode entityId={childNode.data.label} />
      return null
    })

    currentNode.data.label = <OriginNode entityId={currentNode.data.label} />
    // combine nodes and edges
    const nodes = [currentNode, ...parentNodes, ...childNodes]
    const edges = [...parentEdges, ...childEdges]

    return (
      <React.Fragment>
        {view === 'graph' ? (
          <div
            style={{
              height: 600,
              flexGrow: 1,
            }}
          >
            <Hierarchy
              luxNodes={nodes}
              luxEdges={edges}
              currentUuid={currentUuid}
            >
              {/* Toolbar associated with parent nodes */}
              {parents.length > currentState.defaultDisplayLength ? (
                <Toolbar nodeIds={parentNodes.map((node) => node.id)}>
                  <MoreLessButton
                    parentsArrayLength={parents.length}
                    displayLength={currentState.currentPageLength}
                  />
                </Toolbar>
              ) : (
                <React.Fragment />
              )}
              {childNodes.length > 0 ? (
                <Toolbar nodeIds={childNodes.map((node) => node.id)}>
                  <strong>
                    <SearchResultsLink
                      data={(data as ISearchResults) || {}}
                      eventTitle="Hierarchy Children"
                      url={data ? data.id : ''}
                      scope={scope !== null ? scope : 'places'}
                      additionalLinkText="children"
                    />
                  </strong>
                </Toolbar>
              ) : (
                <React.Fragment />
              )}
            </Hierarchy>
          </div>
        ) : (
          <ListContainer
            parents={parents}
            descendents={(data as ISearchResults) || {}}
            currentEntity={entity}
          >
            {parents.length > currentState.defaultDisplayLength && (
              <MoreLessButton
                parentsArrayLength={parents.length}
                displayLength={currentState.currentPageLength}
              />
            )}
          </ListContainer>
        )}
      </React.Fragment>
    )
  }

  return null
}

export default HierarchyContainer
