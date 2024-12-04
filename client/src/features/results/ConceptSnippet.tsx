import React from 'react'
import { Col, Row } from 'react-bootstrap'

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
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import { getNextConceptUris } from '../../lib/util/hierarchyHelpers'

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
    const descriptions = concept.getDescriptions(config.aat.langen)

    return (
      <React.Fragment>
        <div className="m-2 d-flex">
          <div className="flex-shrink-0">
            <PreviewImageOrIcon images={[]} entity={data} />
          </div>
          <div className="flex-grow-1 ms-3">
            <StyledSnippetTitle
              className="d-flex"
              data-testid="concept-results-snippet-title"
            >
              <RecordLink url={data.id} linkCategory="Results Snippet" />
            </StyledSnippetTitle>
            <StyledDl>
              {descriptions.length > 0 && (
                <Row>
                  <Col>
                    <StyledDt>Descriptions</StyledDt>
                    <StyledDd data-testid="concept-snippet-description">{`${descriptions[0].slice(
                      0,
                      200,
                    )}...`}</StyledDd>
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
          </div>
        </div>
        <StyledHr width="100%" />
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
