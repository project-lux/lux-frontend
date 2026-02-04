/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ReactElement, useEffect } from 'react'
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
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'

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
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const [graphData, setGraphData] = useState<Array<IGraphTimelineData>>([])

  useEffect(() => {
    setGraphData(
      yearsArray.map((year) => {
        const barData = timelineData.hasOwnProperty(year)
          ? timelineData[year]
          : { total: 0 }
        return {
          year: TimelineParser.getYearWithLabel(year),
          yearKey: year,
          ...barData,
        }
      }),
    )
  }, [yearsArray, timelineData])

  const facetNameMap: Map<string, string> = new Map([
    ['itemProductionDate', 'Objects Produced'],
    ['itemEncounteredDate', 'Objects Encountered'],
    ['workCreationDate', 'Works Created'],
    ['workPublicationDate', 'Works Published'],
    ['workCreationOrPublicationDate', 'Works About'],
    ['setCreationOrPublicationDate', 'Collections About'],
  ])

  useResizeableWindow(setIsMobile)

  const renderLegendText = (value: string): any => (
    <span style={{ color: 'black', fontWeight: '300' }}>{value}</span>
  )

  const getShape = (props: any): ReactElement<any, any> => {
    const { fill, x, y, width, height } = props

    return (
      <rect
        fill={fill}
        x={x}
        y={y}
        width={width}
        height={height ? Math.round(height - 2) : 0}
      />
    )
  }

  return (
    <div
      className="highlight-bar-charts"
      style={{ userSelect: 'none', width: '100%' }}
      data-testid="timeline-graph-container"
    >
      <ResponsiveContainer width="100%" height={500} className="p-3">
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
          <Legend
            layout={isMobile ? 'vertical' : 'horizontal'}
            formatter={renderLegendText}
          />
          <Bar
            dataKey="itemProductionDate.totalItems"
            stackId="a"
            fill={theme.color.graphs.produced}
            name={
              facetNameMap.get('itemProductionDate') || 'itemProductionDate'
            }
            yAxisId="total"
            shape={(p: any) => getShape(p)}
          />
          <Bar
            dataKey="itemEncounteredDate.totalItems"
            stackId="a"
            fill={theme.color.graphs.encounter}
            name={
              facetNameMap.get('itemEncounteredDate') || 'itemEncounteredDate'
            }
            yAxisId="total"
            shape={(p: any) => getShape(p)}
          />
          <Bar
            dataKey="workCreationDate.totalItems"
            stackId="a"
            fill={theme.color.graphs.created}
            name={facetNameMap.get('workCreationDate') || 'workCreationDate'}
            yAxisId="total"
            shape={(p: any) => getShape(p)}
          />
          <Bar
            dataKey="workPublicationDate.totalItems"
            stackId="a"
            fill={theme.color.graphs.published}
            name={
              facetNameMap.get('workPublicationDate') || 'workPublicationDate'
            }
            yAxisId="total"
            shape={(p: any) => getShape(p)}
          />
          <Bar
            dataKey="workCreationOrPublicationDate.totalItems"
            stackId="a"
            fill={theme.color.graphs.about}
            name={
              facetNameMap.get('workCreationOrPublicationDate') ||
              'workCreationOrPublicationDate'
            }
            yAxisId="total"
            shape={(p: any) => getShape(p)}
          />
          <Bar
            dataKey="setCreationOrPublicationDate.totalItems"
            stackId="a"
            fill={theme.color.graphs.setAbout}
            name={
              facetNameMap.get('setCreationOrPublicationDate') ||
              'setCreationOrPublicationDate'
            }
            yAxisId="total"
            shape={(p: any) => getShape(p)}
          />
          <Brush
            dataKey="year"
            stroke={theme.color.primary.blue}
            startIndex={startIndex}
            endIndex={endIndex}
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
