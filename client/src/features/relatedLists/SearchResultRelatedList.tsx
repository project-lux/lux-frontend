/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import StyledSearchLink from '../../styles/shared/SearchLink'
import StyledHr from '../../styles/shared/Hr'
import { formatHalLink } from '../../lib/parse/search/queryParser'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import { getEstimates } from '../../lib/parse/search/searchResultParser'
import RecordLink from '../common/RecordLink'
import { searchScope } from '../../config/searchTypes'
import { getAllParamsFromHalLink } from '../../lib/parse/search/halLinkHelper'
import { pushClientEvent } from '../../lib/pushClientEvent'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import theme from '../../styles/theme'

interface IProps {
  url: string
  data: ISearchResults
  title: string
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
      <Col
        xs={12}
        className={`justify-content-start lh-sm ${index === 0 ? '' : 'mt-3'}`}
      >
        <RecordLink
          url={uri}
          returns404={setRecordLinkHas404}
          linkCategory="Accordion"
        />
      </Col>
    </Row>
  )
}

const SearchResultRelatedList: React.FC<IProps> = ({
  url,
  scope,
  data,
  title,
}) => {
  const [showHr, setShowHr] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )

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

  const linkLabel = `Show all ${estimate} result${estimate !== 1 ? 's' : ''}`
  const searchQ = formatHalLink(url, searchScope[newScope])
  const searchString = `${searchQ}&searchLink=true${
    sort !== null ? `&${resultsEndpoint[0]}s=${sort}` : ''
  }`

  useResizeableWindow(setShowHr)

  return (
    <React.Fragment>
      {recordLinks(orderedItems)}
      {showHr && <StyledHr width="100%" className="mt-3" />}
      <StyledSearchLink className="row py-2 text-start">
        <Col xs={12} className="mt-1">
          <Link
            to={{
              pathname: `/view/results/${newScope}`,
              search: searchString,
            }}
            onClick={() =>
              pushClientEvent('Search Link', 'Selected', `Accordion ${title}`)
            }
            data-testid="search-related-list-link"
          >
            {linkLabel}
          </Link>
        </Col>
      </StyledSearchLink>
    </React.Fragment>
  )
}

export default SearchResultRelatedList
