/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { IHalLinks } from '../../types/IHalLinks'
import { useGetTimelineQuery } from '../../redux/api/ml_api'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
// import StyledDisplaySwitchButton from '../../styles/shared/DisplaySwitchButton'
import {
  sortTimelineData,
  transformTimelineData,
} from '../../lib/util/timelineHelper'
import StyledDisplaySwitchButton from '../../styles/shared/DisplaySwitchButton'

import List from './List'
import Graph from './Graph'

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

  const [display, setDisplay] = useState<'list' | 'graph'>('graph')

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
            </Col>
            <Col xs={12}>
              {display === 'list' ? (
                <List
                  sortedKeys={sortedKeys}
                  transformedData={transformedData}
                  searchTags={searchTags}
                />
              ) : (
                <Graph data={transformedData} />
              )}
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
