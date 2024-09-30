import React, { useState } from 'react'
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

const List: React.FC<IProps> = ({
  sortedKeys,
  yearsArray,
  transformedData,
  searchTags,
}) => {
  console.log(yearsArray)
  console.log(sortedKeys)
  // set the years to render based on user filtering
  const sortedYearsRange: Array<string> = []

  yearsArray.map((y) => {
    console.log(y)
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

  return (
    <React.Fragment>
      <dl>
        {sortedYearsRange.slice(0, displayLength).map((year) => (
          <div key={year} className="mb-2">
            <HoverableRow>
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
                    />
                  </dl>
                )
              }
              return null
            })}
          </div>
        ))}
      </dl>
      {displayLength >= unitLength &&
        displayLength < sortedYearsRange.length && (
          <button
            type="button"
            className="btn btn-link show-more"
            onClick={() => handleShowMore()}
          >
            Show More
          </button>
        )}
      {displayLength > unitLength && (
        <button
          type="button"
          className="btn btn-link show-less"
          onClick={() => handleShowLess()}
        >
          Show Less
        </button>
      )}
    </React.Fragment>
  )
}

export default List
