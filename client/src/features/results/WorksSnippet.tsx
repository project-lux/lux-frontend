import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import WorkParser from '../../lib/parse/data/WorkParser'
import StyledHr from '../../styles/shared/Hr'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'
import RecordLink from '../common/RecordLink'
import TypeList from '../common/TypeList'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'

import ProductionSnippet from './ProductionSnippet'

interface ISearchData {
  uri: string
  view: string
}

const WorksSnippet: React.FC<ISearchData> = ({ uri, view }) => {
  const { data, isSuccess, isLoading } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isSuccess && data) {
    const work = new WorkParser(data)
    const types = work.getTypes()
    const imprint = work.getImprint()
    const agent = work.getProductionAgent() || null
    const date = work.getProductionDate() || null
    const languages = work.getLanguages()
    const languageNotes = work.getLanguageNotes()
    const images = work.getImages()
    const identifiers = work.getIdentifiers()

    if (view === 'list') {
      return (
        <React.Fragment>
          <div className="m-2 d-flex" data-testid="work-snippet-list-view">
            <div className="flex-shrink-0">
              <PreviewImageOrIcon images={images} entity={data} />
            </div>
            <div className="flex-grow-1 ms-3">
              <StyledSnippetTitle
                className="d-flex"
                data-testid="work-results-snippet-title"
              >
                <RecordLink url={data.id} linkCategory="Results Snippet" />
              </StyledSnippetTitle>
              <ProductionSnippet agent={agent} date={date} label="Creator" />
              {types.length > 0 && <TypeList types={types} />}
              {imprint.length > 0 && (
                <Row>
                  <Col>
                    <StyledDt>Imprint</StyledDt>
                    <StyledDd data-testid="work-snippet-imprint-statement">
                      {imprint[0]}
                    </StyledDd>
                  </Col>
                </Row>
              )}
              {languages.length > 0 && (
                <Row>
                  <Col>
                    <StyledDt>Languages</StyledDt>
                    <StyledDd data-testid="work-snippet-language">
                      <RecordLink
                        url={languages[0]}
                        linkCategory="Results Snippet"
                      />
                    </StyledDd>
                  </Col>
                </Row>
              )}
              {languageNotes.length > 0 && (
                <Row>
                  <Col>
                    <StyledDt>Related Languages</StyledDt>
                    <StyledDd data-testid="work-snippet-language-notes">
                      {languageNotes[0]}
                    </StyledDd>
                  </Col>
                </Row>
              )}
              {identifiers.length > 0 && (
                <Row>
                  <Col>
                    <StyledDt>Identifiers</StyledDt>
                    <StyledDd data-testid="work-snippet-identifiers">
                      {identifiers[0].identifier}
                      {identifiers.length > 1 && '...'}
                    </StyledDd>
                  </Col>
                </Row>
              )}
            </div>
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
            <Card.Body data-testid="grid-view-work-results-snippet-title">
              <StyledSnippetTitle className="card-title d-flex">
                <RecordLink url={data.id} linkCategory="Results Snippet" />
              </StyledSnippetTitle>
              <Card.Text>
                <StyledDl>
                  <ProductionSnippet
                    agent={agent}
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

export default WorksSnippet
