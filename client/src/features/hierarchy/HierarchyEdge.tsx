import React from 'react'
import { BaseEdge, getSimpleBezierPath } from 'reactflow'

import theme from '../../styles/theme'

interface IProps {
  id: string
  sourceX: number
  sourceY: number
  targetX: number
  targetY: number
}

const HierarchyEdge: React.FC<IProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  })

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{ stroke: theme.color.primary.darkBlue }}
    />
  )
}

export default HierarchyEdge
