import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import {
  calculateRowIndexes,
  getRenderedHalLinks,
} from '../../lib/parse/timeline/timelineGraphHelper'
import StyledDd from '../../styles/shared/DescriptionDetail'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledResponsiveCol from '../../styles/shared/ResponsiveCol'
import {
  ITimelinesTransformed,
  ITimelineHalLinks,
} from '../../types/ITimelines'

import ListRow from './ListRow'

interface IProps {
  sortedKeys: Array<string>
  yearsArray: Array<string>
  transformedData: ITimelinesTransformed
  halLinkConfig: ITimelineHalLinks
}

const HoverableRow = styled(Row)`
  &:hover {
    background-color: ${theme.color.lightGray};
  }

  &:focus-within {
    background-color: ${theme.color.lightGray};
  }
`

const StyledDiv = styled.div`
  border-bottom: solid 1px rgb(128, 149, 232, 0.75);

  @media (min-width: ${theme.breakpoints.md}px) {
    border: none;
  }
`

const List: React.FC<IProps> = ({
  sortedKeys,
  yearsArray,
  transformedData,
  halLinkConfig,
}) => {
  // set the years to render based on user filtering
  const sortedYearsRange: Array<string> = []

  yearsArray.map((y) => {
    if (sortedKeys.includes(y)) {
      sortedYearsRange.push(y)
    }
  })

  const unitLength = 20
  const [displayLength, setDisplayLength] = useState<number>(unitLength)
  const firstNewLinkIndexRef = useRef<number | null>(null)
  const lastVisibleLinkIndexRef = useRef<number | null>(null)

  const showEras = TimelineParser.showYearEra(yearsArray)
  const sortedYears = sortedYearsRange.slice(0, displayLength)
  const canShowMore =
    displayLength >= unitLength && displayLength < sortedYearsRange.length
  const canShowLess = displayLength > unitLength
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const showMoreButtonRef = useRef<HTMLButtonElement | null>(null)
  const showLessButtonRef = useRef<HTMLButtonElement | null>(null)
  const { totalLinks, yearRows } = calculateRowIndexes(
    sortedYears,
    transformedData,
  )

  const handleShowMore = (): void => {
    // set the first new link index to focus on after the list is re-rendered
    firstNewLinkIndexRef.current = totalLinks
    setDisplayLength((prevDisplayLength) => prevDisplayLength + unitLength)
  }

  const handleShowLess = (): void => {
    const nextDisplayLength = Math.max(displayLength - unitLength, unitLength)
    const nextSortedYears = sortedYearsRange.slice(0, nextDisplayLength)
    const { totalLinks: nextTotalLinks } = calculateRowIndexes(
      nextSortedYears,
      transformedData,
    )

    lastVisibleLinkIndexRef.current =
      nextTotalLinks > 0 ? nextTotalLinks - 1 : null
    setDisplayLength((prevDisplayLength) => prevDisplayLength - unitLength)
  }

  useEffect(() => {
    // focus on the first new link after the list is re-rendered
    if (firstNewLinkIndexRef.current !== null) {
      const firstNewLink = linkRefs.current[firstNewLinkIndexRef.current]
      firstNewLink?.focus()
      firstNewLinkIndexRef.current = null
      return
    }

    if (lastVisibleLinkIndexRef.current === null) {
      return
    }

    const lastVisibleLink = linkRefs.current[lastVisibleLinkIndexRef.current]
    if (lastVisibleLink) {
      lastVisibleLink.focus()
    } else {
      showMoreButtonRef.current?.focus()
    }
    lastVisibleLinkIndexRef.current = null
  }, [displayLength])

  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return
    }
    // create an array of all the links and buttons that can be navigated to with the arrow keys
    const navigableElements: Array<HTMLElement> = [
      ...linkRefs.current.filter(
        (link): link is HTMLAnchorElement => link !== null,
      ),
      ...(canShowMore && showMoreButtonRef.current
        ? [showMoreButtonRef.current]
        : []),
      ...(canShowLess && showLessButtonRef.current
        ? [showLessButtonRef.current]
        : []),
    ]

    // if there are no navigable elements, do nothing
    if (!navigableElements.length) {
      return
    }
    event.preventDefault()

    const activeElement = document.activeElement
    // find the index of the currently focused element in the navigable elements array
    const currentElementIndex = navigableElements.findIndex(
      (element) => element === activeElement,
    )

    // if the down arrow is pressed, focus on the next element in the array, wrapping to the first element if at the end of the array.
    // If the up arrow is pressed, focus on the previous element in the array, wrapping to the last element if at the beginning of the array.
    if (event.key === 'ArrowDown') {
      navigableElements[
        currentElementIndex < 0
          ? 0
          : Math.min(currentElementIndex + 1, navigableElements.length - 1)
      ]?.focus()
      return
    }

    navigableElements[
      currentElementIndex < 0
        ? navigableElements.length - 1
        : Math.max(currentElementIndex - 1, 0)
    ]?.focus()
  }

  linkRefs.current = linkRefs.current.slice(0, totalLinks)
  return (
    <div
      tabIndex={0}
      role="listbox"
      aria-label="Timeline list. Use up and down arrow keys to navigate between links."
      onKeyDown={handleListKeyDown}
    >
      <dl data-testid="timeline-list-container" role="presentation">
        {sortedYears.map((year) => (
          <StyledDiv key={year} className="mb-2">
            <HoverableRow>
              <Col xs={12} sm={12} md={6} lg={12} xl={6}>
                <StyledDt data-testid={`${year}-label`}>
                  {showEras ? TimelineParser.getYearWithLabel(year) : year}
                </StyledDt>
              </Col>
              <StyledResponsiveCol xs={12} sm={12} md={6} lg={12} xl={6}>
                <StyledDd data-testid={`${year}-total`}>
                  Total: {transformedData[year].total}
                </StyledDd>
              </StyledResponsiveCol>
            </HoverableRow>
            {getRenderedHalLinks(transformedData, year).map((halLink, ind) => (
              <dl className="my-0" key={`${year}-${halLink}-${ind}`}>
                <ListRow
                  halLinkConfig={halLinkConfig}
                  data={transformedData}
                  year={year}
                  halLink={halLink}
                  linkRefs={linkRefs}
                  linkIndex={yearRows[year].linkIndexes[halLink]}
                />
              </dl>
            ))}
          </StyledDiv>
        ))}
      </dl>
      {canShowMore && (
        <button
          ref={showMoreButtonRef}
          type="button"
          tabIndex={-1}
          className="btn btn-link show-more ps-0 text-decoration-none"
          onClick={() => handleShowMore()}
        >
          Show More
        </button>
      )}
      {canShowLess && (
        <button
          ref={showLessButtonRef}
          type="button"
          tabIndex={-1}
          className="btn btn-link show-less ps-0 text-decoration-none"
          onClick={() => handleShowLess()}
        >
          Show Less
        </button>
      )}
    </div>
  )
}

export default List
