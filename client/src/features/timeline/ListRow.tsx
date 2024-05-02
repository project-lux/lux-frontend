import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'

import { formatDateJsonSearch } from '../../lib/facets/dateParser'
import {
  ITimelineCriteria,
  ITimelinesTransformed,
} from '../../types/ITimelines'
import { pushSiteImproveEvent } from '../../lib/siteImprove'
import { IHalLinks } from '../../types/IHalLinks'
import theme from '../../styles/theme'
import StyledDd from '../../styles/shared/DescriptionDetail'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledResponsiveCol from '../../styles/shared/ResponsiveCol'

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
  searchTag: string
}> = ({ searchTags, data, year, searchTag }) => {
  const facetNameMap: Map<string, string> = new Map([
    ['itemProductionDate', 'Objects Produced'],
    ['itemEncounteredDate', 'Objects Encountered'],
    ['workCreationDate', 'Works Created'],
    ['workPublicationDate', 'Works Published'],
  ])

  console.log(searchTag)
  const { tab, jsonSearchTerm } = searchTags[searchTag]
  const { criteria, totalItems } = data[year][searchTag] as ITimelineCriteria
  const searchQ = formatDateJsonSearch(year, jsonSearchTerm as string, criteria)
  return (
    <HoverableRow key={`${searchTag}-${year}`}>
      <Col xs={12} sm={12} md={6} lg={12} xl={6}>
        <StyledDt data-testid={`${year}-${searchTag}-relationship`}>
          {facetNameMap.get(searchTag)}
        </StyledDt>
      </Col>
      <StyledResponsiveCol xs={12} sm={12} md={6} lg={12} xl={6}>
        <StyledDd>
          <Link
            to={{
              pathname: `/view/results/${tab}`,
              search: `q=${searchQ}&collapseSearch=true`,
            }}
            state={{
              targetName: `/view/results/${tab}q=${searchQ}&collapseSearch=true`,
            }}
            onClick={() =>
              pushSiteImproveEvent('Search Link', 'Selected', 'Timeline')
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
