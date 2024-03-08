import React from 'react'
import { HashLink } from 'react-router-hash-link'
import { useLocation } from 'react-router-dom'

import { FaqGroupKey, faqGroupLabels } from '../../config/cms'
import StyledFaqSideBar from '../../styles/features/cms/FaqSideBar'

/**
 * Menu to be displayed on FAQ page.
 * @returns {JSX.Element}
 */
const FaqSideBar: React.FC = () => {
  const { pathname, search } = useLocation()
  const prevPath = `${pathname}${search}`
  return (
    <StyledFaqSideBar className="sidebar" data-testid="faq-page-side-bar">
      <HashLink
        to="/content/faq#faq-header"
        state={{
          prevPath,
          targetName: faqGroupLabels[FaqGroupKey.GENERAL_INFO],
        }}
      >
        {faqGroupLabels[FaqGroupKey.GENERAL_INFO]}
      </HashLink>
      <HashLink
        to="/content/simple-search#faq-header"
        state={{
          prevPath,
          targetName: faqGroupLabels[FaqGroupKey.SIMPLE_SEARCH],
        }}
      >
        {faqGroupLabels[FaqGroupKey.SIMPLE_SEARCH]}
      </HashLink>
      <HashLink
        to="/content/advanced-search#faq-header"
        state={{
          prevPath,
          targetName: faqGroupLabels[FaqGroupKey.ADVANCED_SEARCH],
        }}
      >
        {faqGroupLabels[FaqGroupKey.ADVANCED_SEARCH]}
      </HashLink>
      <HashLink
        to="/content/result-views#faq-header"
        state={{
          prevPath,
          targetName: faqGroupLabels[FaqGroupKey.RESULT_VIEWS],
        }}
      >
        {faqGroupLabels[FaqGroupKey.RESULT_VIEWS]}
      </HashLink>
      <HashLink
        to="/content/item-records#faq-header"
        state={{
          prevPath,
          targetName: faqGroupLabels[FaqGroupKey.ITEM_RECORDS],
        }}
      >
        {faqGroupLabels[FaqGroupKey.ITEM_RECORDS]}
      </HashLink>
      <HashLink
        to="/content/access-to-collections#faq-header"
        state={{
          prevPath,
          targetName: faqGroupLabels[FaqGroupKey.ACCESS_TO_COLLECTIONS],
        }}
      >
        {faqGroupLabels[FaqGroupKey.ACCESS_TO_COLLECTIONS]}
      </HashLink>
      <HashLink
        to="/content/rights-info#faq-header"
        state={{
          prevPath,
          targetName: faqGroupLabels[FaqGroupKey.RIGHTS_USAGE],
        }}
      >
        {faqGroupLabels[FaqGroupKey.RIGHTS_USAGE]}
      </HashLink>
    </StyledFaqSideBar>
  )
}

export default FaqSideBar
