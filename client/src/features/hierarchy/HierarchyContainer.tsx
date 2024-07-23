/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'reactflow/dist/style.css'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
// import { isNull } from 'lodash'
import { useLocation } from 'react-router-dom'
// import { useReactFlow } from 'reactflow'

import IEntity from '../../types/data/IEntity'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { IHalLink } from '../../types/IHalLink'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import theme from '../../styles/theme'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getChildEdges,
  getChildNodes,
  getDefaultNode,
  getHalLink,
  getParentEdges,
  getParentNodes,
} from '../../lib/util/hierarchyHelpers'
import SearchResultsLink from '../relatedLists/SearchResultsLink'
import { ISearchResults } from '../../types/ISearchResults'
import { IHierarchy, addFullscreen } from '../../redux/slices/hierarchySlice'
import IPlace from '../../types/data/IPlace'
import IConcept from '../../types/data/IConcept'
import { useWindowWidth } from '../../lib/hooks/useWindowWidth'

import Hierarchy from './Hierarchy'
import ParentCustomNode from './ParentCustomNode'
import ChildCustomNode from './ChildCustomNode'
import ListContainer from './ListContainer'
import Toolbar from './Toolbar'
import MoreLessButton from './MoreLessButton'
import ResetButton from './ResetButton'
import OriginNode from './OriginNode'

interface IProps {
  entity: IEntity
  halLink: IHalLink
  getParentUris: (entity: IPlace | IConcept) => Array<string>
}

const StyledHierarchyButton = styled(Button)`
  background-color: ${theme.color.white} !important;
  color: ${theme.color.black};
  border-radius: 10px;
  border-color: ${theme.color.white} !important;
  text-decoration: none;
  padding: 0.5rem;

  &:disabled,
  &:hover,
  &:active,
  &:focus {
    background-color: ${theme.color.white};
    color: ${theme.color.black};
    border-color: ${theme.color.white};
  }
`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HierarchyContainer: React.FC<IProps> = ({
  entity,
  halLink,
  getParentUris,
}) => {
  const dispatch = useAppDispatch()
  const hierarchyRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const { width } = useWindowWidth()

  const currentState = useAppSelector(
    (hierarchyState) => hierarchyState.hierarchy as IHierarchy,
  )
  const { fullscreen } = currentState

  const [view, setView] = useState<'graph' | 'list'>(
    width >= theme.breakpoints.md ? 'graph' : 'list',
  )

  let scope: null | string = null
  if (pathname.includes('concept')) {
    scope = 'concepts'
  }

  if (pathname.includes('place')) {
    scope = 'places'
  }

  // Check the width of the screen on re-render
  useEffect(() => {
    if (width < theme.breakpoints.md) {
      setView('list')
    }
  }, [width])

  const setFullscreen = (): void => {
    dispatch(addFullscreen({ isFullscreen: !fullscreen }))
    if (hierarchyRef !== null) {
      const elem = hierarchyRef.current
      if (fullscreen) {
        document.exitFullscreen()
      } else if (!fullscreen) {
        if (elem !== null && elem.requestFullscreen) {
          elem.requestFullscreen()
        }
      }
    }
  }

  const currentEntity = currentState.origin || entity
  const parents = getParentUris(currentEntity)
  const childrenUri = getHalLink(currentEntity._links, halLink)
  const skip = childrenUri === null

  const { data, isSuccess, isError, isUninitialized } =
    useGetSearchRelationshipQuery(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        uri: childrenUri!,
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
    const currentUuid: string = currentEntity.id as string
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
      <StyledEntityPageSection
        className="hierarchyContainer d-flex"
        ref={hierarchyRef}
        style={{
          flexDirection: 'column',
        }}
      >
        <Row>
          <Col xs={8}>
            <h2 className="mb-0">Explore the Hierarchy</h2>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            {currentUuid !== entity.id && (
              <ResetButton currentEntity={entity} />
            )}
            {width >= theme.breakpoints.md ? (
              <React.Fragment>
                <StyledHierarchyButton
                  onClick={() => setView(view === 'graph' ? 'list' : 'graph')}
                  role="button"
                  aria-label={`View the hierarchy ${
                    view === 'graph' ? 'list' : 'graph'
                  }`}
                >
                  <i
                    className={`bi ${
                      view === 'graph' ? 'bi-list-ul' : 'bi-diagram-3'
                    }`}
                    style={{ fontSize: '1.5rem' }}
                  />
                </StyledHierarchyButton>
                <StyledHierarchyButton
                  onClick={() => setFullscreen()}
                  role="button"
                  aria-label={
                    fullscreen
                      ? 'Minimize the viewport'
                      : 'Expand to fullscreen'
                  }
                >
                  <i
                    className={`bi ${
                      fullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'
                    }`}
                    style={{ fontSize: '1.5rem' }}
                  />
                </StyledHierarchyButton>
              </React.Fragment>
            ) : null}
          </Col>
        </Row>
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
      </StyledEntityPageSection>
    )
  }

  return null
}

export default HierarchyContainer
