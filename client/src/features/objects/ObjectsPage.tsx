import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'
import { Helmet } from 'react-helmet'

import StyledEntityBody from '../../styles/shared/EntityBody'
import EntityHeader from '../common/EntityHeader'
import UV from '../common/UV'
import WhereAtYale from '../common/WhereAtYale'
import FeedbackButton from '../common/FeedbackButton'
import DataSources from '../common/DataSources'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import { ErrorFallback } from '../error/ErrorFallback'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import ArchiveHierarchyContainer from '../common/ArchiveHierarchyContainer'
import CanIReuseIt from '../common/CanIReuseIt'
import {
  getNextSetUris,
  isEntityAnArchive,
} from '../../lib/util/hierarchyHelpers'
import { archive } from '../../config/setsSearchTags'

import Carries from './Carries'
import About from './About'
import HowDoISeeIt from './HowDoISeeIt'

const st1 = `{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Title of a News Article",
  "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg"
   ],
  "datePublished": "2015-02-05T08:00:00+08:00",
  "dateModified": "2015-02-05T09:20:00+08:00",
  "author": [{
      "@type": "Person",
      "name": "Jane Doe",
      "url": "https://example.com/profile/janedoe123"
    },{
      "@type": "Person",
      "name": "John Doe",
      "url": "https://example.com/profile/johndoe123"
  }]
}
`

const st2 = `{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "The Adventures of Kira and Morrison",
  "startDate": "2025-07-21T19:00-05:00",
  "endDate": "2025-07-21T23:00-05:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Snickerpark Stadium",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "100 West Snickerpark Dr",
      "addressLocality": "Snickertown",
      "postalCode": "19019",
      "addressRegion": "PA",
      "addressCountry": "US"
    }
  },
  "image": [
    "https://example.com/photos/1x1/photo.jpg",
    "https://example.com/photos/4x3/photo.jpg",
    "https://example.com/photos/16x9/photo.jpg"
   ],
  "description": "The Adventures of Kira and Morrison is coming to Snickertown in a can't miss performance.",
  "offers": {
    "@type": "Offer",
    "url": "https://www.example.com/event_offer/12345_201803180430",
    "price": "30",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-05-21T12:00"
  },
  "performer": {
    "@type": "PerformingGroup",
    "name": "Kira and Morrison"
  },
  "organizer": {
    "@type": "Organization",
    "name": "Kira and Morrison Music",
    "url": "https://kiraandmorrisonmusic.com"
  }
}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ObjectsPage: React.FC<{ data: any }> = ({ data }) => {
  const element = new ObjectParser(data)
  const types = element.getTypes()
  const personUri = element.getAgentFromProductionEvent() || undefined
  const [supertypeIcon, helperText] = element.getSupertypeIcon(types)
  const manifestId = element.getManifestId()
  const memberOf = element.getMemberOf()
  const objectsWithImagesHalLink = element.getHalLink(archive.searchTag)
  const halLinkTitle = archive.title

  return (
    <React.Fragment>
      <Helmet>
        <script type="application/ld+json">{st1}</script>
        <script type="application/ld+json">{st2}</script>
      </Helmet>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader
          entity={data}
          icon={supertypeIcon}
          entityTypeForIcon={helperText}
          primaryAgent={personUri}
        >
          {element.json.member_of && (
            <GenericBreadcrumbHierarchy
              entity={data}
              columnClassName="px-0"
              id="object-page"
              getNextEntityUri={getNextSetUris}
              linkFilter={isEntityAnArchive}
              maxLength={8}
            />
          )}
        </EntityHeader>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <UV key={manifestId} manifest={manifestId} />
      </ErrorBoundary>
      <StyledEntityBody>
        <Col>
          <Row>
            <Col lg={8}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Carries entity={data} />
              </ErrorBoundary>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <About data={data} />
              </ErrorBoundary>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {memberOf.length > 0 && (
                  <ArchiveHierarchyContainer
                    key={data.id}
                    entity={data}
                    parentsOfCurrentEntity={memberOf}
                    objectsWithImagesHalLink={objectsWithImagesHalLink}
                    halLinkTitle={halLinkTitle}
                  />
                )}
              </ErrorBoundary>
            </Col>
            <Col lg={4}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <StyledEntityPageSection className="row">
                  <HowDoISeeIt entity={data} />
                  <WhereAtYale data={data} />
                  <CanIReuseIt entity={data} entityType="object" />
                </StyledEntityPageSection>
              </ErrorBoundary>
              <Row>
                <Col xs={12}>
                  <FeedbackButton />
                </Col>
              </Row>
              <StyledEntityPageSection className="row">
                <Col xs={12} className="my-2">
                  <DataSources entity={data} />
                </Col>
              </StyledEntityPageSection>
            </Col>
          </Row>
        </Col>
      </StyledEntityBody>
    </React.Fragment>
  )
}

export default ObjectsPage
