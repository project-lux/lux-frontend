/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts'

import theme from '../../styles/theme'
import {
  IGraphTimelineData,
  ITimelinesTransformed,
} from '../../types/ITimelines'
import { IHalLinks } from '../../types/IHalLinks'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'

import CustomTooltip from './CustomTooltip'

interface IProps {
  timelineData: ITimelinesTransformed
  searchTags: IHalLinks
  yearsArray: Array<string>
  handleRangeChange: (start: number, end: number) => void
  startIndex: number
  endIndex: number
}

export interface IZoomState {
  data: Array<IGraphTimelineData>
  left: string
  right: string
  refAreaLeft: string
  refAreaRight: string
  top: number
  bottom: number
  animation: boolean
}

export const getInitialState = (
  initialData: Array<IGraphTimelineData>,
): IZoomState => ({
  data: initialData,
  left: initialData[0].yearKey,
  right: initialData[initialData.length - 1].yearKey,
  refAreaLeft: '',
  refAreaRight: '',
  top: parseInt(initialData[initialData.length - 1].yearKey, 10),
  bottom: parseInt(initialData[0].yearKey, 10),
  animation: true,
})

const Graph: React.FC<IProps> = ({
  timelineData,
  searchTags,
  yearsArray,
  handleRangeChange,
  startIndex,
  endIndex,
}) => {
  const graphData: Array<IGraphTimelineData> = yearsArray.map((year) => {
    const barData = timelineData.hasOwnProperty(year)
      ? timelineData[year]
      : { total: 0 }
    return {
      year: TimelineParser.getYearWithLabel(year),
      yearKey: year,
      ...barData,
    }
  })

  const facetNameMap: Map<string, string> = new Map([
    ['itemProductionDate', 'Objects Produced'],
    ['itemEncounteredDate', 'Objects Encountered'],
    ['workCreationDate', 'Works Created'],
    ['workPublicationDate', 'Works Published'],
  ])

  return (
    <div
      className="highlight-bar-charts"
      style={{ userSelect: 'none', width: '100%' }}
    >
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={graphData}
          margin={{
            top: 20,
            right: 75,
            left: 15,
            bottom: 5,
          }}
          accessibilityLayer
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" allowDataOverflow />
          <YAxis dataKey="total" yAxisId="total" allowDataOverflow />
          <Tooltip
            trigger="click"
            content={
              <CustomTooltip
                searchTags={searchTags}
                active={false}
                payload={undefined}
              />
            }
          />
          <Legend />
          <Bar
            dataKey="itemProductionDate.totalItems"
            stackId="a"
            fill={theme.color.trueBlack}
            name={
              facetNameMap.get('itemProductionDate') || 'itemProductionDate'
            }
            yAxisId="total"
          />
          <Bar
            dataKey="itemEncounteredDate.totalItems"
            stackId="a"
            fill={theme.color.barChartPurple}
            name={
              facetNameMap.get('itemEncounteredDate') || 'itemEncounteredDate'
            }
            yAxisId="total"
          />
          <Bar
            dataKey="workCreationDate.totalItems"
            stackId="a"
            fill={theme.color.barChartGreen}
            name={facetNameMap.get('workCreationDate') || 'workCreationDate'}
            yAxisId="total"
          />
          <Bar
            dataKey="workPublicationDate.totalItems"
            stackId="a"
            fill={theme.color.primary.teal}
            name={
              facetNameMap.get('workPublicationDate') || 'workPublicationDate'
            }
            yAxisId="total"
          />
          <Brush
            dataKey="year"
            stroke={theme.color.primary.blue}
            startIndex={startIndex}
            endIndex={endIndex}
            data={graphData}
            onDragEnd={(e: any) => {
              const start = e.startIndex
              const end = e.endIndex
              handleRangeChange(start, end)
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph
