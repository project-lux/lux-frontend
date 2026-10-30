import React, { RefObject } from 'react'
import { Button } from 'react-bootstrap'

import TimelineParser from '../../lib/parse/timeline/TimelineParser'

interface IProps {
  panelId: string
  filtersOpen: boolean
  toggleRef: RefObject<HTMLButtonElement | null>
  years: Array<string>
  startIndex: number
  endIndex: number
  relationshipCount: number
  selectedRelationshipCount: number
  resultCount: number
  isFiltered: boolean
  onToggle: () => void
  onReset: () => void
}

/**
 * Stays visible while the filter panel is hidden, so the active filters are
 * always shown and announced in both the graph and list views.
 */
const TimelineFilterToolbar: React.FC<IProps> = ({
  panelId,
  filtersOpen,
  toggleRef,
  years,
  startIndex,
  endIndex,
  relationshipCount,
  selectedRelationshipCount,
  resultCount,
  isFiltered,
  onToggle,
  onReset,
}) => {
  const showEras = TimelineParser.showYearEra(years)
  const getYearLabel = (year: string): string =>
    showEras ? TimelineParser.getYearWithLabel(year) : year

  return (
    <div className="d-flex flex-wrap align-items-center column-gap-3 row-gap-1 mb-3">
      <Button
        ref={toggleRef}
        variant={filtersOpen ? 'primary' : 'outline-primary'}
        size="sm"
        aria-expanded={filtersOpen}
        aria-controls={panelId}
        onClick={onToggle}
        data-testid="timeline-filters-toggle-button"
      >
        <i className="bi bi-funnel me-1" aria-hidden="true" />
        Filters
      </Button>
      <p role="status" className="mb-0" data-testid="timeline-filter-status">
        Showing {getYearLabel(years[startIndex])} to{' '}
        {getYearLabel(years[endIndex])}
        {relationshipCount > 1 &&
          `, ${selectedRelationshipCount} of ${relationshipCount} relationships`}
        , {resultCount} result{resultCount !== 1 && 's'}
      </p>
      {isFiltered && (
        <Button
          variant="link"
          className="text-decoration-none p-0"
          onClick={onReset}
          data-testid="timeline-filter-reset-button"
        >
          Reset filters
        </Button>
      )}
    </div>
  )
}

export default TimelineFilterToolbar
