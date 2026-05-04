import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { isNull } from 'lodash'

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
import GenericBreadcrumbHierarchy from '../common/GenericBreadcrumbHierarchy'
import { getNextSetUris } from '../../lib/util/hierarchyHelpers'
import config from '../../config/config'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'

import ProductionSnippet from './ProductionSnippet'
import SnippetHeader from './SnippetHeader'
import MyCollectionSnippet from './MyCollectionSnippet'

interface ISearchData {
  uri: string
  view: string
  totalResults?: number
  index?: number
  pageLength?: number
  titleOfTabbedContent?: string
}

const SetSnippet: React.FC<ISearchData> = ({
  uri,
  view,
  totalResults,
  index,
  pageLength = 20,
  titleOfTabbedContent,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const { data, isSuccess, isLoading, isError } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isSuccess && data) {
    const set = new WorkParser(data)
    const types = set.getTypes()
    if (types.includes(config.aat.personalCollection)) {
      return (
        <MyCollectionSnippet
          uri={uri}
          view={view}
          totalResults={totalResults}
          index={index}
          titleOfTabbedContent={titleOfTabbedContent}
        />
      )
    }
    const agents = set.getProductionAgents() || null
    const date = set.getProductionDate() || null
    const publicationAgent = set.getPublicationAgent() || null
    const publicationDate = set.getPublicationDate() || null
    const images = set.getImages()
    const identifiers = set.getIdentifiers()

    const snippetDataComponent = (
      <React.Fragment>
        <StyledDl>
          <ProductionSnippet agents={agents} date={date} label="Creator" />
          {!isNull(publicationAgent) && (
            <ProductionSnippet
              agents={[publicationAgent]}
              date={publicationDate}
              label="Publisher"
            />
          )}
          {types.length > 0 && <TypeList types={types} />}
          {identifiers.length > 0 && (
            <Row>
              <Col>
                <StyledDt>Identifiers</StyledDt>
                <StyledDd data-testid="set-snippet-identifiers">
                  {identifiers[0].identifier}
                  {identifiers.length > 1 && '...'}
                </StyledDd>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <StyledDt>Member Of</StyledDt>
              <StyledDd data-testid="set-snippet-member-of">
                <GenericBreadcrumbHierarchy
                  key={set.json.id}
                  entity={data}
                  id="set-snippet"
                  getNextEntityUri={getNextSetUris}
                  maxLength={10}
                  columnClassName="px-0"
                />
              </StyledDd>
            </Col>
          </Row>
        </StyledDl>
      </React.Fragment>
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
          <StyledHr
            width="100%"
            className={`setSnippetHr ${
              isMobile &&
              totalResults &&
              index &&
              totalResults <= pageLength &&
              index === totalResults
                ? 'lastResult'
                : ''
            }`}
          />
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
            <Card.Body data-testid="grid-view-set-results-snippet-title">
              <StyledSnippetTitle className="card-title d-flex">
                <RecordLink url={data.id} linkCategory="Results Snippet" />
              </StyledSnippetTitle>
              <Card.Text>
                <StyledDl>
                  <ProductionSnippet
                    agents={agents}
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

  if (isError && !config.env.luxEnv.includes('production')) {
    return (
      <div className="error">
        <h3>An error occurred fetching the data.</h3>
      </div>
    )
  }

  return null
}

export default SetSnippet
