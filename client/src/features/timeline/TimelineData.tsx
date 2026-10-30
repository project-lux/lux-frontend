import React, { useMemo, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import {
  ITimelinesTransformed,
  ITimelineHalLinks,
} from '../../types/ITimelines'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import theme from '../../styles/theme'
import {
  getFilteredYearTotal,
  getTimelineRelationships,
} from '../../lib/parse/timeline/timelineGraphHelper'

import List from './List'
import Graph from './Graph'
import TimelineFilters from './TimelineFilters'
import TimelineFilterToolbar from './TimelineFilterToolbar'

// The filter panel sits beside the view on wider screens and above it on narrow ones
const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${theme.breakpoints.md}px) {
    flex-direction: row;
    align-items: flex-start;
  }
`

const StyledPanel = styled.div`
  border: 1px solid ${theme.color.lightGray};
  border-radius: ${theme.border.radius};
  padding: 1rem;

  @media (min-width: ${theme.breakpoints.md}px) {
    flex: 0 0 240px;
  }
`

const StyledView = styled.div`
  flex: 1 1 auto;
  min-width: 0;
`

const filtersPanelId = 'timeline-filters-panel'

const TimelineData: React.FC<{
  display: string
  sortedKeys: Array<string>
  transformedData: ITimelinesTransformed | null
  halLinkConfig: ITimelineHalLinks
}> = ({ display, sortedKeys, transformedData, halLinkConfig }) => {
  // Add additional years that were not returned with the data.
  // Memoized so that changing the Brush range does not pass the graph a new array.
  const yearsRange = useMemo(
    () => TimelineParser.addYearsWithNoData(sortedKeys),
    [sortedKeys],
  )
  const relationships = useMemo(
    () => (transformedData ? getTimelineRelationships(transformedData) : []),
    [transformedData],
  )

  const { initialStart, initialEnd } = TimelineParser.getStartAndEndIndex(
    sortedKeys,
    transformedData,
    yearsRange,
  )

  // The filters live here so that the graph and the list share them
  const [startIndex, setStartIndex] = useState<number>(initialStart)
  const [endIndex, setEndIndex] = useState<number>(initialEnd)
  const [selectedRelationships, setSelectedRelationships] =
    useState<Array<string>>(relationships)

  const handleIndexChange = (start: number, end: number): void => {
    setStartIndex(start)
    setEndIndex(end)
  }

  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)
  const filtersToggleRef = useRef<HTMLButtonElement>(null)
  // remounts the filter panel on reset so any invalid text in the year inputs is cleared too
  const [resetCount, setResetCount] = useState<number>(0)

  const handleReset = (): void => {
    handleIndexChange(initialStart, initialEnd)
    setSelectedRelationships(relationships)
    setResetCount((count) => count + 1)
  }

  const handleCloseFilters = (): void => {
    setFiltersOpen(false)
    // the close button is about to be hidden, so return focus to the toggle
    filtersToggleRef.current?.focus()
  }

  if (transformedData !== null) {
    const yearsInRange = yearsRange.slice(startIndex, endIndex + 1)
    const resultCount = yearsInRange.reduce(
      (total, year) =>
        total +
        getFilteredYearTotal(transformedData, year, selectedRelationships),
      0,
    )
    const isFiltered =
      startIndex !== initialStart ||
      endIndex !== initialEnd ||
      selectedRelationships.length !== relationships.length

    return (
      <Row className="overflow-scroll" style={{ height: '100%' }}>
        <Col xs={12}>
          <TimelineFilterToolbar
            panelId={filtersPanelId}
            filtersOpen={filtersOpen}
            toggleRef={filtersToggleRef}
            years={yearsRange}
            startIndex={startIndex}
            endIndex={endIndex}
            relationshipCount={relationships.length}
            selectedRelationshipCount={selectedRelationships.length}
            resultCount={resultCount}
            isFiltered={isFiltered}
            onToggle={() => setFiltersOpen((open) => !open)}
            onReset={handleReset}
          />
          <StyledLayout>
            <StyledPanel hidden={!filtersOpen}>
              <TimelineFilters
                key={resetCount}
                id={filtersPanelId}
                years={yearsRange}
                startIndex={startIndex}
                endIndex={endIndex}
                relationships={relationships}
                selectedRelationships={selectedRelationships}
                onRangeChange={handleIndexChange}
                onRelationshipsChange={setSelectedRelationships}
                onClose={handleCloseFilters}
              />
            </StyledPanel>
            <StyledView>
              {display === 'list' ? (
                <List
                  // remount on filter changes so "Show More" starts from the first page
                  key={`${startIndex}-${endIndex}-${selectedRelationships.join()}`}
                  sortedKeys={sortedKeys}
                  yearsArray={yearsInRange}
                  transformedData={transformedData}
                  halLinkConfig={halLinkConfig}
                  selectedRelationships={selectedRelationships}
                />
              ) : (
                <Graph
                  timelineData={transformedData}
                  halLinkConfig={halLinkConfig}
                  yearsArray={yearsRange}
                  startIndex={startIndex}
                  endIndex={endIndex}
                  handleRangeChange={handleIndexChange}
                  selectedRelationships={selectedRelationships}
                  handleRelationshipsChange={setSelectedRelationships}
                />
              )}
            </StyledView>
          </StyledLayout>
        </Col>
      </Row>
    )
  }

  return null
}

export default TimelineData
