/* eslint-disable react/no-danger */

import React from 'react'
import { Card } from 'react-bootstrap'
import sanitizeHtml from 'sanitize-html'
import { Link, useLocation } from 'react-router-dom'

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
  const { pathname } = useLocation()
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
          <Link
            to={coll.searchUrl}
            state={{ prevPath: pathname, targetName: coll.title }}
          >
            <img alt={coll.imageAlt} src={coll.imageUrl} />
          </Link>
        </div>
        <Card.Body>
          <h2>
            <Link
              to={coll.searchUrl}
              state={{ prevPath: pathname, targetName: coll.title }}
            >
              {coll.title}
            </Link>
          </h2>
          <div
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(coll.bodyHtml) }}
          />
          <div className="search-url">
            <Link
              to={coll.searchUrl}
              state={{ prevPath: pathname, targetName: `View ${coll.title}` }}
            >
              View {coll.title}
            </Link>
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
