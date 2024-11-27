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

  // create an array of years where each year is repeated based on its total
  const proportionalYearArray = []
  for (const year of sortedKeys) {
    const totalForYear = transformedData ? transformedData[year].total : 0
    for (let i = 0; i < totalForYear; i++) {
      proportionalYearArray.push(year)
    }
  }

  // find the indexes that split the proportional data into lowest quarter and highest quarters
  const q1Index = Math.floor(proportionalYearArray.length / 4)
  const q3Index = Math.floor((proportionalYearArray.length / 4) * 3)

  // get the values at those indexes
  const q1 = parseInt(proportionalYearArray[q1Index], 10)
  const q3 = parseInt(proportionalYearArray[q3Index], 10)

  // calculate interquartile range (span of middle 50% of data)
  const iqr = q3 - q1

  // set a multiplication factor for iqr (larger means less datapoints are considered outliers, less means more data points are considered outliers)
  const factor = 1.5
  // calculate limits (quartiles +/- factor * iqr)
  const lowerLimit = Math.round(q1 - factor * iqr)
  const upperLimit = Math.round(q3 + factor * iqr)

  // set start and end indexes based on iqr calculations
  const [startIndex, setStartIndex] = useState<number>(
    lowerLimit < parseInt(yearsRange[0], 10)
      ? 0
      : yearsRange.indexOf(lowerLimit.toString()),
  )
  const [endIndex, setEndIndex] = useState<number>(
    upperLimit > parseInt(yearsRange[yearsRange.length - 1], 10)
      ? yearsRange.length - 1
      : yearsRange.indexOf(upperLimit.toString()),
  )

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
