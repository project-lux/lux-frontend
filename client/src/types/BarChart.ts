/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScaleBand, ScaleLinear } from 'd3'

import { IFacetValue } from './IFacets'

export interface IBarChartProps {
  data: Array<IFacetValue>
}

export interface IAxisBottomProps {
  scale: ScaleBand<string>
  transform: string
}

export interface IBarsProps {
  data: IBarChartProps['data']
  height: number
  scaleX: IAxisBottomProps['scale']
  scaleY: IAxisLeftProps['scale']
}

export interface IAxisLeftProps {
  scale: ScaleLinear<number, number, never>
}
