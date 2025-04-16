import React from 'react'
import { HashLink } from 'react-router-hash-link'

import { FaqGroupKey, faqGroupLabels } from '../../config/cms'
import StyledFaqSideBar from '../../styles/features/cms/FaqSideBar'

/**
 * Menu to be displayed on FAQ page.
 * @returns {JSX.Element}
 */
const FaqSideBar: React.FC = () => (
  <StyledFaqSideBar className="sidebar" data-testid="faq-page-side-bar">
    <HashLink to="/content/faq#faq-header">
      {faqGroupLabels[FaqGroupKey.GENERAL_INFO]}
    </HashLink>
    <HashLink to="/content/simple-search#faq-header">
      {faqGroupLabels[FaqGroupKey.SIMPLE_SEARCH]}
    </HashLink>
    <HashLink to="/content/advanced-search#faq-header">
      {faqGroupLabels[FaqGroupKey.ADVANCED_SEARCH]}
    </HashLink>
    <HashLink to="/content/result-views#faq-header">
      {faqGroupLabels[FaqGroupKey.RESULT_VIEWS]}
    </HashLink>
    <HashLink to="/content/item-records#faq-header">
      {faqGroupLabels[FaqGroupKey.ITEM_RECORDS]}
    </HashLink>
  </StyledFaqSideBar>
)

export default FaqSideBar
