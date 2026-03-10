/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import StyledDd from '../../styles/shared/DescriptionDetail'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledResponsiveCol from '../../styles/shared/ResponsiveCol'
import { ITimelinesTransformed } from '../../types/ITimelines'
import { IHalLinks } from '../../types/IHalLinks'

import ListRow from './ListRow'

interface IProps {
  sortedKeys: Array<string>
  yearsArray: Array<string>
  transformedData: ITimelinesTransformed
  searchTags: IHalLinks
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
  const unitLength = 20
  const [displayLength, setDisplayLength] = useState<number>(unitLength)
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([])
  // set the years to render based on user filtering
  const sortedYearsRange: Array<string> = []
  console.log('rowRefs: ', rowRefs.current)
  console.log('listRef: ', listRef.current)

  yearsArray.map((y) => {
    if (sortedKeys.includes(y)) {
      sortedYearsRange.push(y)
    }
  })

  useEffect(() => {
    if (focusedIndex !== null && rowRefs.current[focusedIndex]) {
      rowRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLUListElement>,
  ): number | null => {
    if (sortedYearsRange.length === 0) {
      return null
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setFocusedIndex((prev) => {
        if (prev === null) return 0
        return (prev + 1) % sortedYearsRange.length
      })
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setFocusedIndex((prev) => {
        if (prev === null) return sortedYearsRange.length - 1
        return (prev - 1 + sortedYearsRange.length) % sortedYearsRange.length
      })
    }

    return null
  }

  const handleListFocus = (): void => {
    if (focusedIndex === null) setFocusedIndex(0)
  }

  const handleShowMore = (): void => {
    setDisplayLength(displayLength + unitLength)
  }

  const handleShowLess = (): void => {
    setDisplayLength(displayLength - unitLength)
  }

  return (
    <React.Fragment>
      <dl
        ref={listRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={handleListFocus}
        style={{ listStyle: 'disc', paddingLeft: 24 }}
        data-testid="timeline-list-container"
      >
        {sortedYearsRange.slice(0, displayLength).map((year, idx) => (
          <StyledDiv key={year} className="mb-2">
            <HoverableRow
              ref={(el: HTMLAnchorElement | null) =>
                (rowRefs.current[idx] = el)
              }
              tabIndex={focusedIndex === idx ? 0 : -1}
              style={{
                background: focusedIndex === idx ? '#e0e0e0' : 'transparent',
                outline: focusedIndex === idx ? '2px solid #1976d2' : 'none',
              }}
              onBlur={() => setFocusedIndex(null)}
            >
              <Col xs={12} sm={12} md={6} lg={12} xl={6}>
                <StyledDt data-testid={`${year}-label`}>
                  {TimelineParser.getYearWithLabel(year)}
                </StyledDt>
              </Col>
              <StyledResponsiveCol xs={12} sm={12} md={6} lg={12} xl={6}>
                <StyledDd data-testid={`${year}-total`}>
                  Total: {transformedData[year].total}
                </StyledDd>
              </StyledResponsiveCol>
            </HoverableRow>
            {Object.keys(transformedData[year]).map((searchTag, ind) => {
              if (searchTag !== 'total' && searchTag !== 'criteria') {
                return (
                  <dl className="my-0" key={`${year}-${searchTag}-${ind}`}>
                    <ListRow
                      searchTags={searchTags}
                      data={transformedData}
                      year={year}
                      searchTag={searchTag}
                      ref={(el: HTMLAnchorElement | null) => {
                        if (listRef.current !== null) {
                          listRef.current[ind] = el
                        }
                      }}
                      currentFocus={focusedIndex === idx ? 0 : -1}
                    />
                  </dl>
                )
              }
              return null
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
    </React.Fragment>
  )
}

export default List
