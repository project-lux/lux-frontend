import React from 'react'
import { Col, Row } from 'react-bootstrap'

import useTitle from '../../lib/hooks/useTitle'
import {
  advancedSearchTitles,
  scopeToTabTranslation,
  searchScope,
} from '../../config/searchTypes'
import { useGetFaqQuery } from '../../redux/api/cmsApi'
import {
  StyledFaqPage,
  StyledFaqPageHeader,
  StyledFaqGroupSection,
} from '../../styles/features/cms/FaqPage'
import FaqSideBar from '../cms/FaqSideBar'
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

const createGroupElems = (): JSX.Element[] =>
  ['Advanced Search Terms'].map((groupName, ind) => {
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
  })

const title = 'Frequently Asked Questions'

const AdvancedSearchConfig: React.FC = () => {
  const result = useGetFaqQuery()
  let groups: JSX.Element[] = []

  useTitle(title)

  if (result.isSuccess && result.data) {
    groups = createGroupElems()
  }

  return (
    <StyledFaqPage data-testid="faq-page">
      <StyledFaqPageHeader>
        <h1 data-testid="faq-page-header">{title}</h1>
      </StyledFaqPageHeader>
      <Row className="mx-0">
        <Col xs={12} sm={12} md={12} lg={3} className="side-column order-lg-2">
          <FaqSideBar />
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={9}
          className="d-xl-flex faq-body order-lg-1"
        >
          <div className="main-column flex-fill">{groups}</div>
        </Col>
      </Row>
    </StyledFaqPage>
  )
}

export default AdvancedSearchConfig
