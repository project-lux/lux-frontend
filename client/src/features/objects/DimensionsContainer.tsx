import React from 'react'

import StyledHr from '../../styles/shared/Hr'

import Dimensions from './Dimensions'

interface IDimensions {
  dimensions: Array<{
    label: string
    value: number
    unit: string
  }>
}

const DimensionsContainer: React.FC<IDimensions> = ({ dimensions }) => (
  <div className="row">
    {dimensions.map((dimension, ind) => (
      <React.Fragment key={`${dimension.label}_${ind}`}>
        <Dimensions
          label={dimension.label}
          value={dimension.value}
          unit={dimension.unit}
        />
        <StyledHr className="dimensionsHr" />
      </React.Fragment>
    ))}
  </div>
)

export default DimensionsContainer
