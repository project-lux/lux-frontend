import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import StyledHr from '../../styles/shared/Hr'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'
import RecordLink from '../common/RecordLink'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'

import ProductionSnippet from './ProductionSnippet'
import SnippetHeader from './SnippetHeader'

interface ISearchData {
  uri: string
  view: string
}

const MyCollectionSnippet: React.FC<ISearchData> = ({ uri, view }) => {
  const { data, isSuccess, isLoading } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isSuccess && data) {
    // TODO: add function for getting number of records in the collection
    // TODO: add function for getting last modified
    const collection = new MyCollectionParser(data)
    const date = collection.getProductionDate() || null
    const images = collection.getImages()

    const snippetDataComponent = (
      <React.Fragment>
        <StyledDl>
          <Row>
            <Col>
              <StyledDt>Collection Type</StyledDt>
              <StyledDd data-testid="set-snippet-identifiers">
                My Collections
              </StyledDd>
            </Col>
          </Row>
          <Row>
            <Col>
              <StyledDt>Collection Size</StyledDt>
              <StyledDd data-testid="my-collection-snippet-modified-date">
                0
              </StyledDd>
            </Col>
          </Row>
          {date && (
            <Row>
              <Col>
                <StyledDt>Created On</StyledDt>
                <StyledDd data-testid="my-collection-snippet-created-date">
                  {date}
                </StyledDd>
              </Col>
            </Row>
          )}
          {date && (
            <Row>
              <Col>
                <StyledDt>Last Modified On</StyledDt>
                <StyledDd data-testid="my-collection-snippet-modified-date">
                  {date}
                </StyledDd>
              </Col>
            </Row>
          )}
        </StyledDl>
      </React.Fragment>
    )

    if (view === 'list') {
      return (
        <React.Fragment>
          <div className="m-2 d-flex">
            <SnippetHeader data={data} snippetData={snippetDataComponent} />
          </div>
          <StyledHr width="100%" className="workSnippetHr" />
        </React.Fragment>
      )
    }

    if (view === 'grid') {
      return (
        <Col className="h-auto">
          <Card className="h-100">
            {images.length > 0 ? (
              <PreviewImageOrIcon
                images={images}
                entity={data}
                className="card-img-top py-0"
                width="auto"
                height="auto"
              />
            ) : (
              <PreviewImageOrIcon
                images={images}
                entity={data}
                className="card-img-top"
                height="152px"
                width="auto"
              />
            )}
            <Card.Body data-testid="grid-view-set-results-snippet-title">
              <StyledSnippetTitle className="card-title d-flex">
                <RecordLink url={data.id} linkCategory="Results Snippet" />
              </StyledSnippetTitle>
              <Card.Text>
                <StyledDl>
                  <ProductionSnippet
                    agents={agents}
                    date={date}
                    label="Creator"
                  />
                </StyledDl>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )
    }
  }

  if (isLoading) {
    return (
      <div className="loading">
        <h3>Loading data...</h3>
      </div>
    )
  }

  return (
    <div className="error">
      <h3>An error occurred fetching the data.</h3>
    </div>
  )
}

export default MyCollectionSnippet
