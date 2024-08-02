/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { IHalLinks } from '../../types/IHalLinks'
import { useGetTimelineQuery } from '../../redux/api/ml_api'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import StyledDisplaySwitchButton from '../../styles/shared/DisplaySwitchButton'
import { ITimelinesTransformed } from '../../types/ITimelines'

import TimelineData from './TimelineData'

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

  const setFullscreen = (): void => {
    setIsFullscreen(!isFullscreen)
    const elem = timelineRef.current
    if (isFullscreen) {
      document.exitFullscreen()
    } else if (!isFullscreen) {
      if (elem !== null && elem.requestFullscreen) {
        elem.requestFullscreen()
      }
    }
  }

  useEffect(() => {
    if (isSuccess && data) {
      const transformedData = transformTimelineData(data)
      const sortedKeys = sortTimelineData(transformedData)
      setTimelineData(transformedData)
      setSortedTimelineYears(sortedKeys)
    }
  }, [data, isSuccess])

  if (isSuccess && data) {
    if (sortedTimelineYears.length !== 0) {
      return (
        <StyledEntityPageSection
          data-testid="timeline-container"
          ref={timelineRef}
        >
          <Row>
            <Col xs={8}>
              <h2>Timeline of Related Objects/Works</h2>
            </Col>
            <Col xs={4} className="d-flex justify-content-end">
              <StyledDisplaySwitchButton
                onClick={() =>
                  setDisplay(display === 'graph' ? 'list' : 'graph')
                }
                role="button"
                aria-label={`View the hierarchy ${
                  display === 'graph' ? 'list' : 'graph'
                }`}
              >
                <i
                  className={`bi ${
                    display === 'graph' ? 'bi-list-ul' : 'bi-diagram-3'
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
              >
                <i
                  className={`bi ${
                    isFullscreen ? 'bi-fullscreen-exit' : 'bi-arrows-fullscreen'
                  }`}
                  style={{ fontSize: '1.5rem' }}
                />
              </StyledDisplaySwitchButton>
            </Col>
          </Row>
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
