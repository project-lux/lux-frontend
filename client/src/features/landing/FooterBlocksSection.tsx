import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { Col, Row } from 'react-bootstrap'

import { ICmsResponse, CmsResponseParser } from '../../lib/parse/cms/Parser'
import { LandingPageParser } from '../../lib/parse/cms/LandingPageParser'
import StyledFooterBlocksSection from '../../styles/features/landing/FooterBlocksSection'
import StyledHr from '../../styles/shared/Hr'

interface IProps {
  data: ICmsResponse
}

const FooterBlocksSection: React.FC<IProps> = ({ data }) => {
  const parser = new CmsResponseParser(data)
  const content = parser.getLandingPage()
  const landingPageParser = new LandingPageParser(content)
  const footerBlocks = landingPageParser.getFooterBlocks()
  const blockElems = footerBlocks.map((blockHtml, ind) => (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={4}
      xl={4}
      className="d-flex px-0 block"
      key={blockHtml.slice(0, 10)}
    >
      <Row>
        <Col xs={12}>
          {}
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(blockHtml) }} />
        </Col>
        {ind !== footerBlocks.length - 1 && (
          <Col xs={12}>
            <StyledHr width="100%" className="footerBlocks" />
          </Col>
        )}
      </Row>
    </Col>
  ))

  return (
    <StyledFooterBlocksSection
      className="d-flex justify-content-between"
      data-testid="footer-blocks-section"
    >
      {blockElems}
    </StyledFooterBlocksSection>
  )
}

export default FooterBlocksSection
