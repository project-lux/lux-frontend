import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import config from '../../config/config'
import SetParser from '../../lib/parse/data/SetParser'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import { ErrorFallback } from '../error/ErrorFallback'
import UV from '../common/UV'
import {
  getNextSetUris,
  isEntityAnArchive,
} from '../../lib/util/hierarchyHelpers'
import ArchiveHierarchyContainer from '../archiveHierarchy/ArchiveHierarchyContainer'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import { archive } from '../../config/setsSearchTags'
import HowDoISeeIt from '../common/HowDoISeeIt'
import ISet from '../../types/data/ISet'
import IEntity from '../../types/data/IEntity'
import MyCollectionsPage from '../myCollections/MyCollectionsPage'

import About from './About'
import CollectionPage from './CollectionPage'

const SetsPage: React.FC<{ data: ISet }> = ({ data }) => {
  const setParser = new SetParser(data)
  const isCollectionPage =
    setParser.isClassifiedAs(config.aat.collection) ||
    setParser.isClassifiedAs(config.aat.exhibition)
  const classifiedAs = setParser.getTypes()
  const manifestId = setParser.getManifestId()
  const hierarchyData: {
    entity: IEntity
    currentPageWithinParentResultsHalLink: null | string
  } = {
    entity: data as IEntity,
    currentPageWithinParentResultsHalLink: setParser.getHalLink(
      'lux:itemCurrentHierarchyPage',
    ),
  }

  if (isCollectionPage) {
    return <CollectionPage data={data} />
  }

  if (
    config.env.featureMyCollections &&
    classifiedAs.includes(config.aat.personalCollection)
  ) {
    return <MyCollectionsPage data={data} />
  }
  const isArchive = setParser.isArchive()
  const memberOf = setParser.getMemberOf()
  const objectsWithImagesHalLink = setParser.getHalLink(archive.searchTag)
  const halLinkTitle = archive.title

  return (
    <React.Fragment>
      <div className="SetsPage">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <EntityHeader entity={data}>
            {isArchive && (
              <GenericBreadcrumbHierarchy
                key={setParser.json.id}
                entity={data}
                columnClassName="px-0"
                id="sets-page"
                getNextEntityUri={getNextSetUris}
                linkFilter={isEntityAnArchive}
                maxLength={8}
              />
            )}
          </EntityHeader>
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <UV manifest={manifestId} />
        </ErrorBoundary>
        <StyledEntityBody>
          <Col lg={8}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <About data={data} />
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              {memberOf.length > 0 && (
                <ArchiveHierarchyContainer
                  key={data.id}
                  entityData={hierarchyData}
                  currentEntityIsArchive={isArchive}
                  objectsWithImagesHalLink={objectsWithImagesHalLink}
                  halLinkTitle={halLinkTitle}
                />
              )}
            </ErrorBoundary>
          </Col>
          <Col lg={4}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <StyledEntityPageSection>
                <HowDoISeeIt data={data} />
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
            </ErrorBoundary>
          </Col>
        </StyledEntityBody>
      </div>
    </React.Fragment>
  )
}

export default SetsPage
