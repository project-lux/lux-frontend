import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import StyledHr from '../../styles/shared/Hr'
import ExpandableList from '../common/ExpandableList'
import TextValue from '../common/TextValue'
import { isObjectOrWork } from '../../lib/util/uri'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { scopeToTabTranslation } from '../../config/searchTypes'
import { capitalizeLabels } from '../../lib/parse/data/helper'

import SubjectHeadingsList from './SubjectHeadingsList'

interface ILinkData {
  content: Array<Array<string> | string>
  expandColumns?: boolean
}

// Show an expandable list of links with a label in the left column
const AboutSubsection: React.FC<ILinkData> = ({
  content,
  expandColumns = false,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const { pathname } = useLocation()
  let halLinkScope = 'work'
  Object.keys(scopeToTabTranslation).forEach((key) => {
    if (pathname.includes(key)) {
      halLinkScope = key
    }
  })
  const searchResultsTab = scopeToTabTranslation[halLinkScope]

  const values = content.map((c: Array<string> | string) => (
    <SubjectHeadingsList subjectHeadings={c} />
  ))

  if (content && content.length > 0) {
    return (
      <Row id="about-subject-headings" data-testid="about-subject-headings-row">
        <Col xl={3} lg={3} md={12} sm={12}>
          <dt>About</dt>
        </Col>
        <Col xl={9} lg={9} md={12} sm={12}>
          <Row>
            {!isMobile && (
              <React.Fragment>
                <Col xs={7}>
                  <dt>Subjects</dt>
                </Col>
                <Col xs={5}>
                  <dt>Matching {capitalizeLabels(searchResultsTab)}</dt>
                </Col>
              </React.Fragment>
            )}
            <ExpandableList
              className="col-sm-12"
              length={20}
              itemSpacing="double"
            >
              <TextValue
                values={values}
                className="col-12"
                itemSpacing="double"
              />
            </ExpandableList>
          </Row>
        </Col>
        <StyledHr
          className="linkContainerHr"
          hidden={expandColumns || (isObjectOrWork(pathname) && isMobile)}
        />
      </Row>
    )
  }

  return null
}

export default AboutSubsection
