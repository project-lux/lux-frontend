/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

// import { formatDateJsonSearch } from '../../lib/facets/dateParser'
import { ITimelineCriteria } from '../../types/ITimelines'
import { pushSiteImproveEvent } from '../../lib/siteImprove'
import { IHalLinks } from '../../types/IHalLinks'
import theme from '../../styles/theme'
import { formatDateJsonSearch } from '../../lib/facets/dateParser'

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
        pushSiteImproveEvent('Search Link', 'Selected', 'Timeline Search Link')
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
      {obj.name}: {obj.value}
    </Link>
  )
}

const CustomTooltip: React.FC<IProps> = ({ active, payload, searchTags }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div
        style={{ backgroundColor: theme.color.white, pointerEvents: 'auto' }}
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
            // eslint-disable-next-line react/no-array-index-key
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
