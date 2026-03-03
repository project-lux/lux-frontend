import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Col } from 'react-bootstrap'

import EntityParser from '../../lib/parse/data/EntityParser'
import Map from '../common/Map'
import StyledHr from '../../styles/shared/Hr'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledImageContainer from '../../styles/shared/ImageDiv'
import TypeList from '../common/TypeList'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { getNextPlaceUris } from '../../lib/util/hierarchyHelpers'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import RecordLink from '../common/RecordLink'

import SnippetHeader from './SnippetHeader'

interface IProps {
  uri: string
  view: string
  titleOfTabbedContent?: string
}

const PlaceSnippet: React.FC<IProps> = ({
  uri,
  view,
  titleOfTabbedContent,
}) => {
  const { data, isSuccess, isLoading } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isSuccess && data) {
    const place = new EntityParser(data)
    const types = place.getTypes()

    const mapConfig = {
      wkt: data.defined_by || '',
      thumbnailMode: true,
    }

    const mapComponent =
      mapConfig.wkt !== '' ? (
        <StyledImageContainer
          className="p-0"
          width={view === 'grid' ? '100%' : undefined}
        >
          <Link
            to={`/view/${stripYaleIdPrefix(place.json.id!)}`}
            onClick={() =>
              pushClientEvent('Entity Link', 'Selected', 'Results Snippet Link')
            }
          >
            <Map
              config={mapConfig}
              className={`sm ${view === 'grid' ? 'w-auto' : ''}`}
              mapContainerClassName={view === 'grid' ? 'w-auto' : undefined}
            />
          </Link>
        </StyledImageContainer>
      ) : undefined

    const snippetDataComponent = (
      <React.Fragment>
        <StyledDl>{types.length > 0 && <TypeList types={types} />}</StyledDl>
        <GenericBreadcrumbHierarchy
          key={place.json.id}
          entity={data}
          maxLength={8}
          getNextEntityUri={getNextPlaceUris}
          id="place-snippet"
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
              mapComponent={mapComponent}
              titleOfTabbedContent={titleOfTabbedContent}
            />
          </div>
          <StyledHr width="100%" className="placeSnippetHr" />
        </React.Fragment>
      )
    }

    if (view === 'grid') {
      return (
        <Col className="h-auto">
          <Card className="h-100" data-testid="grid-view">
            {mapComponent}
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

export default PlaceSnippet
