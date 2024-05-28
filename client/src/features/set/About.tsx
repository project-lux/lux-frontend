/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Row, Col } from 'react-bootstrap'

import NotesContainer from '../common/NotesContainer'
import LinkContainer from '../common/LinkContainer'
import NamesContainer from '../common/NamesContainer'
import SetParser from '../../lib/parse/data/SetParser'
import ProductionEvent from '../common/ProductionEvent'
import IEntity from '../../types/data/IEntity'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { IEventInfo } from '../../types/derived-data/events'
import IdentifiersContainer from '../common/IdentifiersContainer'
import DetailedLinkContainer from '../works/DetailedLinkContainer'

interface IObject {
  data: IEntity
}

const About: React.FC<IObject> = ({ data }) => {
  const setParser = new SetParser(data)
  const aboutData = setParser.getAboutData()

  if (aboutData === null) {
    return null
  }

  const {
    names,
    itemType,
    identifiers,
    setCreationEvent,
    about,
    represents,
    notes,
    usedFor,
    sourceObjectCreationEvent,
  } = aboutData as Record<string, any>

  return (
    <StyledEntityPageSection>
      <Row>
        <Col>
          <h2>About</h2>
        </Col>
      </Row>
      <dl>
        {names !== null && <NamesContainer names={names} showBreakline />}
        {itemType.length > 0 && (
          <React.Fragment>
            <LinkContainer
              content={itemType}
              label="Types"
              id="set-types-link-container"
            />
          </React.Fragment>
        )}
        {identifiers.length > 0 && (
          <IdentifiersContainer identifiers={identifiers} id="sets" />
        )}
        {usedFor.length > 0 &&
          usedFor.map((publication: IEventInfo, ind: number) => (
            <ProductionEvent
              key={`used_for_${ind}`}
              event={publication}
              label={
                publication.label !== null ? publication.label : 'Used For'
              }
              id="set-publication"
            />
          ))}
        {sourceObjectCreationEvent !== null && (
          <ProductionEvent
            event={sourceObjectCreationEvent}
            label="Creation of Archival Objects"
            id="set-source-object-creation"
          />
        )}
        {setCreationEvent !== null && (
          <ProductionEvent
            event={setCreationEvent}
            label="Creation of Archive"
            id="set-creation"
          />
        )}
        {notes !== null && <NotesContainer notes={notes} showBreakline />}
        {about.length > 0 && (
          <React.Fragment>
            <DetailedLinkContainer
              content={about}
              label="About"
              id="set-about-link-container"
            />
          </React.Fragment>
        )}
        {represents.length > 0 && (
          <React.Fragment>
            <DetailedLinkContainer
              content={represents}
              label="Depicts"
              id="set-depicts-link-container"
            />
          </React.Fragment>
        )}
      </dl>
    </StyledEntityPageSection>
  )
}

export default About
