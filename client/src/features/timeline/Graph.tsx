/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo, useState, ReactElement } from 'react'
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
  ITimelineHalLinks,
} from '../../types/ITimelines'
import TimelineParser from '../../lib/parse/timeline/TimelineParser'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import { halLinkMapToLegendName } from '../../config/timeline'
import { toggleRelationship } from '../../lib/parse/timeline/timelineGraphHelper'

import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'

interface IProps {
  timelineData: ITimelinesTransformed
  halLinkConfig: ITimelineHalLinks
  yearsArray: Array<string>
  handleRangeChange: (start: number, end: number) => void
  startIndex: number
  endIndex: number
  selectedRelationships: Array<string>
  handleRelationshipsChange: (relationships: Array<string>) => void
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
  halLinkConfig,
  yearsArray,
  handleRangeChange,
  startIndex,
  endIndex,
  selectedRelationships,
  handleRelationshipsChange,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  // Hovering only emphasizes a series; the selection is shared with the list view
  const [hoveredLegend, setHoveredLegend] = useState<string | null>(null)
  // Get the relationships that are used in the timeline data to determine which relationships to show in the legend
  const relationshipsToShowInLegend =
    TimelineParser.getHalLinksUsedForLegend(timelineData)
  const activeLegend =
    hoveredLegend !== null && selectedRelationships.includes(hoveredLegend)
      ? hoveredLegend
      : null

  const handleOnHover = (value: string | null): void => {
    setHoveredLegend(value)
  }

  const handleOnClick = (value: string): void => {
    handleRelationshipsChange(
      toggleRelationship(
        relationshipsToShowInLegend,
        selectedRelationships,
        value,
      ),
    )
  }

  const showEras = TimelineParser.showYearEra(yearsArray)
  const getYearLabel = (year: string | undefined): string =>
    year !== undefined && showEras
      ? TimelineParser.getYearWithLabel(year)
      : (year ?? '')

  // Memoized so the chart only receives new data when the timeline data changes.
  // Recharts resets the Brush range whenever the chart data changes.
  const graphData = useMemo<Array<IGraphTimelineData>>(() => {
    return yearsArray.map((year) => {
      const barData = timelineData.hasOwnProperty(year)
        ? timelineData[year]
        : { total: 0 }
      let yearLabel = year
      // If any of the years are negative, set the year, display the era (BCE/CE) in the label
      if (showEras) {
        yearLabel = TimelineParser.getYearWithLabel(year)
      }
      return {
        year: yearLabel,
        yearKey: year,
        ...barData,
      }
    })
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
      className="highlight-bar-charts p-3"
      style={{ userSelect: 'none', width: '100%' }}
      data-testid="timeline-graph-container"
    >
      {/* Padding is on the wrapper because Recharts 3 draws the chart at the
      full container height, so padding on ResponsiveContainer pushes the
      legend outside the container. */}
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
                halLinkConfig={halLinkConfig}
                active={false}
                payload={undefined}
              />
            }
          />
          <Legend
            layout={isMobile ? 'vertical' : 'horizontal'}
            // keep the bar order so the legend matches the filter checkboxes
            itemSorter={null}
            content={
              <CustomLegend
                payload={undefined}
                activeLegend={activeLegend}
                selectedRelationships={selectedRelationships}
                isMobile={isMobile}
                handleOnHover={handleOnHover}
                handleOnClick={handleOnClick}
              />
            }
          />
          {Array.from(halLinkMapToLegendName.entries()).map(
            ([halLinkKey, label]) => {
              if (!relationshipsToShowInLegend.includes(halLinkKey)) {
                return null
              }
              const graphKey = label as keyof typeof theme.color.graphs
              let defaultLegend = 'focused'
              if (isNull(activeLegend)) {
                defaultLegend = 'focused'
              } else if (activeLegend === halLinkKey) {
                defaultLegend = 'focused'
              } else {
                defaultLegend = 'unFocused'
              }
              return (
                <Bar
                  key={halLinkKey}
                  dataKey={`${halLinkKey}.totalItems`}
                  stackId="a"
                  fill={
                    theme.color.graphs[graphKey][
                      defaultLegend as 'focused' | 'unFocused'
                    ]
                  }
                  name={label || halLinkKey}
                  yAxisId="total"
                  // hidden series keep their legend entry so they can be shown again
                  hide={!selectedRelationships.includes(halLinkKey)}
                  shape={(p: any) => getShape(p)}
                />
              )
            },
          )}
          {yearsArray.length > 1 && (
            <Brush
              dataKey="year"
              stroke={theme.color.primary.blue}
              startIndex={startIndex}
              endIndex={endIndex}
              ariaLabel={`Year range ${getYearLabel(yearsArray[startIndex])} to ${getYearLabel(yearsArray[endIndex])}`}
              // onChange also fires for arrow key changes, which onDragEnd does not
              onChange={({ startIndex: start, endIndex: end }) => {
                if (
                  start !== undefined &&
                  end !== undefined &&
                  (start !== startIndex || end !== endIndex)
                ) {
                  handleRangeChange(start, end)
                }
              }}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph
