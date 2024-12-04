/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

import { ITimelineCriteria } from '../../types/ITimelines'
import { pushClientEvent } from '../../lib/pushClientEvent'
import { IHalLinks } from '../../types/IHalLinks'
import theme from '../../styles/theme'
import { formatDateJsonSearch } from '../../lib/parse/timeline/timelineHelper'

interface IProps {
  active: boolean
  payload: any
  searchTags: IHalLinks
}

interface ILinkProps {
  obj: Record<string, any>
  tab: string
  searchQ: string
}

const TooltipLink: React.FC<ILinkProps> = ({ obj, tab, searchQ }) => {
  const [underline, setUnderline] = useState<boolean>(false)

  return (
    <Link
      to={{
        pathname: `/view/results/${tab}`,
        search: `q=${searchQ}&collapseSearch=true`,
      }}
      onClick={() =>
        pushClientEvent('Search Link', 'Selected', 'Timeline Search Link')
      }
      onMouseLeave={() => setUnderline(false)}
      onMouseEnter={() => setUnderline(true)}
      state={{
        targetName: 'Timeline Search Results',
      }}
      style={{
        color: obj.fill,
        textDecoration: underline ? 'underline' : 'none',
      }}
      data-testid="graph-tooltip-search-link"
    >
      Show all {obj.value} {obj.name}
    </Link>
  )
}

const CustomTooltip: React.FC<IProps> = ({ active, payload, searchTags }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div
        style={{
          backgroundColor: theme.color.white,
          pointerEvents: 'auto',
          border: `solid 1px ${theme.color.black}`,
          borderRadius: theme.border.radius,
        }}
        className="p-2"
      >
        {payload.length > 0 ? payload[0].payload.year : 'unknown year'}
        {payload.map((obj: Record<string, any>, ind: number) => {
          const searchTag = obj.dataKey.replace('.totalItems', '')
          const { tab, jsonSearchTerm } = searchTags[searchTag]
          const { criteria } = obj.payload[searchTag] as ITimelineCriteria
          const searchQ = formatDateJsonSearch(
            obj.payload.yearKey,
            jsonSearchTerm as string,
            criteria,
          )
          return (
            <Row key={ind}>
              <Col>
                <TooltipLink obj={obj} tab={tab as string} searchQ={searchQ} />
              </Col>
            </Row>
          )
        })}
      </div>
    )
  }

  return null
}

export default CustomTooltip
