import React from 'react'
import { Handle, Position } from 'reactflow'

import StyledNode from '../../styles/features/visualizations/Node'

interface IProps {
  data: {
    label: string
  }
}

const OriginNode: React.FC<IProps> = ({ data }) => (
  <StyledNode>
    <Handle
      type="target"
      className="targetHandle"
      position={Position.Left}
      id="a"
      isConnectable
    />
    {data.label}
    <Handle
      type="source"
      className="sourceHandle"
      position={Position.Right}
      id="b"
      isConnectable
    />
  </StyledNode>
)

export default OriginNode
