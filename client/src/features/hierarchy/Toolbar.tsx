import React from 'react'
import { NodeToolbar, Position } from 'reactflow'

interface IProps {
  nodeIds: Array<string>
  children: JSX.Element | JSX.Element[]
}

const Toolbar: React.FC<IProps> = ({ nodeIds, children }) => (
  <NodeToolbar isVisible position={Position.Bottom} nodeId={nodeIds}>
    {children}
  </NodeToolbar>
)

export default Toolbar
