import React, { useEffect } from 'react'
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
import WhereAtYale from '../common/WhereAtYale'
import HowDoISeeIt from '../works/HowDoISeeIt'
import { ErrorFallback } from '../error/ErrorFallback'
import UV from '../common/UV'
import ObjectSetHierarchy from '../common/ObjectSetHierarchy'
import HierarchyContainer from '../common/HierarchyContainer'
import { reset } from '../../redux/slices/hierarchySlice'
import { useAppDispatch } from '../../app/hooks'

import About from './About'
import CollectionPage from './CollectionPage'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SetsPage: React.FC<{ data: any }> = ({ data }) => {
  const setParser = new SetParser(data)
  const isCollectionPage =
    setParser.isClassifiedAs(config.dc.collection) ||
    setParser.isClassifiedAs(config.dc.exhibition)
  const manifestId = setParser.getManifestId()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reset())
  }, [dispatch])

  if (isCollectionPage) {
    return <CollectionPage data={data} />
  }
  const isArchive = setParser.isArchive()
  const types = setParser.getTypes()
  const [supertypeIcon, helperText] = setParser.getSupertypeIcon(types)
  const memberOf = setParser.getMemberOf()

  return (
    <React.Fragment>
      <div className="SetsPage">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <EntityHeader
            entity={data}
            icon={supertypeIcon}
            entityTypeForIcon={helperText}
          >
            {isArchive && (
              <ObjectSetHierarchy entity={data} columnClassName="px-0" />
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
              <HierarchyContainer
                key={data.id}
                entity={data}
                parentsOfCurrentEntity={memberOf}
                currentEntityIsArchive={isArchive}
              />
            </ErrorBoundary>
          </Col>
          <Col lg={4}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <StyledEntityPageSection className="row">
                <HowDoISeeIt entity={data} />
                {isArchive && <WhereAtYale data={data} />}
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
