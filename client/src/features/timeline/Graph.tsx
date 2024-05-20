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
import { Accordion, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { isUndefined } from 'lodash'

import theme from '../../styles/theme'
import {
  IGraphTimelineData,
  ITimelineCriteria,
  ITimelinesTransformed,
} from '../../types/ITimelines'
import { IHalLinks } from '../../types/IHalLinks'
import { formatDateJsonSearch } from '../../lib/facets/dateParser'
import {
  addYearsWithNoData,
  getAxisYDomain,
  getYearWithLabel,
} from '../../lib/util/timelineHelper'

import ZoomInput from './ZoomInput'
import CustomTooltip from './CustomTooltip'

const StyledButton = styled(Accordion.Header)`
  .accordion-button {
    padding: 0.5rem;
    width: 20%;
  }
`

interface IProps {
  timelineData: ITimelinesTransformed
  searchTags: IHalLinks
  sortedKeys: Array<string>
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

const Graph: React.FC<IProps> = ({ timelineData, searchTags, sortedKeys }) => {
  const navigate = useNavigate()
  // Add additional years that were not returned with the data
  const yearsArray = addYearsWithNoData(sortedKeys)

  const graphData: Array<IGraphTimelineData> = yearsArray.map((year) => {
    const barData = timelineData.hasOwnProperty(year)
      ? timelineData[year]
      : { total: 0 }
    return {
      year: getYearWithLabel(year),
      yearKey: year,
      ...barData,
    }
  })

  const [zoomState, setZoomState] = useState<IZoomState>(
    getInitialState(graphData),
  )

  const zoom = (): void => {
    let { refAreaLeft, refAreaRight } = zoomState

    if (refAreaLeft === refAreaRight) {
      const updatedState = zoomState
      updatedState.refAreaLeft = ''
      updatedState.refAreaRight = ''
      setZoomState(() => updatedState)
      return
    }

    if (isUndefined(refAreaLeft) || refAreaLeft === '') {
      refAreaLeft = zoomState.left
    }

    if (isUndefined(refAreaRight) || refAreaRight === '') {
      refAreaRight = zoomState.right
    }
    console.log(refAreaRight)

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

    // yAxis domain
    const { bottom, top, slicedData } = getAxisYDomain(
      graphData,
      refAreaLeft,
      refAreaRight,
      'yearKey',
      1,
    )

    setZoomState({
      refAreaLeft: '',
      refAreaRight: '',
      data: slicedData,
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top,
      animation: true,
    })
  }

  const zoomOut = (): void => {
    setZoomState(getInitialState(graphData))
  }

  const handleClick = (year: string, searchTag: string): void => {
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
      <Row className="d-flex">
        <Accordion>
          <Accordion.Item eventKey="0">
            <StyledButton>Filter By Years</StyledButton>
            <Accordion.Body className="ps-1 pt-2">
              <ZoomInput
                key={`${zoomState.data[0].yearKey}-${
                  zoomState.data[zoomState.data.length - 1].yearKey
                }`}
                state={zoomState}
                setZoomState={setZoomState}
                setZoom={zoom}
                setZoomOut={zoomOut}
                disabledZoomOut={zoomState.data.length === graphData.length}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
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
            setZoomState({ ...zoomState, refAreaLeft: e.activeLabel as string })
          }
          onMouseMove={(e) => {
            setZoomState({
              ...zoomState,
              refAreaLeft: zoomState.refAreaLeft,
              refAreaRight: e.activeLabel as string,
            })
          }}
          // eslint-disable-next-line react/jsx-no-bind
          onMouseUp={() => zoom()}
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
