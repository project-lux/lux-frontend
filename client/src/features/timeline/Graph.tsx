import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import theme from '../../styles/theme'
import {
  IGraphTimelineData,
  ITimelinesTransformed,
} from '../../types/ITimelines'

interface IProps {
  data: ITimelinesTransformed
}

const Graph: React.FC<IProps> = ({ data }) => {
  const graphData: Array<IGraphTimelineData> = Object.entries(data).map(
    ([key, value]) => ({
      year: key,
      ...value,
    }),
  )

  const facetNameMap: Map<string, string> = new Map([
    ['itemProductionDate', 'Objects Produced'],
    ['itemEncounteredDate', 'Objects Encountered'],
    ['workCreationDate', 'Works Created'],
    ['workPublicationDate', 'Works Published'],
  ])

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={graphData}
        margin={{
          top: 20,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="itemProductionDate.totalItems"
          stackId="a"
          fill={theme.color.primary.blue}
          name={facetNameMap.get('itemProductionDate') || 'itemProductionDate'}
        />
        <Bar
          dataKey="itemEncounteredDate.totalItems"
          stackId="a"
          fill={theme.color.primary.teal}
          name={
            facetNameMap.get('itemEncounteredDate') || 'itemEncounteredDate'
          }
        />
        <Bar
          dataKey="workCreationDate.totalItems"
          stackId="a"
          fill={theme.color.secondary.lightBlue}
          name={facetNameMap.get('workCreationDate') || 'workCreationDate'}
        />
        <Bar
          dataKey="workPublicationDate.totalItems"
          stackId="a"
          fill={theme.color.secondary.pacificBlue}
          name={
            facetNameMap.get('workPublicationDate') || 'workPublicationDate'
          }
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Graph
