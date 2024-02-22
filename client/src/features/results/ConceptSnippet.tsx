/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import config from '../../config/config'
import ConceptParser from '../../lib/parse/data/ConceptParser'
import StyledHr from '../../styles/shared/Hr'
import StyledSnippetTitle from '../../styles/features/results/SnippetTitle'
import StyledDl from '../../styles/shared/DescriptionList'
import StyledDt from '../../styles/shared/DescriptionTerm'
import StyledDd from '../../styles/shared/DescriptionDetail'
import RecordLink from '../common/RecordLink'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import { useGetItemQuery } from '../../redux/api/ml_api'
import PreviewImageOrIcon from '../common/PreviewImageOrIcon'
import ConceptHierarchy from '../concept/ConceptHierarchy'

interface IProps {
  uri: string
}

const ConceptSnippet: React.FC<IProps> = ({ uri }) => {
  const { data, isSuccess, isLoading } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isSuccess && data) {
    const concept = new ConceptParser(data)
    const descriptions = concept.getDescriptions(config.dc.langen)
    const types = concept.getTypes()

    return (
      <React.Fragment>
        <div className="m-2 d-flex">
          <div className="flex-shrink-0">
            <PreviewImageOrIcon images={[]} entity={data} types={types} />
          </div>
          <div className="flex-grow-1 ms-3">
            <StyledSnippetTitle
              className="d-flex"
              data-testid="concept-results-snippet-title"
            >
              <RecordLink url={data.id} />
            </StyledSnippetTitle>
            <StyledDl>
              {descriptions.length > 0 && (
                <React.Fragment>
                  <StyledDt>Descriptions</StyledDt>
                  <StyledDd data-testid="concept-snippet-description">{`${descriptions[0].slice(
                    0,
                    200,
                  )}...`}</StyledDd>
                </React.Fragment>
              )}
            </StyledDl>
            <ConceptHierarchy entity={data} />
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

export default ConceptSnippet
