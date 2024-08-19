import React from 'react'

import { pushClientEvent } from '../../lib/pushClientEvent'
import { StyledTabButton } from '../../styles/features/common/TabButton'
import { transformStringForTestId } from '../../lib/parse/data/helper'

interface ITabButton {
  title: string
  index: number
  setSelectedTab: (index: number) => void
  isActive: boolean
}

/*
 * Tab button, only used for RelatedObjectsAndWorks container.
 * Button is used as a tab for a11y reason.
 */
const TabButton: React.FC<ITabButton> = ({
  title,
  setSelectedTab,
  index,
  isActive,
}) => {
  const buttonClasses = isActive ? 'tab nav-link active' : 'tab nav-link'

  const testId = transformStringForTestId(title).toLowerCase()

  return (
    <li className="nav-item" data-testid="tab-button-list-item">
      <StyledTabButton
        type="button"
        className={buttonClasses}
        role="tab"
        onClick={() => {
          pushClientEvent('Tabs', 'Selected', `Tab ${title}`)
          setSelectedTab(index)
        }}
        data-testid={`${testId}-button`}
      >
        {title}
        <div className="arrow" />
      </StyledTabButton>
    </li>
  )
}

export default TabButton
