import React from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import theme from '../../styles/theme'
import { IRelatedListResults } from '../../types/IRelatedLists'
import {
  capitalizeLabels,
  stripYaleIdPrefix,
} from '../../lib/parse/data/helper'
import StyledResponsiveCol from '../../styles/shared/ResponsiveCol'
import RecordLink from '../common/RecordLink'
import { useGetItemQuery } from '../../redux/api/ml_api'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'
import StyledHr from '../../styles/shared/Hr'

import RelatedListSearchLink from './RelatedListSearchLink'

const StyledRow = styled(Row)`
  line-height: 20px;
  align-items: center;
  margin-bottom: 1em;

  &:hover {
    background-color: ${theme.color.lightGray};
  }

  &:focus-within {
    background-color: ${theme.color.lightGray};
  }

  @media (min-width: ${theme.breakpoints.md}px) {
    margin-bottom: 0.5em;
  }
`

const StyledDiv = styled.div`
  @media (min-width: 992px) and (max-width: 1199px) {
    display: none;
  }

  @media (max-width: 767px) {
    display: none;
  }
`

const RelatedListRow: React.FC<{
  uri: string
  results: IRelatedListResults
  index: number
  title: string
}> = ({ uri, results, index, title }) => {
  const { pathname } = useLocation()
  const pageScope = pathname.replace('/view/', '').split('/')
  const isDevEnvironment = pathname.includes('lux-front-dev')

  const { data, isSuccess, isLoading } = useGetItemQuery({
    uri: stripYaleIdPrefix(uri),
    profile: 'results',
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isSuccess && data) {
    const entity = new EntityParser(data)
    const primaryName = entity.getPrimaryName(config.aat.langen)
    const equivalent = entity.getEquivalent()

    // filter out entities that are collection items
    if (equivalent.includes(config.aat.collectionItem)) {
      return null
    }

    return (
      <Row>
        <Col xs={12}>
          <StyledRow>
            <Col xs={12} sm={12} md={6} lg={12} xl={6}>
              <dt data-testid={`related-list-entity-${index}`}>
                <RecordLink
                  url={uri}
                  name={primaryName}
                  linkCategory="Accordion"
                  className="relatedListEntityTitle"
                />
              </dt>
            </Col>
            <StyledResponsiveCol xs={12} sm={12} md={6} lg={12} xl={6}>
              {Object.keys(results[uri]).map((scope, ind) => (
                <React.Fragment key={`${uri}-${scope}-link`}>
                  <dd className="mb-0">
                    <RelatedListSearchLink
                      scope={scope}
                      criteria={results[uri][scope].criteria}
                      label={scope === 'item' ? 'object' : scope}
                      id={`${scope}-${ind}`}
                      title={title}
                    />
                  </dd>
                  {Object.keys(results[uri]).length - 1 !== ind && (
                    <StyledDiv>
                      &nbsp;
                      <span>|</span>
                      &nbsp;
                    </StyledDiv>
                  )}
                </React.Fragment>
              ))}
            </StyledResponsiveCol>
          </StyledRow>
        </Col>
        <Col xs={12}>
          <dl>
            {Object.keys(results[uri]).map((scope) =>
              Object.keys(results[uri][scope].relations).map(
                (name, ind: number) => {
                  let label = `${name} this ${capitalizeLabels(pageScope[0])}`
                  if (name === undefined) {
                    if (isDevEnvironment) {
                      label = 'No relation name returned'
                    } else {
                      // return nothing if there is no relationName and the environment is not DEV
                      return null
                    }
                  }
                  return (
                    <StyledRow key={`${scope}-${name}`}>
                      <Col xs={12} sm={12} md={9} lg={12} xl={9}>
                        <dt data-testid={`${scope}-related-list-label-${ind}`}>
                          {label}
                        </dt>
                      </Col>
                      <StyledResponsiveCol
                        xs={12}
                        sm={12}
                        md={3}
                        lg={12}
                        xl={3}
                      >
                        <dd className="mb-0">
                          <RelatedListSearchLink
                            scope={scope}
                            id={`show-all-${ind}`}
                            total={
                              results[uri][scope].relations[name].totalItems
                            }
                            criteria={
                              results[uri][scope].relations[name].criteria
                            }
                            title={title}
                          />
                        </dd>
                      </StyledResponsiveCol>
                    </StyledRow>
                  )
                },
              ),
            )}
          </dl>
        </Col>
        <StyledHr className="mb-3 relatedListRowHr" hiddenOnDesktop />
      </Row>
    )
  }

  return null
}

export default RelatedListRow
