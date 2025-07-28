import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorBoundary } from 'react-error-boundary'

import config from '../../config/config'
import StyledEntityBody from '../../styles/shared/EntityBody'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import DataSources from '../common/DataSources'
import EntityHeader from '../common/EntityHeader'
import FeedbackButton from '../common/FeedbackButton'
import { ErrorFallback } from '../error/ErrorFallback'
import ImageThumbnail from '../common/ImageThumbnail'
import IMyCollection from '../../types/data/IMyCollection'
import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'

import About from './About'
import Containing from './Containing'

const MyCollectionsPage: React.FC<{ data: IMyCollection }> = ({ data }) => {
  const myCollection = new MyCollectionParser(data)
  const name = myCollection.getPrimaryName(config.aat.primaryName)
  const images = myCollection.getImages()

  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <EntityHeader entity={data} />
      </ErrorBoundary>
      <StyledEntityBody>
        <Col lg={8}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Containing data={data} />
          </ErrorBoundary>
        </Col>
        <Col lg={4}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <StyledEntityPageSection className="row">
              <Col xs={12}>
                {images.length > 0 && (
                  <div style={{ height: '20rem' }}>
                    <ImageThumbnail imageInfo={images[0]} name={name} />
                  </div>
                )}
                <About data={data} />
              </Col>
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
    </React.Fragment>
  )
}

export default MyCollectionsPage
