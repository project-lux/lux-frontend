/* eslint-disable react/no-array-index-key */
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

import DetailedLinkContainer from './DetailedLinkContainer'

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
    <StyledEntityPageSection>
      <Row>
        <Col>
          <h2>About</h2>
        </Col>
      </Row>
      <dl>
        {titles !== null && <NamesContainer names={titles} showBreakline />}
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
        {types.length > 0 && (
          <LinkContainer
            content={types}
            label="Work Types"
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
        {production && (
          <ProductionEvent
            event={production}
            label="Creation"
            id="works-creation"
          />
        )}
        {about.length > 0 && (
          <DetailedLinkContainer
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
        {notes !== null && (
          <NotesContainer
            notes={notes}
            showBreakline
            id="works-notes-container"
          />
        )}
      </dl>
    </StyledEntityPageSection>
  )
}

export default About
