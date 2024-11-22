import React from 'react'
import { Link } from 'react-router-dom'

import EntityParser from '../../lib/parse/data/EntityParser'
import Map from '../common/Map'
import RecordLink from '../common/RecordLink'
import StyledHr from '../../styles/shared/Hr'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledImageContainer from '../../styles/shared/ImageDiv'
import TypeList from '../common/TypeList'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { getNextPlaceUris } from '../../lib/util/hierarchyHelpers'
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'

interface IProps {
  uri: string
}

const PlaceSnippet: React.FC<IProps> = ({ uri }) => {
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

    return (
      <React.Fragment>
        <div className="m-2 d-flex">
          <div className="flex-shrink-0">
            {mapConfig.wkt !== '' ? (
              <StyledImageContainer className="p-0">
                <Link
                  to={`/view/${stripYaleIdPrefix(place.json.id!)}`}
                  onClick={() =>
                    pushClientEvent(
                      'Entity Link',
                      'Selected',
                      'Results Snippet Link',
                    )
                  }
                >
                  <Map config={mapConfig} className="sm" />
                </Link>
              </StyledImageContainer>
            ) : (
              <PreviewImageOrIcon images={[]} entity={data} />
            )}
          </div>
          <div className="flex-grow-1 ms-3">
            <StyledSnippetTitle
              className="d-flex"
              data-testid="place-results-snippet-title"
            >
              <RecordLink url={data.id} linkCategory="Results Snippet" />
            </StyledSnippetTitle>
            <StyledDl>
              {types.length > 0 && <TypeList types={types} />}
            </StyledDl>
            <GenericBreadcrumbHierarchy
              key={place.json.id}
              entity={data}
              columnClassName="px-0"
              maxLength={8}
              getNextEntityUri={getNextPlaceUris}
              id="place-snippet"
            />
          </div>
        </div>
        <StyledHr />
      </React.Fragment>
    )
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
