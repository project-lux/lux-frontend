import React, { ReactElement, useState } from 'react'

import StyledTabs from '../../styles/features/common/Tabs'
import theme from '../../styles/theme'
import useResizeableWindow from '../../lib/hooks/useResizeableWindow'

import TabButton from './TabButton'
import MobileNavigation from './MobileNavigation'
// import MobileNavigation from './MobileNavigation'

interface ITabChildren {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: Array<ReactElement<any> | null>
}

// Only used for the RelatedObjectsAndWorks component
const Tabs: React.FC<ITabChildren> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < theme.breakpoints.md,
  )
  const [selectedTab, setSelectedTab] = useState(0)

  useResizeableWindow(setIsMobile)

  return (
    <StyledTabs>
      {isMobile ? (
        <MobileNavigation
          config={children}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      ) : (
        <ul
          className="nav nav-tabs border-bottom-0 d-flex p-0"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="tablist"
          data-testid="tabs-unordered-list"
        >
          {children.map((item, index) => {
            if (item !== null) {
              return (
                <TabButton
                  key={index}
                  title={item.props.title}
                  index={index}
                  setSelectedTab={setSelectedTab}
                  isActive={index === selectedTab}
                />
              )
            }
            return null
          })}
        </ul>
      )}
      {children[selectedTab]}
    </StyledTabs>
  )
}

export default Tabs
