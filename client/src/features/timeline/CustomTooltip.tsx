/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

// import { formatDateJsonSearch } from '../../lib/facets/dateParser'
import {
  // ITimelineCriteria,
  ITimelinesTransformed,
} from '../../types/ITimelines'
import { pushSiteImproveEvent } from '../../lib/siteImprove'
import { IHalLinks } from '../../types/IHalLinks'
import theme from '../../styles/theme'

interface IProps {
  active: boolean
  payload: any
  searchTags: IHalLinks
  timelineData: ITimelinesTransformed
}

const CustomTooltip: React.FC<IProps> = ({
  active,
  payload,
  searchTags,
  timelineData,
}) => {
  if (active && payload && payload.length > 0) {
    return (
      <div style={{ backgroundColor: theme.color.white }} className="p-2">
        {payload.length > 0 ? payload[0].payload.year : 'unknown year'}
        {payload.map((obj: Record<string, any>, ind: number) => (
          // eslint-disable-next-line react/no-array-index-key
          <Row key={ind}>
            <Col>
              <Link
                to={{
                  pathname: `/view/results/objects`,
                  search: `q=&collapseSearch=true`,
                }}
                onClick={() =>
                  pushSiteImproveEvent(
                    'Search Link',
                    'Selected',
                    'Timeline Search Link',
                  )
                }
                state={{
                  targetName: 'View records from this archive with images',
                }}
                data-testid="image-link"
              >
                {obj.name}: {obj.value}
              </Link>
            </Col>
          </Row>
        ))}
      </div>
    )
  }

  return null
}

export default CustomTooltip
