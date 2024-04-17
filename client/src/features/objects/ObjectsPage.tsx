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

import Carries from './Carries'
import About from './About'
import HowDoISeeIt from './HowDoISeeIt'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ObjectsPage: React.FC<{ data: any }> = ({ data }) => {
  const element = new ObjectParser(data)
  const types = element.getTypes()
  const personUri = element.getAgentFromProductionEvent() || undefined
  const [supertypeIcon, helperText] = element.getSupertypeIcon(types)
  const manifestId = element.getManifestId()
  const memberOf = element.getMemberOf()

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
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Row>
              <Col lg={8}>
                <Carries entity={data} />
                <About data={data} />
                {memberOf.length > 0 && (
                  <ArchiveHierarchyContainer
                    key={data.id}
                    entity={data}
                    parentsOfCurrentEntity={memberOf}
                  />
                )}
              </Col>
              <Col lg={4}>
                <StyledEntityPageSection className="row">
                  <HowDoISeeIt entity={data} />
                  <WhereAtYale data={data} />
                  <CanIReuseIt entity={data} entityType="object" />
                </StyledEntityPageSection>
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
          </ErrorBoundary>
        </Col>
      </StyledEntityBody>
    </React.Fragment>
  )
}

export default ObjectsPage
