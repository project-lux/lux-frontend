/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Link } from 'react-router-dom'

import EntityParser from '../../lib/parse/data/EntityParser'
import Map from '../common/Map'
import PlaceHierarchy from '../place/PlaceHierarchy'
import RecordLink from '../common/RecordLink'
import StyledHr from '../../styles/shared/Hr'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledImageContainer from '../../styles/shared/ImageDiv'
import TypeList from '../common/TypeList'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'

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
                <Link to={`/view/${stripYaleIdPrefix(place.json.id!)}`}>
                  <Map config={mapConfig} className="sm" />
                </Link>
              </StyledImageContainer>
            ) : (
              <PreviewImageOrIcon images={[]} entity={data} types={types} />
            )}
          </div>
          <div className="flex-grow-1 ms-3">
            <StyledSnippetTitle
              className="d-flex"
              data-testid="place-results-snippet-title"
            >
              <RecordLink url={data.id} />
            </StyledSnippetTitle>
            <StyledDl>
              {types.length > 0 && <TypeList types={types} />}
            </StyledDl>
            <PlaceHierarchy entity={data} />
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
