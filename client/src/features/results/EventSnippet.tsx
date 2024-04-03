/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import EventParser from '../../lib/parse/data/EventParser'
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

interface IProps {
  uri: string
}

const EventSnippet: React.FC<IProps> = ({ uri }) => {
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

    return (
      <React.Fragment>
        <div className="m-2 d-flex">
          <div className="flex-shrink-0">
            <PreviewImageOrIcon images={[]} entity={data} types={types} />
          </div>
          <div className="flex-grow-1 ms-3">
            <StyledSnippetTitle
              className="d-flex"
              data-testid="event-results-snippet-title"
            >
              <RecordLink url={data.id} linkCategory="Results Snippet" />
            </StyledSnippetTitle>
            <StyledDl>
              {types.length > 0 && <TypeList types={types} />}
              {agents.length > 0 && (
                <React.Fragment>
                  <StyledDt>Carried Out By</StyledDt>
                  <StyledDd data-testid="event-snippet-carried-out-by">
                    <RecordLink
                      url={agents[0].id}
                      linkCategory="Results Snippet"
                    />
                  </StyledDd>
                </React.Fragment>
              )}
              {dates.length > 0 && (
                <React.Fragment>
                  <StyledDt>Dates</StyledDt>
                  <StyledDd data-testid="event-snippet-dates">
                    {dates[0]}
                  </StyledDd>
                </React.Fragment>
              )}
              {locations.length > 0 && (
                <React.Fragment>
                  <StyledDt>Took Place At</StyledDt>
                  <StyledDd data-testid="event-snippet-took-place-at">
                    <RecordLink
                      url={locations[0]}
                      linkCategory="Results Snippet"
                    />
                  </StyledDd>
                </React.Fragment>
              )}
            </StyledDl>
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

export default EventSnippet
