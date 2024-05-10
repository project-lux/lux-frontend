import React from 'react'
import { Collapse } from 'react-bootstrap'

interface ICollapseContainer {
  open: boolean
  id: string
  children: JSX.Element | JSX.Element[]
}

/**
 * Collapsible container that holds relationships or groups and their children
 * @param {boolean} open open or close the container
 * @param {string} id id of the div
 * @param {JSX.Element | JSX.Element[]} children relationship or groups children
 * @returns
 */
const CollapseContainer: React.FC<ICollapseContainer> = ({
  open,
  id,
  children,
}) => (
  <Collapse in={open} className="float-left">
    <div
      id={`${id}-collapse-component`}
      className="w-100"
      data-testid={`${id}-collapse-component`}
    >
      {children}
    </div>
  </Collapse>
)

export default CollapseContainer
