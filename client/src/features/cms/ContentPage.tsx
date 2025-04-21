import React from 'react'
import { Alert, Col } from 'react-bootstrap'

import { PageKey } from '../../config/cms'
import useTitle from '../../lib/hooks/useTitle'
import ContentPageParser from '../../lib/parse/cms/ContentPageParser'
import { processHtml } from '../../lib/parse/cms/helper'
import { useGetPageQuery } from '../../redux/api/cmsApi'
import StyledContentPage from '../../styles/features/cms/ContentPage'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'

import ContentPageSideBar from './ContentPageSideBar'

interface IProps {
  pageKey: PageKey
  pages: Map<string, string>
}

/**
 * Component used for rendering CMS data on multiple pages.
 * @param {PageKey} pageKey the name of the page used for retrieving the CMS data
 * @returns {JSX.Element}
 */
const ContentPage: React.FC<IProps> = ({ pageKey, pages }) => {
  const result = useGetPageQuery({ pageKey })
  let title = ''
  let body = ''

  if (!result.isFetching && result.isSuccess && result.data) {
    const parser = new ContentPageParser(result.data)

    title = parser.getTitle()
    body = parser.getBody()
  }

  useTitle(title)

  if (result.isError) {
    return (
      <Alert key="warning" variant="warning">
        An error occurred while retrieving the information. Please try again
        later.
      </Alert>
    )
  }

  return (
    <React.Fragment>
      <StyledContentPage className="mx-0" data-testid="about-page">
        <Col xs={12} className="px-0">
          <h1 id="content-header" data-testid="content-page-header">
            {result.isLoading || result.isFetching ? 'Loading...' : title}
          </h1>
        </Col>
      </StyledContentPage>
      <StyledContentPage className="mx-0 pt-4">
        <Col xs={12} sm={12} md={12} lg={3}>
          <ContentPageSideBar pages={pages} />
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
              data-testid="content-page-body"
            />
          )}
        </Col>
      </StyledContentPage>
    </React.Fragment>
  )
}

export default ContentPage
