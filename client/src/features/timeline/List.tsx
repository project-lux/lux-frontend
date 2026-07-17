import React, { KeyboardEvent, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import StyledDd from '../../styles/shared/DescriptionDetail'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledResponsiveCol from '../../styles/shared/ResponsiveCol'
import {
  ITimelineCriteria,
  ITimelinesTransformed,
} from '../../types/ITimelines'
import { IHalLinks } from '../../types/IHalLinks'

import ListRow from './ListRow'

interface IProps {
  sortedKeys: Array<string>
  yearsArray: Array<string>
  transformedData: ITimelinesTransformed
  searchTags: IHalLinks
}

interface IYearRowIndexes {
  parent: number
  children: Record<string, number>
  linkIndexes: Record<string, number>
}

const getRenderedHalLinks = (
  data: ITimelinesTransformed,
  year: string,
): Array<string> =>
  Object.keys(data[year]).filter(
    (halLink) => halLink !== 'total' && halLink !== 'criteria',
  )

const calculateRowIndexes = (
  years: Array<string>,
  data: ITimelinesTransformed,
): {
  totalRows: number
  totalLinks: number
  yearRows: Record<string, IYearRowIndexes>
} => {
  let nextRowIndex = 0
  let nextLinkIndex = 0
  const yearRows: Record<string, IYearRowIndexes> = {}

  years.forEach((year) => {
    const children: Record<string, number> = {}
    const linkIndexes: Record<string, number> = {}
    const parent = nextRowIndex
    nextRowIndex += 1

    getRenderedHalLinks(data, year).forEach((halLink) => {
      children[halLink] = nextRowIndex
      linkIndexes[halLink] = nextLinkIndex
      nextRowIndex += 1
      nextLinkIndex += 1
    })

    yearRows[year] = {
      parent,
      children,
      linkIndexes,
    }
  })

  return {
    totalRows: nextRowIndex,
    totalLinks: nextLinkIndex,
    yearRows,
  }
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
  searchTags,
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

  const handleShowMore = (): void => {
    setDisplayLength(displayLength + unitLength)
  }

  const handleShowLess = (): void => {
    setDisplayLength(displayLength - unitLength)
  }

  const showEras = TimelineParser.showYearEra(yearsArray)
  const sortedYears = sortedYearsRange.slice(0, displayLength)
  const rowRefs = useRef<Array<HTMLDivElement | null>>([])
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const { totalRows, totalLinks, yearRows } = calculateRowIndexes(
    sortedYears,
    transformedData,
  )

  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
      return
    }
    if (!sortedYears.length) {
      return
    }
    event.preventDefault()

    const activeElement = document.activeElement
    const currentLinkIndex = linkRefs.current.findIndex(
      (link) => link !== null && link === activeElement,
    )

    if (event.key === 'ArrowDown') {
      linkRefs.current[
        currentLinkIndex < 0
          ? 0
          : Math.min(currentLinkIndex + 1, totalLinks - 1)
      ]?.focus()
      return
    }

    linkRefs.current[
      currentLinkIndex < 0 ? totalLinks - 1 : Math.max(currentLinkIndex - 1, 0)
    ]?.focus()
  }

  rowRefs.current = rowRefs.current.slice(0, totalRows)
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
            <HoverableRow
              role="option"
              tabIndex={-1}
              ref={(element: HTMLDivElement | null) => {
                rowRefs.current[yearRows[year].parent] = element
              }}
            >
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
            {getRenderedHalLinks(transformedData, year).map((halLink, ind) => {
              const yearData = transformedData[year][
                halLink
              ] as ITimelineCriteria
              return (
                <dl className="my-0" key={`${year}-${halLink}-${ind}`}>
                  <ListRow
                    searchTags={searchTags}
                    data={transformedData}
                    year={year}
                    halLink={halLink}
                    searchTag={yearData.searchTag}
                    rowRefs={rowRefs}
                    index={yearRows[year].children[halLink]}
                    linkRefs={linkRefs}
                    linkIndex={yearRows[year].linkIndexes[halLink]}
                  />
                </dl>
              )
            })}
          </StyledDiv>
        ))}
      </dl>
      {displayLength >= unitLength &&
        displayLength < sortedYearsRange.length && (
          <button
            type="button"
            className="btn btn-link show-more ps-0 text-decoration-none"
            onClick={() => handleShowMore()}
          >
            Show More
          </button>
        )}
      {displayLength > unitLength && (
        <button
          type="button"
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
