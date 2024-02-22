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

interface IProps {
  data: ICmsResponse
  units: UnitCode[]
}

const FeaturedCollectionsSection: React.FC<IProps> = ({ data, units }) => {
  const featuredCollectionParser = new FeaturedCollectionParser(data)
  const collections = featuredCollectionParser.getCollections(units)

  const blockElems = collections.map((coll, ind) => (
    <StyledFeaturedCollection
      key={coll.searchUrl}
      xs={12}
      sm={12}
      md={4}
      data-testid={`featured-collection-${ind}`}
    >
      <Card>
        <div className="image-container">
          <a href={coll.searchUrl}>
            <img alt={coll.imageAlt} src={coll.imageUrl} />
          </a>
        </div>
        <Card.Body>
          <h2>
            <a href={coll.searchUrl}>{coll.title}</a>
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(coll.bodyHtml) }}
          />
          <div className="search-url">
            <a href={coll.searchUrl}>View {coll.title}</a>
          </div>
        </Card.Body>
      </Card>
    </StyledFeaturedCollection>
  ))

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
