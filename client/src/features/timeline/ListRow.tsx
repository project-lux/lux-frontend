import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import {
  ITimelineCriteria,
  ITimelinesTransformed,
} from '../../types/ITimelines'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { IHalLinks } from '../../types/IHalLinks'
import theme from '../../styles/theme'
import StyledDd from '../../styles/shared/DescriptionDetail'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledResponsiveCol from '../../styles/shared/ResponsiveCol'
import { halLinkMapToLegendName } from '../../config/timeline'

const HoverableRow = styled(Row)`
  &:hover {
    background-color: ${theme.color.lightGray};
  }

  &:focus-within {
    background-color: ${theme.color.lightGray};
  }
`

const ListRow: React.FC<{
  searchTags: IHalLinks
  data: ITimelinesTransformed
  year: string
  halLink: string
  searchTag: string
}> = ({ searchTags, data, year, halLink, searchTag }) => {
  const { tab } = searchTags[searchTag]
  const { searchParams, totalItems } = data[year][halLink] as ITimelineCriteria

  return (
    <HoverableRow key={`${halLink}-${year}`}>
      <Col xs={12} sm={12} md={6} lg={12} xl={6}>
        <StyledDt data-testid={`${year}-${halLink}-relationship`}>
          {halLinkMapToLegendName.get(halLink)}
        </StyledDt>
      </Col>
      <StyledResponsiveCol xs={12} sm={12} md={6} lg={12} xl={6}>
        <StyledDd>
          <Link
            to={{
              pathname: `/view/results/${tab}`,
              search: `${searchParams}&searchLink=true`,
            }}
            onClick={() =>
              pushClientEvent('Search Link', 'Selected', 'Timeline')
            }
            data-testid={`${year}-${searchTag}-search-link`}
          >
            Show all {totalItems} result
            {totalItems !== 1 && `s`}
          </Link>
        </StyledDd>
      </StyledResponsiveCol>
    </HoverableRow>
  )
}

export default ListRow
