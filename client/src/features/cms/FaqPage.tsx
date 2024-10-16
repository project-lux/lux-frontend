/* eslint-disable react/no-danger */
import React from 'react'
import { Col, Row } from 'react-bootstrap'

import { FaqGroupKey, faqGroupLabels } from '../../config/cms'
// import useTitle from '../../lib/hooks/useTitle'
import { IFaq, IFaqGroup } from '../../lib/parse/cms/Faqs'
import { FaqParser } from '../../lib/parse/cms/FaqParser'
import { processHtml } from '../../lib/parse/cms/helper'
import { useGetFaqQuery } from '../../redux/api/cmsApi'
import {
  StyledFaqPage,
  StyledFaqPageHeader,
  StyledFaqGroupSection,
} from '../../styles/features/cms/FaqPage'
import OpenGraphHelmet from '../common/OpenGraphHelmet'

import FaqSideBar from './FaqSideBar'

const createAccordionItem = (faq: IFaq, parentId: string): JSX.Element => {
  const title2 = faq.title
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^A-Za-z0-9-]+/g, '')
  const headingId = `heading-${title2}`
  const collapseId = `collapse-${title2}`

  return (
    <div
      className="accordion-item"
      key={title2}
      data-testid={`${title2}-accordion-item`}
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
          {faq.title}
        </button>
      </h3>
      <div
        id={collapseId}
        className="accordion-collapse collapse"
        aria-labelledby={headingId}
        data-bs-parent={`#${parentId}`}
        dangerouslySetInnerHTML={{ __html: processHtml(faq.body) }}
      />
    </div>
  )
}

const createAccordion = (faqGroup: IFaqGroup): JSX.Element => {
  const id = `accordion-${faqGroup.key}`

  const items = faqGroup.faqs.map((faq) => {
    const item = createAccordionItem(faq, id)

    return item
  })

  return (
    <div className="accordion" id={id}>
      {items}
    </div>
  )
}

const createGroupElemId = (groupKey: FaqGroupKey): string => `group-${groupKey}`

const scrollToTop = (): void => {
  window.scrollTo(0, 0)
}

const createGroupElems = (faqGroups: IFaqGroup[]): JSX.Element[] =>
  faqGroups.map((group, ind) => {
    const accordion = createAccordion(group)
    const groupKey = group.key

    return (
      <React.Fragment key={groupKey}>
        <StyledFaqGroupSection
          id={createGroupElemId(groupKey)}
          data-testid={`faq-page-body-${ind}`}
        >
          <h2 id="faq-header">{faqGroupLabels[groupKey]}</h2>
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

interface IProps {
  groupKeys: FaqGroupKey[]
}

const title = 'Frequently Asked Questions'

/**
 * FAQ page with content rendered from CMS data.
 * @param {FaqGroupKey[]} groupKeys list of nested routes in the FAQ page
 * @returns {JSX.Element}
 */
const FaqPage: React.FC<IProps> = ({ groupKeys }) => {
  const result = useGetFaqQuery()
  let groups: JSX.Element[] = []

  // useTitle(title)

  if (result.isSuccess && result.data) {
    const parser = new FaqParser(result.data)
    const faqs = parser.getFaqs(groupKeys)

    groups = createGroupElems(faqs)
  }

  return (
    <StyledFaqPage data-testid="faq-page">
      <OpenGraphHelmet title={title} />
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

export default FaqPage
