/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reactflow/dist/style.css'
import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  Controls,
  applyNodeChanges,
  // useReactFlow,
} from 'reactflow'
import dagre from '@dagrejs/dagre'

import theme from '../../styles/theme'

import NodeContainer from './NodeContainer'

interface IProps {
  luxNodes: Array<Node>
  luxEdges: Array<Edge>
  currentUuid: string
  children: JSX.Element[]
}

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36

const getLayoutedElements = (
  nodes: Array<any>,
  edges: Array<any>,
  direction = 'LR',
): { nodes: Array<any>; edges: Array<any> } => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: 'LR' })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.targetPosition = isHorizontal ? 'left' : 'top'
    node.sourcePosition = isHorizontal ? 'right' : 'bottom'

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    }

    return node
  })

  return { nodes, edges }
}

const nodeTypes = {
  originNode: NodeContainer,
  parentNode: NodeContainer,
  childNode: NodeContainer,
}

const Hierarchy: React.FC<IProps> = ({
  luxNodes,
  luxEdges,
  currentUuid,
  children,
}) => {
  const { nodes: newNodes, edges: newEdges } = getLayoutedElements(
    luxNodes,
    luxEdges,
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes] = useNodesState(newNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(newEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null)

  const handleOnInit = (rf: any): void => {
    setReactFlowInstance(rf)
  }

  useEffect(() => {
    if (reactFlowInstance && nodes?.length) {
      reactFlowInstance.fitView()
    }
  }, [reactFlowInstance, nodes?.length])

  // const handleOnInit = useCallback((instance) => {
  //   // Call fitView after the component has rendered
  //   setTimeout(() => {
  //     instance.fitView()
  //   }, 0)
  // }, [])

  const onNodesChange = useCallback(
    (changes) => setNodes((els) => applyNodeChanges(changes, els)),
    [setNodes],
  )

  useEffect(() => {
    setNodes(newNodes)
    setEdges(newEdges)
  }, [newEdges, newNodes, setEdges, setNodes])

  const onConnect = useCallback(
    (params: Connection | Edge) =>
      setEdges((eds) =>
        addEdge(
          { ...params, type: ConnectionLineType.SmoothStep, animated: true },
          eds,
        ),
      ),
    [setEdges],
  )

  return (
    <ReactFlow
      key={`${currentUuid}-${luxNodes.length}`}
      style={{
        background: theme.color.white,
        width: '100%',
      }}
      onInit={(i) => handleOnInit(i)}
      nodes={nodes}
      edges={edges}
      onNodesChange={() => onNodesChange}
      onEdgesChange={() => onEdgesChange}
      onConnect={() => onConnect}
      connectionLineType={ConnectionLineType.SmoothStep}
      nodeTypes={nodeTypes}
      edgesFocusable={false}
      // onDrop={onDrop}
      // onDragOver={onDragOver}
      fitView
    >
      {children}
      <Controls showInteractive={false} />
    </ReactFlow>
  )
}

export default Hierarchy
