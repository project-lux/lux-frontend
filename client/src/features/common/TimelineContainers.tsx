/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import theme from '../../styles/theme'
import { IHalLinks } from '../../types/IHalLinks'
import { useGetTimelineQuery } from '../../redux/api/ml_api'
import {
  sortTimelineData,
  transformTimelineData,
} from '../../lib/parse/search/timelineParser'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import StyledDd from '../../styles/shared/DescriptionDetail'
import StyledDt from '../../styles/shared/DescriptionTerm'
import { formatDateJsonSearch } from '../../lib/facets/dateParser'
import StyledResponsiveCol from '../../styles/shared/ResponsiveCol'
import {
  ITimelineCriteria,
  ITimelinesTransformed,
} from '../../types/ITimelines'
import { pushSiteImproveEvent } from '../../lib/siteImprove'

const HoverableRow = styled(Row)`
  &:hover {
    background-color: ${theme.color.lightGray};
  }

  &:focus-within {
    background-color: ${theme.color.lightGray};
  }
`

const getHalLinks = (
  searchTags: IHalLinks,
  providedHalLinks: any,
): Array<string> => {
  const filteredHalLinks: Array<string> = []

  Object.keys(providedHalLinks || {}).map((link: string) =>
    Object.keys(searchTags).map((tag) => {
      if (
        searchTags[tag].searchTag === link &&
        providedHalLinks[link]._estimate > 0
      ) {
        filteredHalLinks.push(providedHalLinks[link].href)
      }
      return null
    }),
  )

  return filteredHalLinks
}

const Relations: React.FC<{
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

  const { tab, jsonSearchTerm } = searchTags[searchTag]
  const { criteria, totalItems } = data[year][searchTag] as ITimelineCriteria
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
              search: `q=${formatDateJsonSearch(
                year,
                jsonSearchTerm as string,
                criteria,
              )}&collapseSearch=true`,
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

const TimelineContainers: React.FC<{
  searchTags: IHalLinks
  providedHalLinks: any
}> = ({ searchTags, providedHalLinks }) => {
  const links = getHalLinks(searchTags, providedHalLinks)
  const { data, isSuccess, isError } = useGetTimelineQuery(links)
  const unitLength = 20
  const [displayLength, setDisplayLength] = useState<number>(unitLength)

  if (isSuccess && data) {
    const transformedData = transformTimelineData(data)
    const sortedKeys = sortTimelineData(transformedData)
    const keys = Object.keys(transformedData)

    // Only return component if there is data
    if (keys.length !== 0) {
      return (
        <React.Fragment>
          <StyledEntityPageSection
            className="row"
            data-testid="timeline-container"
          >
            <Col xs={12}>
              <h2>Timeline of Related Objects/Works</h2>
            </Col>
            <Col xs={12}>
              <dl>
                {sortedKeys.slice(0, displayLength).map((year) => (
                  <div key={year} className="mb-2">
                    <HoverableRow>
                      <Col xs={12} sm={12} md={6} lg={12} xl={6}>
                        <StyledDt data-testid={`${year}-label`}>
                          {year}
                        </StyledDt>
                      </Col>
                      <StyledResponsiveCol
                        xs={12}
                        sm={12}
                        md={6}
                        lg={12}
                        xl={6}
                      >
                        <StyledDd data-testid={`${year}-total`}>
                          Total: {transformedData[year].total}
                        </StyledDd>
                      </StyledResponsiveCol>
                    </HoverableRow>
                    {Object.keys(transformedData[year]).map(
                      (searchTag, ind) => {
                        if (searchTag !== 'total' && searchTag !== 'criteria') {
                          return (
                            <dl
                              className="my-0"
                              // eslint-disable-next-line react/no-array-index-key
                              key={`${year}-${searchTag}-${ind}`}
                            >
                              <Relations
                                searchTags={searchTags}
                                data={transformedData}
                                year={year}
                                searchTag={searchTag}
                              />
                            </dl>
                          )
                        }
                        return null
                      },
                    )}
                  </div>
                ))}
              </dl>
              {displayLength >= unitLength && displayLength < keys.length && (
                <button
                  type="button"
                  className="btn btn-link show-more"
                  onClick={() => setDisplayLength(keys.length)}
                >
                  Show All
                </button>
              )}
              {displayLength > unitLength && (
                <button
                  type="button"
                  className="btn btn-link show-less"
                  onClick={() => setDisplayLength(unitLength)}
                >
                  Show Less
                </button>
              )}
            </Col>
          </StyledEntityPageSection>
        </React.Fragment>
      )
    }

    return null
  }

  if (isError) {
    return null
  }

  return null
}

export default TimelineContainers
