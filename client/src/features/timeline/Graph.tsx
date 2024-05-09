/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
} from 'recharts'
import { useNavigate } from 'react-router-dom'

import theme from '../../styles/theme'
import {
  IGraphTimelineData,
  ITimelineCriteria,
  ITimelinesTransformed,
} from '../../types/ITimelines'
import { IHalLinks } from '../../types/IHalLinks'
import { formatDateJsonSearch } from '../../lib/facets/dateParser'
import { getYearWithLabel } from '../../lib/parse/search/timelineParser'

interface IProps {
  timelineData: ITimelinesTransformed
  searchTags: IHalLinks
  sortedKeys: Array<string>
}

const getInitialState = (
  initialData: Array<IGraphTimelineData>,
): Record<string, any> => ({
  data: initialData,
  left: 'dataMin',
  right: 'dataMax',
  refAreaLeft: '',
  refAreaRight: '',
  top: 'dataMax+1',
  bottom: 'dataMin-1',
  animation: true,
})

const Graph: React.FC<IProps> = ({ timelineData, searchTags, sortedKeys }) => {
  const graphData: Array<IGraphTimelineData> = sortedKeys.map((key) => ({
    year: getYearWithLabel(key),
    yearKey: key,
    ...timelineData[key],
  }))

  const [zoomState, setZoomState] = useState<Record<string, any>>(
    getInitialState(graphData),
  )
  const navigate = useNavigate()

  const getAxisYDomain = (
    from: string,
    to: string | undefined,
    ref: string,
    offset: number,
  ): Array<number | Array<IGraphTimelineData>> => {
    let fromIndex: number | undefined
    let toIndex: number | undefined
    graphData.map((obj) => {
      if (obj.year === from) {
        fromIndex = graphData.indexOf(obj)
      }
      if (obj.year === to) {
        toIndex = graphData.indexOf(obj)
      }
      return null
    })

    // const stateKeys = Object.keys(state)
    // const ind = stateKeys.indexOf('_stateId')
    if (fromIndex !== undefined) {
      const refData = graphData.slice(fromIndex - 1, toIndex)
      let [bottom, top] = [refData[0][ref], refData[0][ref]]
      refData.forEach((d) => {
        if (d[ref] > top) {
          top = d[ref]
        }
        if (d[ref] < bottom) {
          bottom = d[ref]
        }
      })

      // eslint-disable-next-line no-bitwise
      return [
        parseInt(bottom as string, 10) - offset,
        parseInt(top as string, 10) + offset,
        refData,
      ]
    }

    // set this to default to the lowest and highest points on the graph
    return []
  }

  const zoom = (): void => {
    let { refAreaLeft, refAreaRight } = zoomState

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      setZoomState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }))
      return
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

    // yAxis domain
    const [bottom, top, slicedData] = getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      'yearKey',
      1,
    )

    setZoomState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      data: slicedData,
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
    }))
  }

  const zoomOut = (): void => {
    setZoomState(getInitialState(graphData))
  }

  const handleClick = (year: string, searchTag: string): void => {
    console.log('clicked')
    const { tab, jsonSearchTerm } = searchTags[searchTag]
    const { criteria } = timelineData[year][searchTag] as ITimelineCriteria
    const searchQ = formatDateJsonSearch(
      year,
      jsonSearchTerm as string,
      criteria,
    )
    navigate({
      pathname: `/view/results/${tab}`,
      search: `q=${searchQ}&collapseSearch=true`,
    })
  }

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
      {zoomState.data.length !== graphData.length && (
        <button type="button" className="btn update" onClick={() => zoomOut()}>
          Zoom Out
        </button>
      )}
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={zoomState.data}
          margin={{
            top: 20,
            right: 10,
            left: 0,
            bottom: 5,
          }}
          onMouseDown={(e) =>
            setZoomState({ ...zoomState, refAreaLeft: e.activeLabel })
          }
          onMouseMove={(e) =>
            setZoomState({
              ...zoomState,
              refAreaLeft: zoomState.refAreaLeft,
              refAreaRight: e.activeLabel,
            })
          }
          // eslint-disable-next-line react/jsx-no-bind
          onMouseUp={() => zoom()}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" allowDataOverflow />
          <YAxis dataKey="total" yAxisId="total" allowDataOverflow />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="itemProductionDate.totalItems"
            stackId="a"
            fill={theme.color.primary.blue}
            name={
              facetNameMap.get('itemProductionDate') || 'itemProductionDate'
            }
            yAxisId="total"
            onClick={(d) => handleClick(d.yearKey, 'itemProductionDate')}
          />
          <Bar
            dataKey="itemEncounteredDate.totalItems"
            stackId="a"
            fill={theme.color.primary.teal}
            name={
              facetNameMap.get('itemEncounteredDate') || 'itemEncounteredDate'
            }
            yAxisId="total"
            onClick={(d) => handleClick(d.yearKey, 'itemEncounteredDate')}
          />
          <Bar
            dataKey="workCreationDate.totalItems"
            stackId="a"
            fill={theme.color.secondary.lightBlue}
            name={facetNameMap.get('workCreationDate') || 'workCreationDate'}
            yAxisId="total"
            onClick={(d) => handleClick(d.yearKey, 'workCreationDate')}
          />
          <Bar
            dataKey="workPublicationDate.totalItems"
            stackId="a"
            fill={theme.color.secondary.pacificBlue}
            name={
              facetNameMap.get('workPublicationDate') || 'workPublicationDate'
            }
            yAxisId="total"
            onClick={(d) => handleClick(d.yearKey, 'workPublicationDate')}
          />
          {zoomState.refAreaLeft && zoomState.refAreaRight ? (
            <ReferenceArea
              yAxisId="total"
              x1={zoomState.refAreaLeft}
              x2={zoomState.refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Graph
