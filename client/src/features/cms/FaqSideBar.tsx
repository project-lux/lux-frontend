import React from 'react'
import { NavLink } from 'react-router-dom'

import { FaqGroupKey, faqGroupLabels } from '../../config/cms'
import StyledSideBar from '../../styles/features/cms/ContentPageSideBar'

/**
 * Menu to be displayed on FAQ page.
 * @returns {JSX.Element}
 */
const FaqSideBar: React.FC = () => (
  <StyledSideBar className="sidebar" data-testid="faq-page-side-bar">
    <NavLink to="/content/faq">
      {faqGroupLabels[FaqGroupKey.GENERAL_INFO]}
    </NavLink>
    <NavLink to="/content/simple-search">
      {faqGroupLabels[FaqGroupKey.SIMPLE_SEARCH]}
    </NavLink>
    <NavLink to="/content/advanced-search">
      {faqGroupLabels[FaqGroupKey.ADVANCED_SEARCH]}
    </NavLink>
    <NavLink to="/content/result-views">
      {faqGroupLabels[FaqGroupKey.RESULT_VIEWS]}
    </NavLink>
    <NavLink to="/content/item-records">
      {faqGroupLabels[FaqGroupKey.ITEM_RECORDS]}
    </NavLink>
  </StyledSideBar>
)

export default FaqSideBar
