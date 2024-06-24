/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

import DescriptionTerm from '../../styles/shared/DescriptionTerm'
import DescriptionDetail from '../../styles/shared/DescriptionDetail'
import theme from '../../styles/theme'
import RecordLink from '../common/RecordLink'
import { formatFacetedSearchJson } from '../../lib/parse/search/halLinkHelper'
import { pushClientEvent } from '../../lib/pushClientEvent'

interface IProps {
  uri: string
  count: number
  criteria: any
  searchTerm: string
  tab: string
  index: number
  title: string
  itemSpacing?: string
}

const StyledRow = styled(Row)`
  &:hover {
    background-color: ${theme.color.lightGray};
  }

  &:focus-within {
    background-color: ${theme.color.lightGray};
  }
`

const ListItem: React.FC<IProps> = ({
  uri,
  count,
  criteria,
  searchTerm,
  tab,
  index,
  title,
  itemSpacing = 'single',
}) => {
  const [recordLinkHas404, setRecordLinkHas404] = useState<boolean>(false)

  if (recordLinkHas404) {
    return null
  }

  const linkLabel = `Show all ${count} result${count !== 1 ? 's' : ''}`
  const searchQ = formatFacetedSearchJson(criteria, searchTerm, uri)

  return (
    <StyledRow
      key={uri}
      style={{
        marginBottom:
          itemSpacing === 'double'
            ? theme.spacing.verticalItemDoubleSpacing
            : theme.spacing.verticalItemSingleSpacing,
      }}
    >
      <Col md={9} lg={8} xl={9}>
        <DescriptionTerm>
          <RecordLink
            url={uri}
            returns404={setRecordLinkHas404}
            linkCategory="Accordion"
          />
        </DescriptionTerm>
      </Col>
      <Col md={3} lg={4} xl={3}>
        <DescriptionDetail>
          <Link
            to={{
              pathname: `/view/results/${tab}`,
              search: `q=${searchQ}&openSearch=false`,
            }}
            state={{
              targetName: linkLabel,
            }}
            onClick={() =>
              pushClientEvent('Search Link', 'Selected', `Accordion ${title}`)
            }
            data-testid={`list-item-link-${index}`}
          >
            {linkLabel}
          </Link>
        </DescriptionDetail>
      </Col>
    </StyledRow>
  )
}

export default ListItem
