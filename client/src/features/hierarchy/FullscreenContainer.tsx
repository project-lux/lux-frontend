import 'reactflow/dist/style.css'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import IEntity from '../../types/data/IEntity'
import { IHalLink } from '../../types/IHalLink'
import IConcept from '../../types/data/IConcept'
import IPlace from '../../types/data/IPlace'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import theme from '../../styles/theme'
import { IHierarchy } from '../../redux/slices/hierarchySlice'
import { useAppSelector } from '../../app/hooks'
import { useWindowWidth } from '../../lib/hooks/useWindowWidth'
import { getHalLink } from '../../lib/util/hierarchyHelpers'

import ResetButton from './ResetButton'
import HierarchyContainer from './HierarchyContainer'

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

const FullscreenContainer: React.FC<IProps> = ({
  entity,
  halLink,
  getParentUris,
}) => {
  const hierarchyRef = useRef<HTMLDivElement>(null)
  const { width } = useWindowWidth()
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [view, setView] = useState<'graph' | 'list'>(
    width >= theme.breakpoints.md ? 'graph' : 'list',
  )

  const currentState = useAppSelector(
    (hierarchyState) => hierarchyState.hierarchy as IHierarchy,
  )

  const currentEntity = currentState.origin || entity
  const currentUuid: string = currentEntity.id as string
  const parents = getParentUris(currentEntity)
  const childrenUri = getHalLink(currentEntity._links, halLink)

  // Check the width of the screen on re-render
  useEffect(() => {
    if (width < theme.breakpoints.md) {
      setView('list')
    }
  }, [width])

  const setFullscreen = (): void => {
    if (hierarchyRef !== null) {
      const elem = hierarchyRef.current
      if (isFullscreen) {
        document.exitFullscreen()
      } else if (!isFullscreen) {
        if (elem !== null && elem.requestFullscreen) {
          elem.requestFullscreen()
        }
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  // Do not return anything if there are no parents and children
  if (parents.length === 0 && childrenUri === null) {
    return null
  }

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
          {currentUuid !== entity.id && <ResetButton currentEntity={entity} />}
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
                  isFullscreen
                    ? 'Minimize the viewport'
                    : 'Expand to fullscreen'
                }
              >
                <i
                  className={`bi ${
                    isFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'
                  }`}
                  style={{ fontSize: '1.5rem' }}
                />
              </StyledHierarchyButton>
            </React.Fragment>
          ) : null}
        </Col>
      </Row>
      <HierarchyContainer
        entity={currentEntity}
        view={view}
        parents={parents}
        childrenHalLink={childrenUri}
      />
    </StyledEntityPageSection>
  )
}

export default FullscreenContainer
