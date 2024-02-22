import React from 'react'
import sanitizeHtml from 'sanitize-html'

import { ICmsResponse, CmsResponseParser } from '../../lib/parse/cms/Parser'
import { LandingPageParser } from '../../lib/parse/cms/LandingPageParser'
import StyledMoreAboutLuxSection from '../../styles/features/landing/MoreAboutLuxSection'

interface IProps {
  data: ICmsResponse
}

const MoreAboutLux: React.FC<IProps> = ({ data }) => {
  const parser = new CmsResponseParser(data)
  const content = parser.getLandingPage()
  const landingPageParser = new LandingPageParser(content)
  const moreAboutLux = landingPageParser.getMoreAboutLux()

  return (
    <React.Fragment>
      {/* eslint-disable-next-line react/no-danger */}
      <StyledMoreAboutLuxSection
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(moreAboutLux) }}
        id="more-about-section"
        data-testid="more-about-lux-container"
      />
    </React.Fragment>
  )
}

export default MoreAboutLux
