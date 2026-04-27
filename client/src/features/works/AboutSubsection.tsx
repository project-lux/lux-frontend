import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import StyledHr from '../../styles/shared/Hr'
import ExpandableList from '../common/ExpandableList'
import TextValue from '../common/TextValue'
import TextLabel from '../common/TextLabel'
import { isObjectOrWork } from '../../lib/util/uri'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'

import SubjectHeadingsList from './SubjectHeadingsList'

interface ILinkData {
  content: Array<Array<string> | string>
  id: string
  label?: string
  expandColumns?: boolean
}

// Show an expandable list of links with a label in the left column
const AboutSubsection: React.FC<ILinkData> = ({
  content,
  id,
  label,
  expandColumns = false,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const { pathname } = useLocation()

  useResizeableWindow(setIsMobile)

  const values = content.map((c: Array<string> | string) => (
    <SubjectHeadingsList subjectHeadings={c} />
  ))

  if (content && content.length > 0) {
    return (
      <Row id={id} data-testid={`${id}-row`}>
        <Col xl={3} lg={3} md={12} sm={12}>
          {label !== undefined && <TextLabel label={label} />}
        </Col>
        <Col xl={9} lg={9} md={12} sm={12}>
          <Row>
            {!isMobile && (
              <React.Fragment>
                <Col xs={7}>
                  <dt>Subjects</dt>
                </Col>
                <Col xs={5}>
                  <dt>Matching Works</dt>
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
