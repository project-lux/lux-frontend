/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Row, Col } from 'react-bootstrap'

import NotesContainer from '../common/NotesContainer'
import NamesContainer from '../common/NamesContainer'
import LinkContainer from '../common/LinkContainer'
import ProductionEvent from '../common/ProductionEvent'
import WorkParser from '../../lib/parse/data/WorkParser'
import IEntity from '../../types/data/IEntity'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import IdentifiersContainer from '../common/IdentifiersContainer'
import { IEventInfo } from '../../types/derived-data/events'
import { hasData } from '../../lib/parse/data/helper'
import SubjectOf from '../common/SubjectOf'
import { subjectOf, workContains } from '../../config/worksSearchTags'
import ApiAboutData from '../common/ApiAboutData'
import ClassContainer from '../common/ClassContainer'

import DetailedLinkContainer from './DetailedLinkContainer'
import AboutSubsection from './AboutSubsection'

interface IObject {
  entity: IEntity
}

const About: React.FC<IObject> = ({ entity }) => {
  const work = new WorkParser(entity)
  const aboutData = work.getAboutData()

  if (aboutData === null) {
    return (
      <StyledEntityPageSection>
        <Row>
          <Col>
            <h2>About</h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              There is no additional information available about this record.
              Please see the object record above, if available.
            </p>
          </Col>
        </Row>
      </StyledEntityPageSection>
    )
  }

  const {
    // shared
    about,
    entityClass,
    notes,
    identifiers,
    production,
    publications,
    represents,
    types,
    titles,
    // linguistic object specific
    partOf,
    languages,
  } = aboutData as Record<string, any>

  return (
    <StyledEntityPageSection className="row" data-testid="about-work">
      <Col xs={12}>
        <h2>About</h2>
      </Col>
      <Col xs={12}>
        <dl>
          {titles !== null && <NamesContainer names={titles} showBreakline />}
          <ClassContainer
            label="Work Class"
            entityClass={entityClass}
            hrClassName="workClassHr"
            textLabelClassName="col-md-3"
            textValueClassName="col-md-9"
          />
          {identifiers.length > 0 && (
            <IdentifiersContainer identifiers={identifiers} id="works" />
          )}
          {partOf.length > 0 && (
            <LinkContainer
              content={partOf}
              label="Part Of"
              id="works-part-of-link-container"
            />
          )}
          {entity._links && (
            <ApiAboutData
              providedLinks={entity._links}
              configuredLink={workContains}
            />
          )}
          {types.length > 0 && (
            <LinkContainer
              content={types}
              label="Categorized As"
              id="works-types-link-container"
            />
          )}
          {languages.length > 0 && (
            <LinkContainer
              content={languages}
              label="Language"
              id="works-languages-link-container"
            />
          )}
          {publications.length > 0 &&
            publications.map((publication: IEventInfo, ind: number) => (
              <ProductionEvent
                key={`publication_${ind}`}
                event={publication}
                label={
                  publication.label !== null ? publication.label : 'Publication'
                }
                id="works-publication"
              />
            ))}
          {production !== null && hasData(production) && (
            <ProductionEvent
              event={production}
              label="Creation"
              id="works-creation"
            />
          )}
          {about.length > 0 && (
            <AboutSubsection
              content={about}
              label="About"
              id="works-about-link-container"
            />
          )}
          {represents.length > 0 && (
            <DetailedLinkContainer
              content={represents}
              label="Depicts"
              id="works-represents-link-container"
            />
          )}
          <SubjectOf entity={entity} halLinkConfig={subjectOf} />
          {notes !== null && (
            <NotesContainer
              notes={notes}
              showBreakline
              id="works-notes-container"
            />
          )}
        </dl>
      </Col>
    </StyledEntityPageSection>
  )
}

export default About
