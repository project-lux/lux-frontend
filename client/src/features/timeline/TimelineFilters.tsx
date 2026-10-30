import React from 'react'
import { CloseButton, Form } from 'react-bootstrap'

import theme from '../../styles/theme'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import { halLinkMapToLegendName } from '../../config/timeline'
import { toggleRelationship } from '../../lib/parse/timeline/timelineGraphHelper'

import TimelineYearInput from './TimelineYearInput'

interface IProps {
  id: string
  years: Array<string>
  startIndex: number
  endIndex: number
  relationships: Array<string>
  selectedRelationships: Array<string>
  onRangeChange: (start: number, end: number) => void
  onRelationshipsChange: (relationships: Array<string>) => void
  onClose: () => void
}

/**
 * The timeline's filter panel, shared by the graph and list views. Provides
 * keyboard and touch alternatives to the graph's Brush.
 */
const TimelineFilters: React.FC<IProps> = ({
  id,
  years,
  startIndex,
  endIndex,
  relationships,
  selectedRelationships,
  onRangeChange,
  onRelationshipsChange,
  onClose,
}) => {
  const showEras = TimelineParser.showYearEra(years)
  const getYearLabel = (year: string): string =>
    showEras ? TimelineParser.getYearWithLabel(year) : year
  const headingId = `${id}-heading`
  const hintId = 'timeline-filter-year-hint'

  return (
    <section id={id} aria-labelledby={headingId} data-testid="timeline-filters">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h3 id={headingId} className="fs-5 mb-0">
          Filters
        </h3>
        <CloseButton
          aria-label="Hide filters"
          onClick={onClose}
          data-testid="timeline-filters-close-button"
        />
      </div>
      <fieldset>
        <legend className="fs-6 mb-1">Years</legend>
        <Form.Text id={hintId} muted className="d-block mb-1">
          Enter years from {getYearLabel(years[0])} to{' '}
          {getYearLabel(years[years.length - 1])}
          {showEras && ', using a minus sign for B.C.E. years'}.
        </Form.Text>
        <div className="mb-2">
          <TimelineYearInput
            id="timeline-filter-start-year"
            label="From"
            field="start"
            years={years}
            index={startIndex}
            otherIndex={endIndex}
            hintId={hintId}
            allowNegative={showEras}
            onCommit={(index) => onRangeChange(index, endIndex)}
          />
        </div>
        <TimelineYearInput
          id="timeline-filter-end-year"
          label="To"
          field="end"
          years={years}
          index={endIndex}
          otherIndex={startIndex}
          hintId={hintId}
          allowNegative={showEras}
          onCommit={(index) => onRangeChange(startIndex, index)}
        />
      </fieldset>
      {relationships.length > 1 && (
        <fieldset className="mt-3">
          <legend className="fs-6 mb-1">Relationships</legend>
          {relationships.map((halLink) => {
            const label = halLinkMapToLegendName.get(halLink) || halLink
            const color =
              theme.color.graphs[label as keyof typeof theme.color.graphs]
                ?.focused
            return (
              <Form.Check
                key={halLink}
                type="checkbox"
                id={`timeline-filter-${halLink}`}
                checked={selectedRelationships.includes(halLink)}
                onChange={() =>
                  onRelationshipsChange(
                    toggleRelationship(
                      relationships,
                      selectedRelationships,
                      halLink,
                    ),
                  )
                }
                data-testid={`timeline-filter-${halLink}`}
                label={
                  <React.Fragment>
                    {/* the swatch matches the graph; the text label carries the meaning */}
                    <i
                      className="bi bi-square-fill me-1"
                      style={{ color }}
                      aria-hidden="true"
                    />
                    {label}
                  </React.Fragment>
                }
              />
            )
          })}
        </fieldset>
      )}
    </section>
  )
}

export default TimelineFilters
