/* eslint-disable @typescript-eslint/no-explicit-any */

// TODO refactor the code for iterated items have unique keys without using array indexes

import React, { useState } from 'react'

import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'
import StyledHr from '../../styles/shared/Hr'

interface IList {
  children: any
  length?: number
  className?: string
  itemSpacing?: string
  hideBreakline?: boolean
  hrClassName?: string
}

/**
 * Reusable component for rendering a list of child components
 * @param {any} children child components in the form of an array
 * @param {string} length optional; the number of children to display
 * @param {string} className optional; the className for the component
 * @param {string} itemSpacing optional; determines the margins between child elements
 * @returns {JSX.Element}
 */
const ExpandableList: React.FC<IList> = ({
  children,
  length = 20,
  className = 'col-md-9',
  itemSpacing = 'single',
  hrClassName = 'expandableListMobileHr',
}) => {
  const [displayLength, setDisplayLength] = useState(length)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  useResizeableWindow(setIsMobile)

  const numChildren = children.props.values.length

  if (children.props.values.length < length || length === 0) {
    return (
      <div className={`${className} col-sm-12`}>
        {children}
        <StyledHr width="100%" hiddenOnDesktop className={hrClassName} />
      </div>
    )
  }

  const rowStyle = {
    marginBottom:
      itemSpacing === 'double'
        ? theme.spacing.verticalItemDoubleSpacing
        : theme.spacing.verticalItemSingleSpacing,
  }

  return (
    <div className={`${className} col-sm-12`} data-testid="expandable-list">
      {children.props.values
        .slice(0, displayLength)
        .map((value: string, ind: number) => (
          <div
            key={`${value}-${ind}`}
            className={`${children.props.className || 'col-md-12'} col-sm-12`}
            style={rowStyle}
          >
            {value}
          </div>
        ))}
      {displayLength < numChildren && (
        <button
          type="button"
          className={`btn btn-link show-more ${isMobile ? 'ps-0' : ''}`}
          onClick={() => setDisplayLength(numChildren)}
          data-testid="expandable-list-show-all"
        >
          Show All
        </button>
      )}
      {displayLength > length && (
        <button
          type="button"
          className={`btn btn-link show-less ${isMobile ? 'ps-0' : ''}`}
          onClick={() => setDisplayLength(length)}
          data-testid="expandable-list-show-less"
        >
          Show Less
        </button>
      )}
      <StyledHr width="100%" hiddenOnDesktop className={hrClassName} />
    </div>
  )
}

export default ExpandableList
