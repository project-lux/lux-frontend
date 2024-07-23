/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reactflow/dist/style.css'
import React, { useCallback, useEffect } from 'react'
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

import OriginNode from './OriginNode'
import ParentNode from './ParentNode'
import ChildNode from './ChildNode'
// import { useDnD } from './DnDContext'

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
  originNode: OriginNode,
  parentNode: ParentNode,
  childNode: ChildNode,
}

// let id = 0
// // eslint-disable-next-line no-plusplus
// const getId = (): string => `dndnode_${id++}`

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
  // const { screenToFlowPosition } = useReactFlow()
  // const [type] = useDnD()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nodes, setNodes] = useNodesState(newNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(newEdges)

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

  // const onDragOver = useCallback((event) => {
  //   event.preventDefault()
  //   event.dataTransfer.dropEffect = 'move'
  // }, [])

  // const onDrop = useCallback(
  //   (event) => {
  //     event.preventDefault()

  //     // check if the dropped element is valid
  //     if (!type) {
  //       return
  //     }

  //     // project was renamed to screenToFlowPosition
  //     // and you don't need to subtract the reactFlowBounds.left/top anymore
  //     // details: https://reactflow.dev/whats-new/2023-11-10
  //     const position = screenToFlowPosition({
  //       x: event.clientX,
  //       y: event.clientY,
  //     })
  //     const newNode = {
  //       id: getId(),
  //       type,
  //       position,
  //       data: { label: `${type} node` },
  //     }

  //     setNodes((nds) => nds.concat(newNode))
  //   },
  //   [screenToFlowPosition, setNodes, type],
  // )

  return (
    <ReactFlow
      key={`${currentUuid}-${luxNodes.length}`}
      style={{
        background: theme.color.white,
        width: '100%',
      }}
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
      <Controls />
    </ReactFlow>
  )
}

export default Hierarchy
