import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row } from 'react-bootstrap'

import config from '../../config/config'
import Dates from '../common/Dates'
import RecordLink from '../common/RecordLink'
import PersonAndGroupParser from '../../lib/parse/data/PersonAndGroupParser'
import StyledHr from '../../styles/shared/Hr'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'
import { pushClientEvent } from '../../lib/pushClientEvent'

import SnippetHeader from './SnippetHeader'

interface ISearchData {
  uri: string
  view: string
}

const PersonSnippet: React.FC<ISearchData> = ({ uri, view }) => {
  const { data, isSuccess, isLoading } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isSuccess && data) {
    const person = new PersonAndGroupParser(data)
    const primaryName = person.getPrimaryName(config.aat.langen)
    let startDate = ''
    let endDate = ''

    if (person.json.type === 'Person') {
      startDate = person.getBirthYear()
      endDate = person.getDeathYear()
    }

    if (person.json.type === 'Group') {
      startDate = person.getFormationYear()
      endDate = person.getDissolutionYear()
    }

    const images = person.getImages()
    const occupations = person.getOccupations()
    const nationalities = person.getNationalities()

    const dates = <Dates start={startDate} end={endDate} />
    const snippetDataComponent = (
      <StyledDl>
        {occupations.length > 0 && (
          <Row>
            <Col>
              <StyledDt>Occupations/Roles</StyledDt>
              <StyledDd data-testid="person-group-result-snippet-occupation">
                <RecordLink
                  url={occupations[0]}
                  linkCategory="Results Snippet"
                />
              </StyledDd>
            </Col>
          </Row>
        )}
        {nationalities.length > 0 && (
          <Row>
            <Col>
              <StyledDt>Nationalities</StyledDt>
              <StyledDd data-testid="person-group-result-snippet-nationality">
                <RecordLink
                  url={nationalities[0]}
                  linkCategory="Results Snippet"
                />
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
            <SnippetHeader data={data} snippetData={snippetDataComponent}>
              {dates}
            </SnippetHeader>
          </div>
          <StyledHr width="100%" className="personSnippetHr" />
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
            <Card.Body>
              <StyledSnippetTitle
                className="card-title d-flex"
                data-testid="grid-view-person-group-results-snippet-title"
              >
                <Link
                  to={{
                    pathname: `/view/${stripYaleIdPrefix(data.id)}`,
                  }}
                  onClick={() =>
                    pushClientEvent(
                      'Entity Link',
                      'Selected',
                      'Results Snippet Link',
                    )
                  }
                >
                  {primaryName.length > 200
                    ? `${primaryName.slice(0, 200)}...`
                    : primaryName}
                  {dates}
                </Link>
              </StyledSnippetTitle>
              <Card.Text>
                <StyledDl>
                  {occupations.length > 0 && (
                    <React.Fragment>
                      <StyledDt hidden>Occupations/Roles</StyledDt>
                      <StyledDd>
                        <RecordLink
                          url={occupations[0]}
                          linkCategory="Results Snippet"
                        />
                      </StyledDd>
                    </React.Fragment>
                  )}
                  {nationalities.length > 0 && (
                    <React.Fragment>
                      <StyledDt hidden>Nationalities</StyledDt>
                      <StyledDd>
                        <RecordLink
                          url={nationalities[0]}
                          linkCategory="Results Snippet"
                        />
                      </StyledDd>
                    </React.Fragment>
                  )}
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

export default PersonSnippet
