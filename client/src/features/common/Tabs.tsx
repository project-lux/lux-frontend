import React, { ReactElement, useState } from 'react'

import StyledTabs from '../../styles/features/common/Tabs'

import TabButton from './TabButton'

interface ITabChildren {
  children: Array<ReactElement | null>
}

// Only used for the RelatedObjectsAndWorks component
const Tabs: React.FC<ITabChildren> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <StyledTabs>
      <ul
        className="nav nav-tabs border-bottom-0 d-flex"
        role="tablist"
        data-testid="tabs-unordered-list"
      >
        {children.map((item, index) => {
          if (item !== null) {
            return (
              <TabButton
                // eslint-disable-next-line react/no-array-index-key
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
      {children[selectedTab]}
    </StyledTabs>
  )
}

export default Tabs
