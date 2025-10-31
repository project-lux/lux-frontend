/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'

import StyledSearchLink from '../../styles/features/common/ObjectsContainerLinkRow'
import StyledHr from '../../styles/shared/Hr'
import { IOrderedItems, ISearchResults } from '../../types/ISearchResults'
import RecordLink from '../common/RecordLink'

import SearchResultsLink from './SearchResultsLink'

interface IProps {
  activeAccordion: boolean
  url: string
  data: ISearchResults
  title: string
  scope?: string
}

const QueryRelationsListRow: React.FC<{
  activeAccordion: boolean
  uri: string
  index: number
}> = ({ activeAccordion, uri, index }) => {
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
          name={!activeAccordion ? ' ' : undefined}
          returns404={setRecordLinkHas404}
          linkCategory="Accordion"
        />
      </Col>
    </Row>
  )
}

const SearchResultRelatedList: React.FC<IProps> = ({
  activeAccordion,
  url,
  scope,
  data,
  title,
}) => {
  const recordLinks = (orderedItems: Array<IOrderedItems>): any =>
    orderedItems.map((item, ind: number) => {
      const { id } = item
      return (
        <QueryRelationsListRow
          key={id}
          activeAccordion={activeAccordion}
          uri={id}
          index={ind}
        />
      )
    })

  const { orderedItems } = data

  return (
    <React.Fragment>
      {recordLinks(orderedItems)}
      <StyledHr
        width="100%"
        className="mt-3 searchResultRelatedListHr"
        $hiddenOnDesktop
      />
      <StyledSearchLink className="row py-2 text-start">
        <Col xs={12} className="mt-1">
          <SearchResultsLink
            data={data}
            eventTitle={`Accordion ${title}`}
            url={url}
            scope={scope}
          />
        </Col>
      </StyledSearchLink>
    </React.Fragment>
  )
}

export default SearchResultRelatedList
