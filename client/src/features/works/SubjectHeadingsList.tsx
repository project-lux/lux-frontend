import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import RecordLink from '../common/RecordLink'
import { getSubjectHeadingObject } from '../../lib/parse/data/helper'
import config from '../../config/config'
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import SearchResultsLink from '../relatedLists/SearchResultsLink'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'

interface ILinkData {
  subjectHeadings: Array<string> | string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatSubjectHeadingHalLink = (params: Record<string, any>): string => {
  const urlParams = new URLSearchParams()
  urlParams.set('q', JSON.stringify(params))
  return `${config.env.dataApiBaseUrl}api/search/work?${urlParams.toString()}`
}

// Show an expandable list of links with a label in the left column
const SubjectHeadingsList: React.FC<ILinkData> = ({ subjectHeadings }) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const subjectHeadingsSearchCriteriaObjects = Array.isArray(subjectHeadings)
    ? subjectHeadings.map((link) => getSubjectHeadingObject(link))
    : [getSubjectHeadingObject(subjectHeadings)]
  const subjectHeadingsSearchCriteria = {
    AND: subjectHeadingsSearchCriteriaObjects,
  }
  const halLink = formatSubjectHeadingHalLink(subjectHeadingsSearchCriteria)
  const { isSuccess, data } = useGetSearchRelationshipQuery({
    uri: halLink,
  })

  return (
    <Row className="data-row">
      <Col xl={7} lg={7} md={7} sm={12} xs={12}>
        {Array.isArray(subjectHeadings) ? (
          subjectHeadings.map((link, ind: number) => (
            <React.Fragment key={link}>
              <RecordLink url={link} />{' '}
              {ind !== subjectHeadings.length - 1 ? ' -- ' : ''}
            </React.Fragment>
          ))
        ) : (
          <RecordLink url={subjectHeadings} />
        )}
      </Col>
      <Col xl={5} lg={5} md={5} sm={12} xs={12}>
        {isSuccess && data && (
          <SearchResultsLink
            data={data}
            eventTitle="Subject Headings Search Link"
            url={halLink}
            scope="works"
            additionalLinkText={isMobile ? 'work' : ''}
          />
        )}
      </Col>
    </Row>
  )
}

export default SubjectHeadingsList
