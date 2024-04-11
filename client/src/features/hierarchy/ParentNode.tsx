import React from 'react'
import { Handle, Position } from 'reactflow'

import StyledNode from '../../styles/features/visualizations/Node'

import Toolbar from './Toolbar'

interface IProps {
  data: {
    label: string
  }
}

const ParentNode: React.FC<IProps> = ({ data }) => (
  <StyledNode>
    <Toolbar />
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

export default ParentNode
