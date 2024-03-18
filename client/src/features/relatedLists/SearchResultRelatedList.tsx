/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import StyledSearchLink from '../../styles/shared/SearchLink'
import { formatHalLink } from '../../lib/parse/search/queryParser'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import RecordLink from '../common/RecordLink'
import { searchScope } from '../../config/searchTypes'
import { getAllParamsFromHalLink } from '../../lib/parse/search/halLinkHelper'

interface IProps {
  url: string
  data: ISearchResults
  scope?: string
}

const QueryRelationsListRow: React.FC<{ uri: string; index: number }> = ({
  uri,
  index,
}) => {
  const [recordLinkHas404, setRecordLinkHas404] = useState<boolean>(false)

  if (recordLinkHas404) {
    return null
  }

  return (
    <Row
      className="row d-flex w-100"
      data-testid={`query-relations-list-row-${index}`}
    >
      <Col xs={12} className="justify-content-start">
        <RecordLink url={uri} returns404={setRecordLinkHas404} />
      </Col>
    </Row>
  )
}

const SearchResultRelatedList: React.FC<IProps> = ({ url, scope, data }) => {
  const recordLinks = (orderedItems: Array<IOrderedItems>): any =>
    orderedItems.map((item, ind: number) => {
      const { id } = item
      return <QueryRelationsListRow key={id} uri={id} index={ind} />
    })

  const { orderedItems } = data
  const estimate = getEstimates(data)
  const newScope = scope !== undefined ? scope : 'objects'
  const resultsEndpoint = searchScope[newScope]

  const params = getAllParamsFromHalLink(url, 'search')
  const sort = new URLSearchParams(params).get('sort')

  return (
    <React.Fragment>
      {recordLinks(orderedItems)}
      <StyledSearchLink className="row py-2 text-start">
        <div className="col-12">
          <Link
            to={{
              pathname: `/view/results/${newScope}`,
              search: `${formatHalLink(url, resultsEndpoint)}&openSearch=false${
                sort !== null ? `&${resultsEndpoint[0]}s=${sort}` : ''
              }`,
            }}
            data-testid="search-related-list-link"
          >
            Show all {estimate} result
            {estimate !== 1 && `s`}
          </Link>
        </div>
      </StyledSearchLink>
    </React.Fragment>
  )
}

export default SearchResultRelatedList
