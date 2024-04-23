/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import IEntity from '../../types/data/IEntity'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { hierarchyChildren } from '../../config/placeSearchTags'
// import ExploreHierarchy from '../common/ExploreHierarchy'
// import PrimaryButton from '../../styles/shared/PrimaryButton'
import ILinks from '../../types/data/ILinks'
import { IHalLink } from '../../types/IHalLink'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import PageLoading from '../common/PageLoading'
import theme from '../../styles/theme'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  IHierarchyVisualization,
  addInitialState,
} from '../../redux/slices/hierarchyVisualizationSlice'

import ListContainer from './ListContainer'
import ChartContainer from './ChartContainer'

interface IProps {
  parents: Array<string>
  entity: IEntity
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
const HierarchyContainer: React.FC<IProps> = ({ parents, entity }) => {
  const [view, setView] = useState<'graph' | 'list'>('graph')
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const defaultHierarchyHeight = '600px'
  const hierarchyRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  const currentState = useAppSelector(
    (state) => state.hierarchyVisualization as IHierarchyVisualization,
  )

  useEffect(() => {
    if (currentState.origin === '') {
      dispatch(
        addInitialState({ origin: entity.id as string, parents, children: [] }),
      )
    }
  })

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

  const uri = getHalLink(entity._links, hierarchyChildren)
  const skip = uri === null
  const { data, isSuccess, isError, isLoading } = useGetSearchRelationshipQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uri: uri!,
    },
    {
      skip,
    },
  )

  if (isLoading) {
    return <PageLoading />
  }

  if (isError) {
    console.log(
      'An error occurred retrieving the children of the current entity.',
    )
  }

  console.log(currentState)

  if ((isSuccess && data) || skip) {
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
            <ChartContainer
              parents={currentState.parents}
              descendants={data!}
              currentUuid={currentState.origin}
            />
          </div>
        ) : (
          <ListContainer
            parents={currentState.parents}
            descendents={data!}
            currentUuid={currentState.origin}
          />
        )}
      </StyledEntityPageSection>
    )
  }

  return null
}

export default HierarchyContainer
