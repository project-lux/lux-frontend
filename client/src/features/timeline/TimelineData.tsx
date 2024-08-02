import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
// import styled from 'styled-components'

import { ITimelinesTransformed } from '../../types/ITimelines'
import { IHalLinks } from '../../types/IHalLinks'
import { addYearsWithNoData } from '../../lib/util/timelineHelper'
import Slider from '../common/Slider'

import List from './List'
import Graph from './Graph'

// const StyledButton = styled(Accordion.Header)`
//   .accordion-button {
//     padding: 0.5rem;
//     width: 20%;
//   }
// `

const TimelineData: React.FC<{
  display: string
  sortedKeys: Array<string>
  transformedData: ITimelinesTransformed | null
  searchTags: IHalLinks
}> = ({ display, sortedKeys, transformedData, searchTags }) => {
  // Add additional years that were not returned with the data
  const yearsArray = addYearsWithNoData(sortedKeys)

  const [startIndex, setStartIndex] = useState<number>(0)
  const [endIndex, setEndIndex] = useState<number>(yearsArray.length - 1)

  const handleIndexChange = (start: number, end: number): void => {
    setStartIndex(start)
    setEndIndex(end)
  }

  if (transformedData !== null) {
    return (
      <Row>
        {/* <Col xs={12} className="d-flex">
          <Accordion>
            <Accordion.Item eventKey="0">
              <StyledButton>Filter By Years</StyledButton>
              <Accordion.Body className="ps-1 pt-2">
                <ZoomInput
                  key={`${zoomState.data[0].yearKey}-${
                    zoomState.data[zoomState.data.length - 1].yearKey
                  }`}
                  state={zoomState}
                  setZoomState={setZoomState}
                  setZoom={zoom}
                  setZoomOut={zoomOut}
                  disabledZoomOut={zoomState.data.length === graphData.length}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col> */}
        <Col xs={12}>
          <Slider
            min={startIndex}
            max={endIndex}
            earliestVal="0"
            latestVal={(yearsArray.length - 1).toString()}
            onEarliestChange={() => console.log('earliest')}
            onLatestChange={() => console.log('earliest')}
          />
          {display === 'list' ? (
            <List
              sortedKeys={sortedKeys}
              transformedData={transformedData}
              searchTags={searchTags}
            />
          ) : (
            <Graph
              timelineData={transformedData}
              searchTags={searchTags}
              yearsArray={yearsArray}
              startIndex={startIndex}
              endIndex={endIndex}
              handleRangeChange={handleIndexChange}
            />
          )}
        </Col>
      </Row>
    )
  }

  return null
}

export default TimelineData
