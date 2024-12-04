import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import { ITimelinesTransformed } from '../../types/ITimelines'
import { IHalLinks } from '../../types/IHalLinks'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'

import List from './List'
import Graph from './Graph'

const TimelineData: React.FC<{
  display: string
  sortedKeys: Array<string>
  transformedData: ITimelinesTransformed | null
  searchTags: IHalLinks
}> = ({ display, sortedKeys, transformedData, searchTags }) => {
  // Add additional years that were not returned with the data
  const yearsRange = TimelineParser.addYearsWithNoData(sortedKeys)

  const { initialStart, initialEnd } = TimelineParser.getStartAndEndIndex(
    sortedKeys,
    transformedData,
    yearsRange,
  )

  const [startIndex, setStartIndex] = useState<number>(initialStart)
  const [endIndex, setEndIndex] = useState<number>(initialEnd)

  const handleIndexChange = (start: number, end: number): void => {
    setStartIndex(start)
    setEndIndex(end)
  }

  if (transformedData !== null) {
    return (
      <Row>
        <Col xs={12}>
          {display === 'list' ? (
            <List
              sortedKeys={sortedKeys}
              yearsArray={yearsRange.slice(startIndex, endIndex + 1)}
              transformedData={transformedData}
              searchTags={searchTags}
            />
          ) : (
            <Graph
              timelineData={transformedData}
              searchTags={searchTags}
              yearsArray={yearsRange}
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
