/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react'
import { Col, Row } from 'react-bootstrap'

import { IHalLinks } from '../../types/IHalLinks'
import { useGetTimelineQuery } from '../../redux/api/ml_api'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import StyledDisplaySwitchButton from '../../styles/shared/DisplaySwitchButton'
import { ITimelinesTransformed } from '../../types/ITimelines'

import List from './List'
// import Graph from './Graph'

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
  const timelineRef = useRef<HTMLDivElement>(null)

  const { data, isSuccess, isError } = useGetTimelineQuery(links)

  if (isSuccess && data) {
    const transformedData = transformTimelineData(data)
    const sortedKeys = sortTimelineData(transformedData)

    if (sortedKeys.length !== 0) {
      return (
        <StyledEntityPageSection
          data-testid="timeline-container"
          ref={timelineRef}
        >
          <Row>
            <Col xs={8}>
              <h2>Timeline of Related Objects/Works</h2>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <List
                sortedKeys={sortedKeys}
                transformedData={transformedData}
                searchTags={searchTags}
              />
            </Col>
          </Row>
        </StyledEntityPageSection>
      )
    }
    return null
  }

  if (isError) {
    return null
  }

  return null
}

export default TimelineContainer
