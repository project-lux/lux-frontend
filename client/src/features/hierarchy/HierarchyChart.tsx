/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reactflow/dist/style.css'
import React from 'react'

import {
  getChildEdges,
  getChildNodes,
  getDefaultNode,
  getParentEdges,
  getParentNodes,
} from '../../lib/util/hierarchyHelpers'
import { ISearchResults } from '../../types/ISearchResults'

import Hierarchy from './Hierarchy'
import Node from './Node'

interface IProps {
  currentUuid: string
  parents: Array<string>
  descendants: ISearchResults
}

const HierarchyChart: React.FC<IProps> = ({
  currentUuid,
  parents,
  descendants,
}) => {
  // get nodes
  const parentNodes = getParentNodes(parents)
  const childNodes = getChildNodes(descendants)
  const currentNode = getDefaultNode(currentUuid)

  // get edges
  const parentEdges = getParentEdges(parentNodes, currentUuid)
  const childEdges = getChildEdges(childNodes, currentUuid)

  // combine nodes and edges
  const nodes = [currentNode, ...parentNodes, ...childNodes]
  const edges = [...parentEdges, ...childEdges]

  nodes.map((node) => {
    node.data.label = <Node entityId={node.data.label} />
    return null
  })

  return (
    <Hierarchy
      key={currentUuid}
      luxNodes={nodes}
      luxEdges={edges}
      currentUuid={currentUuid}
    />
  )
}

export default HierarchyChart
