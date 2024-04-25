/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'reactflow/dist/style.css'
import React, { useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { isNull } from 'lodash'

import IEntity from '../../types/data/IEntity'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { hierarchyChildren } from '../../config/placeSearchTags'
// import ExploreHierarchy from '../common/ExploreHierarchy'
// import PrimaryButton from '../../styles/shared/PrimaryButton'
import ILinks from '../../types/data/ILinks'
import { IHalLink } from '../../types/IHalLink'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import theme from '../../styles/theme'
import { useAppSelector } from '../../app/hooks'
import {
  getChildEdges,
  getChildNodes,
  getDefaultNode,
  getParentEdges,
  getParentNodes,
} from '../../lib/util/hierarchyHelpers'
import { IHierarchyVisualization } from '../../redux/slices/hierarchyVisualizationSlice'

import Hierarchy from './Hierarchy'
import Node from './Node'
import ParentCustomNode from './ParentCustomNode'
import ChildCustomNode from './ChildCustomNode'
import ListContainer from './ListContainer'

interface IProps {
  entity: IEntity
  getParentUris: (entity: IEntity) => Array<string>
}

const getHalLink = (
  links: ILinks | undefined,
  halLink: IHalLink,
): string | null => {
  if (links === undefined) {
    return null
  }

  const { searchTag } = halLink
  if (links.hasOwnProperty(searchTag)) {
    return links[searchTag].href
  }

  return null
}

const StyledSwitchButton = styled(Button)`
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
const HierarchyContainer: React.FC<IProps> = ({ entity, getParentUris }) => {
  const [view, setView] = useState<'graph' | 'list'>('graph')
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const defaultHierarchyHeight = '600px'
  const hierarchyRef = useRef<HTMLDivElement>(null)

  const currentState = useAppSelector(
    (state) => state.hierarchyVisualization as IHierarchyVisualization,
  )

  const setFullscreen = (): void => {
    setIsFullscreen(!isFullscreen)
    const elem = hierarchyRef.current
    if (isFullscreen) {
      document.exitFullscreen()
    } else if (!isFullscreen) {
      if (elem !== null && elem.requestFullscreen) {
        elem.requestFullscreen()
      }
    }
  }

  const currentEntity = isNull(currentState.origin)
    ? entity
    : currentState.origin
  const uri = getHalLink(currentEntity._links, hierarchyChildren)
  const parents = getParentUris(currentEntity)

  const skip = uri === null
  const { data, isSuccess, isError } = useGetSearchRelationshipQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uri: uri!,
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

  if ((isSuccess && data) || skip) {
    // get nodes
    const currentUuid: string = currentState.origin
      ? currentState.origin.id!
      : (entity.id as string)
    const parentNodes = getParentNodes(parents).slice(0, 5)
    const childNodes = data ? getChildNodes(data).slice(0, 5) : []
    const currentNode = getDefaultNode(currentUuid)

    // get edges
    const parentEdges = getParentEdges(parentNodes, currentUuid)
    const childEdges = getChildEdges(childNodes, currentUuid)

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

    currentNode.data.label = <Node entityId={currentNode.data.label} />
    // combine nodes and edges
    const nodes = [currentNode, ...parentNodes, ...childNodes]
    const edges = [...parentEdges, ...childEdges]

    return (
      <StyledEntityPageSection
        className="hierarchyContainer"
        ref={hierarchyRef}
      >
        <Row>
          <Col xs={8}>
            <h2 className="mb-0">Explore</h2>
          </Col>
          <Col xs={4} className="d-flex justify-content-end">
            <StyledSwitchButton
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
            </StyledSwitchButton>
            <StyledSwitchButton
              onClick={() => setFullscreen()}
              role="button"
              aria-label={
                isFullscreen ? 'Minimize the viewport' : 'Expand to fullscreen'
              }
            >
              <i
                className={`bi ${
                  isFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'
                }`}
                style={{ fontSize: '1.5rem' }}
              />
            </StyledSwitchButton>
          </Col>
        </Row>
        {view === 'graph' ? (
          <div
            style={{
              height:
                hierarchyRef.current !== null
                  ? `${hierarchyRef.current.offsetHeight - 100}px`
                  : defaultHierarchyHeight,
            }}
          >
            <Hierarchy
              luxNodes={nodes}
              luxEdges={edges}
              currentUuid={currentUuid}
            />
          </div>
        ) : (
          <ListContainer
            parents={parents}
            descendents={data!}
            currentEntity={
              currentState.origin === null ? entity : currentState.origin
            }
          />
        )}
      </StyledEntityPageSection>
    )
  }

  return null
}

export default HierarchyContainer
