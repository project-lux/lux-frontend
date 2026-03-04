import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import EventParser from '../../lib/parse/data/EventParser'
import StyledHr from '../../styles/shared/Hr'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'
import RecordLink from '../common/RecordLink'
import TypeList from '../common/TypeList'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'

import SnippetHeader from './SnippetHeader'

interface IProps {
  uri: string
  view: string
  titleOfTabbedContent?: string
}

const EventSnippet: React.FC<IProps> = ({
  uri,
  view,
  titleOfTabbedContent,
}) => {
  const { data, isSuccess, isLoading } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isSuccess && data) {
    const event = new EventParser(data)
    const agents = event.getCarriedOutBy()
    const dates = event.getDates()
    const locations = event.getLocations()
    const types = event.getTypes()
    const images = event.getImages()

    const snippetDataComponent = (
      <StyledDl>
        {types.length > 0 && <TypeList types={types} />}
        {agents.length > 0 && (
          <Row>
            <Col>
              <StyledDt>Carried Out By</StyledDt>
              <StyledDd data-testid="event-snippet-carried-out-by">
                <RecordLink url={agents[0].id} linkCategory="Results Snippet" />
              </StyledDd>
            </Col>
          </Row>
        )}
        {dates.length > 0 && (
          <Row>
            <Col>
              <StyledDt>Dates</StyledDt>
              <StyledDd data-testid="event-snippet-dates">{dates[0]}</StyledDd>
            </Col>
          </Row>
        )}
        {locations.length > 0 && (
          <Row>
            <Col>
              <StyledDt>Took Place At</StyledDt>
              <StyledDd data-testid="event-snippet-took-place-at">
                <RecordLink url={locations[0]} linkCategory="Results Snippet" />
              </StyledDd>
            </Col>
          </Row>
        )}
      </StyledDl>
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
          <StyledHr width="100%" className="eventSnippetHr" />
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

export default EventSnippet
