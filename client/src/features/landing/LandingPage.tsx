import React, { useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Row, Col } from 'react-bootstrap'

import { UnitCode } from '../../config/cms'
import { pickRandomUnits } from '../../lib/cms/util'
import { ErrorFallback } from '../error/ErrorFallback'
import {
  useGetFeaturedCollectionsQuery,
  useGetLandingPageQuery,
  useGetLandingPageImagesQuery,
} from '../../redux/api/cmsApi'
import { useGetStatsQuery } from '../../redux/api/ml_api'
import {
  HeaderContainerCol,
  StyledLandingPage,
} from '../../styles/features/landing/LandingPage'
import StyledHeadingOne from '../../styles/features/landing/HeadingOne'
import StickySearchContainer from '../search/StickySearchContainer'
import EditCollectionModal from '../myCollections/EditCollectionModal'
import IMyCollection from '../../types/data/IMyCollection'

import FeaturedCollectionsSection from './FeaturedCollectionsSection'
import FooterBlocks from './FooterBlocksSection'
import HeroImageSection from './HeroImageSection'
import Infographics from './InfographicsSection'
import MoreAboutLux from './MoreAboutLuxSection'

const Landing: React.FC = () => {
  const [units, setUnits] = useState([] as UnitCode[])

  const landingPageResult = useGetLandingPageQuery()
  const imagesResult = useGetLandingPageImagesQuery()
  const featuredResult = useGetFeaturedCollectionsQuery()
  const statsResult = useGetStatsQuery()

  if (
    imagesResult.isSuccess &&
    featuredResult.isSuccess &&
    units.length === 0
  ) {
    setUnits(pickRandomUnits())
  }

  return (
    <StyledLandingPage id="landing-body" className="mx-0">
      <Col xs={12} className="px-0">
        <Row className="mx-0 bg-white">
          <HeaderContainerCol className="col-12 text-center">
            <StyledHeadingOne>Explore Yale Collections</StyledHeadingOne>
          </HeaderContainerCol>
        </Row>
        <StickySearchContainer />
        <EditCollectionModal
          data={{} as IMyCollection}
          showModal={true}
          onClose={() => null}
          editOptionSelected={'image'}
        />
        <Row id="srch-hero-container" className="mx-0">
          {imagesResult.isSuccess && units.length > 0 && (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Row className="d-flex row mx-0 px-0 pt-4">
                <Col className="px-0">
                  <HeroImageSection data={imagesResult.data} unit={units[0]} />
                </Col>
              </Row>
            </ErrorBoundary>
          )}
        </Row>
        {featuredResult.isSuccess && units.length > 0 && (
          <Row className="mx-0">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <FeaturedCollectionsSection
                  data={featuredResult.data}
                  units={units.slice(1)}
                />
              </ErrorBoundary>
            </Col>
          </Row>
        )}
        {landingPageResult.isSuccess && landingPageResult.data && (
          <Row className="mx-0">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <MoreAboutLux data={landingPageResult.data} />
              </ErrorBoundary>
            </Col>
          </Row>
        )}
        {statsResult.isSuccess && statsResult.data && (
          <Row className="mx-0">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <Infographics data={statsResult.data} />
              </ErrorBoundary>
            </Col>
          </Row>
        )}
        {landingPageResult.isSuccess && landingPageResult.data && (
          <Row className="mx-0">
            <Col xs={12}>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                <FooterBlocks data={landingPageResult.data} />
              </ErrorBoundary>
            </Col>
          </Row>
        )}
      </Col>
    </StyledLandingPage>
  )
}

export default Landing
