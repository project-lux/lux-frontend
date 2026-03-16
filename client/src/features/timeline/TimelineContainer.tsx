/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { IHalLinks } from '../../types/IHalLinks'
import { useGetTimelineQuery } from '../../redux/api/ml_api'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import StyledDisplaySwitchButton from '../../styles/shared/DisplaySwitchButton'
import { ITimelinesTransformed } from '../../types/ITimelines'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import theme from '../../styles/theme'
import Hr from '../../styles/shared/Hr'

import TimelineData from './TimelineData'

const StyledButtonCol = styled(Col)`
  justify-content: flex-start;

  @media (min-width: ${theme.breakpoints.sm}px) {
    justify-content: flex-end;
  }
`

const getHalLinks = (
  searchTags: IHalLinks,
  providedHalLinks: any,
): Array<string> => {
  const filteredHalLinks: Array<string> = []

  Object.keys(providedHalLinks || {}).map((link: string) =>
    Object.keys(searchTags).map((tag) => {
      if (
        searchTags[tag].searchTag === link &&
        providedHalLinks[link]._estimate > 0
      ) {
        filteredHalLinks.push(providedHalLinks[link].href)
      }
      return null
    }),
  )

  return filteredHalLinks
}

const TimelineContainer: React.FC<{
  searchTags: IHalLinks
  providedHalLinks: any
}> = ({ searchTags, providedHalLinks }) => {
  const links = getHalLinks(searchTags, providedHalLinks)
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const timelineRef = useRef<HTMLDivElement>(null)
  const [display, setDisplay] = useState<'list' | 'graph'>('graph')

  const [timelineData, setTimelineData] =
    useState<ITimelinesTransformed | null>(null)
  const [sortedTimelineYears, setSortedTimelineYears] = useState<Array<string>>(
    [],
  )

  const { data, isSuccess, isError } = useGetTimelineQuery(links)
  // Checks if the element is in fullscreen
  useEffect(() => {
    const handleFullscreenChange = (): void => {
      setIsFullscreen(document.fullscreenElement === timelineRef.current)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const setFullscreen = (): void => {
    setIsFullscreen(!isFullscreen)
    const elem = timelineRef.current
    if (isFullscreen) {
      setIsFullscreen(false)
    } else if (!isFullscreen) {
      if (elem !== null) {
        setIsFullscreen(true)
      }
    }
  }

  useEffect(() => {
    if (isSuccess && data) {
      const timeline = new TimelineParser(data)
      const transformedData = timeline.getTransformedTimelineData()
      const sortedKeys = timeline.getSortedTimelineYears()
      setTimelineData(transformedData)
      setSortedTimelineYears(sortedKeys)
    }
  }, [data, isSuccess])

  if (isSuccess && data) {
    if (sortedTimelineYears.length !== 0) {
      return (
        <StyledEntityPageSection
          className={`timelineContainer${isFullscreen ? 'Fullscreen' : ''}`}
          data-testid={`timeline-container${isFullscreen ? '-fullscreen' : ''}`}
          ref={timelineRef}
        >
          <Row>
            <Col xs={12} sm={8} md={8} lg={8} xl={8}>
              <h2>Timeline of Related Objects/Works</h2>
            </Col>
            <StyledButtonCol
              xs={12}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              className="d-flex"
            >
              <div className="h-50">
                <StyledDisplaySwitchButton
                  onClick={() =>
                    setDisplay(display === 'graph' ? 'list' : 'graph')
                  }
                  role="button"
                  aria-label={`View the hierarchy ${
                    display === 'graph' ? 'list' : 'graph'
                  }`}
                  data-testid={`view-${display === 'graph' ? 'list' : 'graph'}-button`}
                >
                  <i
                    className={`bi ${
                      display === 'graph' ? 'bi-list-ul' : 'bi-bar-chart-line'
                    }`}
                    style={{ fontSize: '1.5rem' }}
                  />
                </StyledDisplaySwitchButton>
                <StyledDisplaySwitchButton
                  onClick={() => setFullscreen()}
                  role="button"
                  aria-label={
                    isFullscreen
                      ? 'Minimize the viewport'
                      : 'Expand to fullscreen'
                  }
                  data-testid={
                    isFullscreen
                      ? 'minimize-timeline-container-button'
                      : 'fullscreen-timeline-container-button'
                  }
                >
                  <i
                    className={`bi ${
                      isFullscreen
                        ? 'bi-fullscreen-exit'
                        : 'bi-arrows-fullscreen'
                    }`}
                    style={{ fontSize: '1.5rem' }}
                  />
                </StyledDisplaySwitchButton>
              </div>
            </StyledButtonCol>
          </Row>
          <Hr $hiddenOnDesktop width="100%" className="mb-2" />
          <TimelineData
            display={display}
            sortedKeys={sortedTimelineYears}
            transformedData={timelineData}
            searchTags={searchTags}
          />
        </StyledEntityPageSection>
      )
    }
  }

  if (isError) {
    return null
  }

  return null
}

export default TimelineContainer
