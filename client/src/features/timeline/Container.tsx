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
  // ResponsiveContainer,
} from 'recharts'

import theme from '../../styles/theme'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'

const data = [
  {
    name: '1945 C.E.',
    itemProductionDate: 4000,
    workCreationDate: 2400,
    workPublicationDate: 2400,
  },
  {
    name: '1952 C.E.',
    itemProductionDate: 3000,
    workPublicationDate: 1398,
  },
  {
    name: '1953 C.E.',
    itemEncounteredDate: 2000,
    workPublicationDate: 9800,
    itemProductionDate: 2290,
  },
  {
    name: '1955 C.E.',
    itemProductionDate: 2780,
    workCreationDate: 3908,
    itemEncounteredDate: 2000,
  },
  {
    name: '1958 C.E.',
    itemProductionDate: 1890,
    workPublicationDate: 4800,
    workCreationDate: 2181,
  },
  {
    name: '1959 C.E.',
    workCreationDate: 2390,
    workPublicationDate: 3800,
    itemProductionDate: 2500,
  },
  {
    name: '1962 C.E.',
    itemProductionDate: 3490,
    workCreationDate: 4300,
    itemEncounteredDate: 2100,
  },
  {
    name: '1964 C.E.',
    itemProductionDate: 2780,
    workPublicationDate: 3908,
    workCreationDate: 2000,
  },
  {
    name: '1965 C.E.',
    itemProductionDate: 1890,
    workPublicationDate: 4800,
    workCreationDate: 2181,
  },
  {
    name: '1966 C.E.',
    itemProductionDate: 2390,
    workCreationDate: 3800,
    workPublicationDate: 2500,
  },
  {
    name: '1967 C.E.',
    itemProductionDate: 3490,
    workPublicationDate: 4300,
    itemEncounteredDate: 2100,
  },
]

const Chart: React.FC = () => {
  // const facetNameMap: Map<string, string> = new Map([
  //   ['itemProductionDate', 'Objects Produced'],
  //   ['itemEncounteredDate', 'Objects Encountered'],
  //   ['workCreationDate', 'Works Created'],
  //   ['workPublicationDate', 'Works Published'],
  // ])

  console.log()
  return (
    <StyledEntityPageSection>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="itemProductionDate"
          stackId="a"
          fill={theme.color.secondary.aeroBlue}
        />
        <Bar
          dataKey="itemEncounteredDate"
          stackId="a"
          fill={theme.color.secondary.cornflowerBlue}
        />
        <Bar
          dataKey="workCreationDate"
          stackId="a"
          fill={theme.color.secondary.lightBlue}
        />
        <Bar
          dataKey="workPublicationDate"
          stackId="a"
          fill={theme.color.secondary.pacificBlue}
        />
      </BarChart>
      {/* </ResponsiveContainer> */}
    </StyledEntityPageSection>
  )
}

export default Chart
