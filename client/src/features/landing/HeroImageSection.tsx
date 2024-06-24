import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ICmsResponse, CmsResponseParser } from '../../lib/parse/cms/Parser'
import {
  IImageData,
  LandingPageImageParser,
} from '../../lib/parse/cms/LandingPageImageParser'
import { UnitCode } from '../../config/cms'
import StyledHeroImageSection from '../../styles/features/landing/HeroImageSection'
import { pushClientEvent } from '../../lib/pushClientEvent'

import WhatIsLux from './WhatIsLux'

interface IProps {
  data: ICmsResponse
  unit: UnitCode
}

const HeroImageSection: React.FC<IProps> = ({ data, unit }) => {
  const [imageData, setImageData] = useState<IImageData | null>(null)

  useEffect(() => {
    const parser = new CmsResponseParser(data)
    const content = parser.getLandingPageImages()
    const landingPageImageParser = new LandingPageImageParser(content)

    setImageData(landingPageImageParser.getHeroImage(unit))
  }, [data, unit])

  const linkState = {
    targetName: imageData !== null ? imageData.caption : 'Hero Image',
  }
  return (
    <StyledHeroImageSection className="hero">
      {imageData && (
        <React.Fragment>
          <WhatIsLux />
          <div
            className="hero-image-container"
            data-testid="hero-image-container"
          >
            <Link
              to={imageData.recordUrl}
              state={linkState}
              onClick={() =>
                pushClientEvent('Entity Link', 'Selected', 'Hero Image Link')
              }
            >
              <img alt={imageData.altText} src={imageData.url} />
            </Link>
          </div>
          {imageData.caption && (
            <div className="captionDiv">
              <div className="caption">
                <Link
                  to={imageData.recordUrl}
                  onClick={() =>
                    pushClientEvent(
                      'Entity Link',
                      'Selected',
                      'Hero Image Link',
                    )
                  }
                  state={linkState}
                  data-testid="hero-image-caption-link"
                >
                  {imageData.caption.length > 30
                    ? `${imageData.caption.slice(0, 30)}...`
                    : imageData.caption}
                </Link>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </StyledHeroImageSection>
  )
}

export default HeroImageSection
