import React from 'react'
import sanitizeHtml from 'sanitize-html'

import { ICmsResponse, CmsResponseParser } from '../../lib/parse/cms/Parser'
import { LandingPageParser } from '../../lib/parse/cms/LandingPageParser'
import StyledFooterBlocksSection from '../../styles/features/landing/FooterBlocksSection'

interface IProps {
  data: ICmsResponse
}

const FooterBlocksSection: React.FC<IProps> = ({ data }) => {
  const parser = new CmsResponseParser(data)
  const content = parser.getLandingPage()
  const landingPageParser = new LandingPageParser(content)
  const footerBlocks = landingPageParser.getFooterBlocks()
  const blockElems = footerBlocks.map((blockHtml) => (
    <div
      className="d-flex col-12 col-lg-4 px-0 block"
      key={blockHtml.slice(0, 10)}
    >
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(blockHtml) }} />
    </div>
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
