import React, { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

import theme from '../../styles/theme'
import PrimaryButton from '../../styles/shared/PrimaryButton'
import { fetchRelatedLists } from '../../lib/util/fetchRelatedLists'
import { IRelatedListResults } from '../../types/IRelatedLists'
import { capitalizeLabels } from '../../lib/parse/data/helper'
import { transformRelatedListResults } from '../../lib/parse/search/relatedListsParser'
import StyledResponsiveCol from '../../styles/shared/ResponsiveCol'
import RecordLink from '../common/RecordLink'
import SemanticSearchLink from '../common/SemanticSearchLink'
import PageLoading from '../common/PageLoading'

interface IProps {
  results: IRelatedListResults
  halLink: string
  title: string
  next?: {
    id: string
    type: string
  }
}

const StyledRow = styled(Row)`
  line-height: 20px;
  align-items: center;
  margin-bottom: 0.5em;

  &:hover {
    background-color: ${theme.color.lightGray};
  }

  &:focus-within {
    background-color: ${theme.color.lightGray};
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SemanticRelatedListRow: React.FC<{
  uri: string
  results: IRelatedListResults
  index: number
  title: string
}> = ({ uri, results, index, title }) => {
  const { pathname } = useLocation()
  const pageScope = pathname.replace('/view/', '').split('/')
  const isDevEnvironment = pathname.includes('lux-front-dev')
  const [recordLinkHas404, setRecordLinkHas404] = useState<boolean>(false)

  if (recordLinkHas404) {
    return null
  }

  return (
    <Row data-testid="testing">
      <Col xs={12}>
        <StyledRow>
          <Col xs={12} sm={12} md={6} lg={12} xl={6}>
            <dt data-testid={`semantic-related-list-entity-${index}`}>
              <RecordLink url={uri} returns404={setRecordLinkHas404} />
            </dt>
          </Col>
          <StyledResponsiveCol xs={12} sm={12} md={6} lg={12} xl={6}>
            {Object.keys(results[uri]).map((scope, ind) => (
              <React.Fragment key={`${uri}-${scope}-link`}>
                <dd className="mb-0">
                  <SemanticSearchLink
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
                      <dt
                        data-testid={`${scope}-semantic-related-list-label-${ind}`}
                      >
                        {label}
                      </dt>
                    </Col>
                    <StyledResponsiveCol xs={12} sm={12} md={3} lg={12} xl={3}>
                      <dd className="mb-0">
                        <SemanticSearchLink
                          scope={scope}
                          id={`show-all-${ind}`}
                          total={results[uri][scope].relations[name].totalItems}
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
    </Row>
  )
}

const SemanticRelatedList: React.FC<IProps> = ({
  results,
  halLink,
  title,
  next,
}) => {
  const [currentResults, setCurrentResults] =
    useState<IRelatedListResults>(results)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(next !== undefined)
  const [isError, setIsError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleClick = (page: number): void => {
    fetchRelatedLists({
      halLink,
      page,
      onSuccess: (data) => {
        const parsedData = JSON.parse(data)
        const transformedData = transformRelatedListResults(
          parsedData.orderedItems,
        )
        if (transformedData !== null) {
          setCurrentPage(page)
          setCurrentResults(transformedData)
          setHasMore(parsedData.next !== undefined)
        } else {
          setIsError(true)
        }
        setIsLoading(false)
      },
      onError: () => setIsError(true),
      onLoading: () => setIsLoading(true),
    })
  }

  if (isLoading) {
    return <PageLoading />
  }

  if (isError) {
    return <p>An error occurred fetching the data.</p>
  }

  return (
    <Row>
      <Col xs={12}>
        <dl>
          {Object.keys(currentResults).map((uri, ind: number) => (
            <SemanticRelatedListRow
              key={uri}
              uri={uri}
              results={currentResults}
              index={ind}
              title={title}
            />
          ))}
        </dl>
      </Col>
      {(hasMore || currentPage !== 1) && (
        <Col
          xs={12}
          className="d-flex justify-content-center"
          data-testid="semantic-related-list-pagination"
        >
          <PrimaryButton
            className="m-1"
            disabled={currentPage === 1}
            onClick={() => handleClick(currentPage - 1)}
          >
            Previous
          </PrimaryButton>
          <PrimaryButton
            className="m-1"
            disabled={!hasMore}
            onClick={() => handleClick(currentPage + 1)}
          >
            Next
          </PrimaryButton>
        </Col>
      )}
    </Row>
  )
}

export default SemanticRelatedList
