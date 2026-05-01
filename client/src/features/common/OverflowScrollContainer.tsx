import React, { CSSProperties, HTMLAttributes, useRef } from 'react'

import useOverflowScroll from '../../lib/hooks/useOverflowScroll'

interface IProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  contentClassName?: string
  contentStyle?: CSSProperties
}

const OverflowScrollContainer: React.FC<IProps> = ({
  children,
  className,
  contentClassName,
  contentStyle,
  style,
  ...props
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null)
  const childRef = useRef<HTMLDivElement | null>(null)
  const hasOverflow = useOverflowScroll(parentRef, childRef)

  return (
    <div
      {...props}
      ref={parentRef}
      className={className}
      style={{
        ...style,
        overflowY: hasOverflow ? 'scroll' : 'visible',
      }}
    >
      <div ref={childRef} className={contentClassName} style={contentStyle}>
        {children}
      </div>
    </div>
  )
}

export default OverflowScrollContainer
