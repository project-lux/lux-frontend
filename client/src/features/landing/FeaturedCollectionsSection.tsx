/* eslint-disable react/no-danger */

import React from 'react'
import { Card } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'

import { UnitCode } from '../../config/cms'
import {
  ICmsResponse,
  FeaturedCollectionParser,
} from '../../lib/parse/cms/FeaturedCollectionParser'
import StyledFeaturedCollection from '../../styles/features/landing/FeaturedCollection'
import StyledFeaturedCollectionsSection from '../../styles/features/landing/FeaturedCollectionsSection'
import InternalLink from '../common/InternalLink'

interface IProps {
  data: ICmsResponse
  units: UnitCode[]
}

const FeaturedCollectionsSection: React.FC<IProps> = ({ data, units }) => {
  const featuredCollectionParser = new FeaturedCollectionParser(data)
  const collections = featuredCollectionParser.getCollections(units)

  const blockElems = collections.map((coll, ind) => {
    const { searchUrl, imageAlt, imageUrl, bodyHtml, title } = coll

    return (
      <StyledFeaturedCollection
        key={searchUrl}
        xs={12}
        sm={12}
        md={4}
        data-testid={`featured-collection-${ind}`}
      >
        <Card>
          <div className="image-container">
            <InternalLink
              uri={searchUrl}
              name=""
              linkCategory="Featured Collection"
            >
              <img alt={imageAlt} src={imageUrl} />
            </InternalLink>
          </div>
          <Card.Body>
            <h2>
              <InternalLink
                uri={searchUrl}
                name={title}
                linkCategory="Featured Collection"
              />
            </h2>
            <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(bodyHtml) }} />
            <div className="search-url">
              <InternalLink
                uri={searchUrl}
                name={`View ${title}`}
                linkCategory="Featured Collection"
              />
            </div>
          </Card.Body>
        </Card>
      </StyledFeaturedCollection>
    )
  })

  return (
    <StyledFeaturedCollectionsSection
      className="d-flex justify-content-between"
      id="featured-collections-section"
      data-testid="featured-collections-container"
    >
      {blockElems}
    </StyledFeaturedCollectionsSection>
  )
}

export default FeaturedCollectionsSection
