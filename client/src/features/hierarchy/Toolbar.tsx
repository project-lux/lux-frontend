import React from 'react'
import { NodeToolbar, Position } from 'reactflow'

const Toolbar: React.FC = () => (
  <NodeToolbar
    isVisible
    position={Position.Bottom}
    nodeId={[
      'https://lux-front-dev.collections.yale.edu/data/place/9e73910b-a8fc-47aa-9246-dcc1191310ee',
      'https://lux-front-dev.collections.yale.edu/data/place/f14804ea-6bd1-4bfb-9394-6f5428c83c34',
      'https://lux-front-dev.collections.yale.edu/data/place/7bdc8ba9-acd8-4584-9a5f-33731def15a0',
    ]}
  >
    <p />
  </NodeToolbar>
)

export default Toolbar
