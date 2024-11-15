/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reactflow/dist/style.css'
// import ELK from 'elkjs/lib/elk.bundled.js'
import React, { useCallback, useLayoutEffect } from 'react'
import {
  ReactFlow,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Controls,
  Edge,
  Node,
} from 'reactflow'
import ElkConstructor from 'elkjs'

import NodeContainer from './NodeContainer'

interface IProps {
  luxNodes: Array<any>
  luxEdges: Array<Edge>
  currentUuid: string
  children: JSX.Element[] | undefined
}

const elk = new ElkConstructor()

// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  'elk.algorithm': 'layered',
  'elk.layered.spacing.nodeNodeBetweenLayers': '100',
  'elk.spacing.nodeNode': '80',
}

const getLayoutedElements = (nodes: any[], edges: any, options = {}): any => {
  const graph = {
    id: 'root',
    layoutOptions: options,
    children: nodes.map((node) => ({
      ...node,
      // Adjust the target and source handle positions based on the layout
      // direction.
      targetPosition: 'left',
      sourcePosition: 'right',

      // Hardcode a width and height for elk to use when layouting.
      width: 150,
      height: 50,
    })),
    edges,
  }

  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph.children?.map((node) => ({
        ...node,
        // React Flow expects a position property on the node instead of `x`
        // and `y` fields.
        position: { x: node.x, y: node.y },
      })),

      edges: layoutedGraph.edges,
    }))
    .catch(console.error)
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
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const { fitView } = useReactFlow()

  const onConnect = useCallback(
    (params) => setEdges((eds: any) => addEdge(params, eds)),
    [setEdges],
  )

  const onLayout = useCallback(() => {
    const opts = { 'elk.direction': 'RIGHT', ...elkOptions }

    getLayoutedElements(luxNodes, luxEdges, opts).then(
      (layoutedNodesAndEdges: {
        nodes: React.SetStateAction<Node<any, string | undefined>[]>
        edges: React.SetStateAction<Edge<any>[]>
      }) => {
        setNodes(layoutedNodesAndEdges.nodes)
        setEdges(layoutedNodesAndEdges.edges)

        window.requestAnimationFrame(() => fitView())
      },
    )
  }, [luxNodes, luxEdges, setNodes, setEdges, fitView])

  // Calculate the initial layout on mount.
  useLayoutEffect(() => {
    onLayout()
  }, [onLayout])

  return (
    <ReactFlow
      key={`${currentUuid}-${luxNodes.length}`}
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      edgesFocusable={false}
      fitView
    >
      {children}
      <Controls showInteractive={false} />
    </ReactFlow>
  )
}

export default Hierarchy
