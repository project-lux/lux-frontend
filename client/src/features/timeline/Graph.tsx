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
import { isNull } from 'lodash'

import theme from '../../styles/theme'
import {
  IGraphTimelineData,
  ITimelinesTransformed,
} from '../../types/ITimelines'
import { IHalLinks } from '../../types/IHalLinks'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { facetNameMap } from '../../config/timeline'

import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

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
  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null)
  const [selectedLegend, setSelectedLegend] = useState<string | null>(null)
  // Get the relationships that are used in the timeline data to determine which relationships to show in the legend
  const relationshipsToShowInLegend =
    TimelineParser.getFacetsUsedForLegend(timelineData)
  const activeLegend = hoveredLegend || selectedLegend

  const handleOnHover = (value: string | null): void => {
    setHoveredLegend(value)
  }

  const handleOnClick = (value: string | null): void => {
    setSelectedLegend((currentValue) => (currentValue === value ? null : value))
  }

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

  useResizeableWindow(setIsMobile)

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
            content={
              <CustomLegend
                payload={undefined}
                activeLegend={activeLegend}
                selectedLegend={selectedLegend}
                handleOnHover={handleOnHover}
                handleOnClick={handleOnClick}
              />
            }
          />
          {Array.from(facetNameMap.entries()).map(([facetKey, facetLabel]) => {
            if (!relationshipsToShowInLegend.includes(facetKey)) {
              return null
            }

            let defaultLegend = 'focused'
            if (isNull(activeLegend)) {
              defaultLegend = 'focused'
            } else if (activeLegend === facetKey) {
              defaultLegend = 'focused'
            } else {
              defaultLegend = 'unFocused'
            }
            return (
              <Bar
                key={facetKey}
                dataKey={`${facetKey}.totalItems`}
                stackId="a"
                fill={
                  theme.color.graphs[
                    facetKey as keyof typeof theme.color.graphs
                  ][defaultLegend as 'focused' | 'unFocused']
                }
                name={facetLabel || facetKey}
                yAxisId="total"
                shape={(p: any) => getShape(p)}
              />
            )
          })}
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
