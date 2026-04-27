import React, { type JSX } from 'react'

import {
  advancedSearchTitles,
  scopeToTabTranslation,
  searchScope,
} from '../../config/searchTypes'
import { StyledFaqGroupSection } from '../../styles/features/cms/FaqPage'
import config from '../../config/config'

const createAccordionItem = (scope: string): JSX.Element => {
  const headingId = `heading-${scope}`
  const collapseId = `collapse-${scope}`
  const advancedSearchName = advancedSearchTitles[scopeToTabTranslation[scope]]

  return (
    <div
      className="accordion-item"
      key={scope}
      data-testid={`${scope}-accordion-item`}
    >
      <h3 className="accordion-header" id={headingId}>
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseId}`}
          aria-expanded="false"
          aria-controls={collapseId}
        >
          {advancedSearchName}
        </button>
      </h3>
      <div
        id={collapseId}
        className="accordion-collapse collapse"
        aria-labelledby={headingId}
      >
        <ul>
          {Object.keys(config.advancedSearch.terms[scope])
            .sort((a, b) =>
              config.advancedSearch.terms[scope][a].label.localeCompare(
                config.advancedSearch.terms[scope][b].label,
              ),
            )
            .map((term) => {
              return (
                <React.Fragment key={term}>
                  <li>
                    <b>{config.advancedSearch.terms[scope][term].label}</b>{' '}
                    {' - '}
                    {config.advancedSearch.terms[scope][term].helpText}
                  </li>
                </React.Fragment>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

const createAccordion = (groupName: string): JSX.Element => {
  const id = `accordion-${groupName}`

  const items = Object.values(searchScope).map((scope) => {
    const item = createAccordionItem(scope)

    return item
  })

  return (
    <div className="accordion" id={id}>
      {items}
    </div>
  )
}

const createGroupElemId = (scope: string): string => `group-${scope}`

const scrollToTop = (): void => {
  window.scrollTo(0, 0)
}

const AdvancedSearchTermsGroupElems: React.FC = () => (
  <React.Fragment>
    {['Advanced Search Terms'].map((groupName, ind) => {
      const accordion = createAccordion(groupName)
      const groupKey = groupName

      return (
        <React.Fragment key={groupKey}>
          <StyledFaqGroupSection
            id={createGroupElemId(groupName)}
            data-testid={`faq-page-body-${ind}`}
          >
            <h2 id="faq-header">Advanced Search Terms</h2>
            {accordion}
          </StyledFaqGroupSection>
          <div className="d-flex justify-content-end">
            <button type="button" className="back-to-top" onClick={scrollToTop}>
              Back to Top
            </button>
          </div>
        </React.Fragment>
      )
    })}
  </React.Fragment>
)

export default AdvancedSearchTermsGroupElems
