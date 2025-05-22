import React from 'react'
import { Collapse } from 'react-bootstrap'
import styled from 'styled-components'

import theme from '../../styles/theme'

interface ICollapseContainer {
  open: boolean
  id: string
  children: JSX.Element | JSX.Element[]
  className: string
}

const StyledCollapse = styled(Collapse)`
  position: relative;

  .borderLeft {
    border-left: 1px solid ${theme.color.secondary.cornflowerBlue};
    position: absolute;
    top: 0%;
    bottom: 22px;
    left: -1px;
  }
`
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
  className,
}) => (
  <StyledCollapse in={open} className="collapseContainer float-left">
    <div
      id={`${id}-collapse-component`}
      className={`w-100 ${className}`}
      style={{
        paddingLeft: '2.5rem',
      }}
      data-testid={`${id}-collapse-component`}
    >
      {children}
    </div>
  </StyledCollapse>
)

export default CollapseContainer
