/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
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
import { useGetItemQuery } from '../../redux/api/ml_api'
import { stripYaleIdPrefix } from '../../lib/parse/data/helper'
import EntityParser from '../../lib/parse/data/EntityParser'
import config from '../../config/config'

interface IProps {
  activeAccordion: boolean
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
  activeAccordion,
  uri,
  count,
  criteria,
  searchTerm,
  tab,
  index,
  title,
  itemSpacing = 'single',
}) => {
  const { data, isSuccess } = useGetItemQuery(
    {
      uri: stripYaleIdPrefix(uri),
      profile: 'results',
    },
    {
      skip: !activeAccordion,
    },
  )

  let entity = null
  let primaryName = null
  let equivalent = null

  if (isSuccess && data) {
    entity = new EntityParser(data)
    primaryName = entity.getPrimaryName(config.aat.langen)
    equivalent = entity.getEquivalent()

    // filter out entities that are collection items
    if (equivalent.includes(config.aat.collectionItem)) {
      return null
    }
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
            name={primaryName || ' '}
            linkCategory="Accordion"
          />
        </DescriptionTerm>
      </Col>
      <Col md={3} lg={4} xl={3}>
        <DescriptionDetail>
          <Link
            to={{
              pathname: `/view/results/${tab}`,
              search: `q=${searchQ}&searchLink=true`,
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
