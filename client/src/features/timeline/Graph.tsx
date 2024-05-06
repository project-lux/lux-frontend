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
  data: ITimelinesTransformed
  searchTags: IHalLinks
  sortedKeys: Array<string>
}

const Graph: React.FC<IProps> = ({ data, searchTags, sortedKeys }) => {
  const navigate = useNavigate()

  const graphData: Array<IGraphTimelineData> = sortedKeys.map((key) => ({
    year: getYearWithLabel(key),
    ...data[key],
  }))

  const handleClick = (year: string, searchTag: string): void => {
    const { tab, jsonSearchTerm } = searchTags[searchTag]
    const { criteria } = data[year][searchTag] as ITimelineCriteria
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
          onClick={(d) => handleClick(d.year, 'itemProductionDate')}
        />
        <Bar
          dataKey="itemEncounteredDate.totalItems"
          stackId="a"
          fill={theme.color.primary.teal}
          name={
            facetNameMap.get('itemEncounteredDate') || 'itemEncounteredDate'
          }
          onClick={(d) => handleClick(d.year, 'itemEncounteredDate')}
        />
        <Bar
          dataKey="workCreationDate.totalItems"
          stackId="a"
          fill={theme.color.secondary.lightBlue}
          name={facetNameMap.get('workCreationDate') || 'workCreationDate'}
          onClick={(d) => handleClick(d.year, 'workCreationDate')}
        />
        <Bar
          dataKey="workPublicationDate.totalItems"
          stackId="a"
          fill={theme.color.secondary.pacificBlue}
          name={
            facetNameMap.get('workPublicationDate') || 'workPublicationDate'
          }
          onClick={(d) => handleClick(d.year, 'workPublicationDate')}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Graph
