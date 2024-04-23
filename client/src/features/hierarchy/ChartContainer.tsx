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
import ParentCustomNode from './ParentCustomNode'
import ChildCustomNode from './ChildCustomNode'

interface IProps {
  currentUuid: string
  parents: Array<string>
  descendants: ISearchResults
}

const ChartContainer: React.FC<IProps> = ({
  currentUuid,
  parents,
  descendants,
}) => {
  // get nodes
  const parentNodes = getParentNodes(parents).slice(0, 5)
  const childNodes = getChildNodes(descendants).slice(0, 5)
  const currentNode = getDefaultNode(currentUuid)

  // get edges
  const parentEdges = getParentEdges(parentNodes, currentUuid)
  const childEdges = getChildEdges(childNodes, currentUuid)

  parentNodes.map((parentNode) => {
    parentNode.data.label = (
      <ParentCustomNode entityId={parentNode.data.label} />
    )
    return null
  })

  childNodes.map((childNode) => {
    childNode.data.label = <ChildCustomNode entityId={childNode.data.label} />
    return null
  })

  currentNode.data.label = <Node entityId={currentNode.data.label} />
  // combine nodes and edges
  const nodes = [currentNode, ...parentNodes, ...childNodes]
  const edges = [...parentEdges, ...childEdges]

  // nodes.map((node) => {
  //   node.data.label = <Node entityId={node.data.label} />
  //   return null
  // })

  return (
    <Hierarchy
      key={currentUuid}
      luxNodes={nodes}
      luxEdges={edges}
      currentUuid={currentUuid}
    />
  )
}

export default ChartContainer
