/* eslint-disable react/no-danger */

import React from 'react'
import { Col } from 'react-bootstrap'

import OpenGraphHelmet from '../common/OpenGraphHelmet'
import { PageKey } from '../../config/cms'
// import useTitle from '../../lib/hooks/useTitle'
import ContentPageParser from '../../lib/parse/cms/ContentPageParser'
import { processHtml } from '../../lib/parse/cms/helper'
import { useGetPageQuery } from '../../redux/api/cmsApi'
import StyledAboutPage from '../../styles/features/cms/AboutPage'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'

import AboutSideBar from './AboutSideBar'

interface IProps {
  pageKey: PageKey // current page
}

/**
 * About page with content rendered from CMS data.
 * @param {PageKey} pageKey the name of the page used for retrieving the CMS data
 * @returns {JSX.Element}
 */
const AboutPage: React.FC<IProps> = ({ pageKey }) => {
  const result = useGetPageQuery({ pageKey })
  let title = 'Loading...'
  let body = ''

  if (!result.isFetching && result.isSuccess && result.data) {
    const parser = new ContentPageParser(result.data)

    title = parser.getTitle()
    body = parser.getBody()
  }

  // useTitle(title)

  return (
    <React.Fragment>
      <OpenGraphHelmet title={title} />
      <StyledAboutPage className="mx-0" data-testid="about-page">
        <Col xs={12} className="px-0">
          <h1 data-testid="about-page-header">{title}</h1>
        </Col>
      </StyledAboutPage>
      <StyledAboutPage className="mx-0 pt-4">
        <Col xs={12} sm={12} md={12} lg={3}>
          <AboutSideBar />
        </Col>
        <Col xs={12} sm={12} md={12} lg={9}>
          {result.isLoading || result.isFetching ? (
            <StyledEntityPageSection>
              <p>Loading...</p>
            </StyledEntityPageSection>
          ) : (
            <StyledEntityPageSection
              className="p-4"
              dangerouslySetInnerHTML={{ __html: processHtml(body) }}
              data-testid="about-page-body"
            />
          )}
        </Col>
      </StyledAboutPage>
    </React.Fragment>
  )
}

export default AboutPage
