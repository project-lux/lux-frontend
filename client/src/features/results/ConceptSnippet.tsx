import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import config from '../../config/config'
import ConceptParser from '../../lib/parse/data/ConceptParser'
import StyledHr from '../../styles/shared/Hr'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import { getNextConceptUris } from '../../lib/util/hierarchyHelpers'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import RecordLink from '../common/RecordLink'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'

import SnippetHeader from './SnippetHeader'

interface IProps {
  uri: string
  view: string
  totalResults?: number
  index?: number
  pageLength?: number
  titleOfTabbedContent?: string
}

const ConceptSnippet: React.FC<IProps> = ({
  uri,
  view,
  totalResults,
  index,
  pageLength = 20,
  titleOfTabbedContent,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const { data, isSuccess, isLoading } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isSuccess && data) {
    const concept = new ConceptParser(data)
    const images = concept.getImages()
    const descriptions = concept.getDescriptions(config.aat.langen)
    const className = concept.getEntityClassName()

    const snippetDataComponent = (
      <React.Fragment>
        <StyledDl>
          {descriptions.length > 0 && (
            <Row>
              <Col>
                <StyledDt>Descriptions</StyledDt>
                <StyledDd data-testid="concept-snippet-description">{`${descriptions[0].slice(
                  0,
                  view === 'list' ? 200 : 100,
                )}...`}</StyledDd>
              </Col>
            </Row>
          )}
          {className && (
            <Row>
              <Col>
                <StyledDt>Concept Class</StyledDt>
                <StyledDd data-testid="concept-snippet-class">
                  {className}
                </StyledDd>
              </Col>
            </Row>
          )}
        </StyledDl>
        <GenericBreadcrumbHierarchy
          key={concept.json.id}
          entity={data}
          id="concept-snippet"
          getNextEntityUri={getNextConceptUris}
          maxLength={10}
        />
      </React.Fragment>
    )

    if (view === 'list') {
      return (
        <React.Fragment>
          <div className="m-2 d-flex">
            <SnippetHeader
              data={data}
              snippetData={snippetDataComponent}
              titleOfTabbedContent={titleOfTabbedContent}
            />
          </div>
          <StyledHr
            width="100%"
            className={`conceptSnippetHr ${
              isMobile &&
              totalResults &&
              index &&
              totalResults <= pageLength &&
              index === totalResults
                ? 'lastResult'
                : ''
            }`}
          />
        </React.Fragment>
      )
    }

    if (view === 'grid') {
      return (
        <Col className="h-auto">
          <Card className="h-100" data-testid="grid-view">
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
            <Card.Body>
              <StyledSnippetTitle
                className="card-title d-flex"
                data-testid="grid-view-object-results-snippet-title"
              >
                <RecordLink
                  url={data.id}
                  className="overflow-auto"
                  linkCategory="Results Snippet"
                />
              </StyledSnippetTitle>
              <Card.Text>{snippetDataComponent}</Card.Text>
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

export default ConceptSnippet
