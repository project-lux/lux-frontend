import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'

import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetCollectionQuery, useGetItemQuery } from '../../redux/api/ml_api'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import EventParser from '../../lib/parse/data/EventParser'
import StyledHr from '../../styles/shared/Hr'
import RecordLink from '../common/RecordLink'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'
import TypeList from '../common/TypeList'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import { IEventAgent } from '../../types/derived-data/events'
import {
  getNextSetUris,
  isEntityAnArchive,
} from '../../lib/util/hierarchyHelpers'

import ProductionSnippet from './ProductionSnippet'
import SnippetHeader from './SnippetHeader'

interface ISearchData {
  uri: string
  view: string
}

const ObjectSnippet: React.FC<ISearchData> = ({ uri, view }) => {
  const { data, isSuccess, isLoading, isError } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  const {
    data: collections,
    isSuccess: collectionIsSuccess,
    isLoading: collectionIsLoading,
  } = useGetCollectionQuery(data, {
    skip: isError || data === undefined || data.member_of === undefined,
  })

  if (isSuccess && data) {
    const object = new ObjectParser(data)
    const types = object.getTypes()
    const images = object.getImages()
    const identifiers = object.getIdentifiers()
    const callNumber = object.getCallNumber()
    const eventAgents = object.getAgentsFromProductionEvent()
    const eventDate = object.getDateFromProductionEvent()
    let label = 'Produced By'
    let locationLabel
    let location

    const { produced_by, created_by, encountered_by } = data

    const producedBy = object.getProductionEvent()
    const hasProducedByData =
      produced_by !== undefined &&
      producedBy !== null &&
      (Object.keys(producedBy.agents).length > 0 ||
        producedBy.timePeriods.length > 0 ||
        producedBy.locations.length > 0)

    const hasCreatedBy =
      created_by !== undefined && created_by.part !== undefined

    const hasEncounteredBy =
      !hasProducedByData && !hasCreatedBy && encountered_by !== undefined

    if (hasProducedByData) {
      label = 'Produced By'
    } else if (hasCreatedBy) {
      label = 'Created By'
    } else if (hasEncounteredBy) {
      label = 'Encountered By'
      locationLabel = 'Encountered At'
      location = object.getLocationFromProductionEvent()
    }

    let collectionData: Array<string> = []
    if (collectionIsSuccess && collections) {
      collectionData = collections
        ? collections.filter((collection: string) => collection !== null)
        : []
    }

    const snippetDataComponent = (
      <React.Fragment>
        <StyledDl>
          <ProductionSnippet
            agents={eventAgents}
            date={eventDate}
            label={label}
            location={location}
            locationLabel={locationLabel}
          />
          {types.length > 0 && <TypeList types={types} />}
          {collectionIsLoading && <p>Loading...</p>}
          {collectionIsSuccess && collectionData.length > 0 && (
            <Row>
              <Col>
                <StyledDt>Collection</StyledDt>
                <StyledDd data-testid="object-snippet-collections">
                  <RecordLink
                    url={collectionData[0]}
                    linkCategory="Results Snippet"
                  />
                  {collectionData.length > 1 && '...'}
                </StyledDd>
              </Col>
            </Row>
          )}
          {callNumber !== null && (
            <Row>
              <Col>
                <StyledDt>Identifiers</StyledDt>
                <StyledDd data-testid="object-snippet-identifiers">
                  {callNumber.identifier}
                  {identifiers.length > 1 && '...'}
                </StyledDd>
              </Col>
            </Row>
          )}
        </StyledDl>
        {object.json.member_of && (
          <GenericBreadcrumbHierarchy
            key={object.json.id}
            entity={data}
            id="object-snippet"
            getNextEntityUri={getNextSetUris}
            linkFilter={isEntityAnArchive}
            maxLength={8}
          />
        )}
      </React.Fragment>
    )

    if (view === 'list') {
      return (
        <React.Fragment>
          <div className="m-2 d-flex">
            <SnippetHeader data={data} snippetData={snippetDataComponent} />
          </div>
          <StyledHr width="100%" className="my-3 objectSnippetHr" />
        </React.Fragment>
      )
    }

    if (view === 'grid') {
      let events
      let agents: Array<IEventAgent> = []
      let dates: Array<string> = []
      if (hasProducedByData) {
        events = produced_by
      } else if (hasCreatedBy) {
        events = created_by
      } else if (hasEncounteredBy) {
        events = encountered_by[0]
      }

      if (events !== undefined) {
        const event = new EventParser(events)
        agents = event.getCarriedOutBy()
        dates = event.getDates()
      }

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
              <Card.Text>
                <StyledDl>
                  {agents.length > 0 && (
                    <React.Fragment>
                      <StyledDt hidden>People and Groups</StyledDt>
                      <StyledDd data-testid="grid-view-object-event-agent">
                        <RecordLink
                          url={agents[0].id}
                          linkCategory="Results Snippet"
                        />
                      </StyledDd>
                    </React.Fragment>
                  )}
                  {dates.length > 0 && (
                    <React.Fragment>
                      <StyledDt hidden>Date</StyledDt>
                      <StyledDd data-testid="grid-view-event-date">
                        {dates}
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

export default ObjectSnippet
