import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ObjectsPage: React.FC<{ data: any }> = ({ data }) => {
  const element = new ObjectParser(data)
  const personUri = element.getAgentFromProductionEvent() || undefined
  const [supertypeIcon, helperText] = element.getSupertypeIcon()
  const manifestId = element.getManifestId()
  const memberOf = element.getMemberOf()
  const objectsWithImagesHalLink = element.getHalLink(archive.searchTag)
  const halLinkTitle = archive.title

  return (
    <React.Fragment>
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
