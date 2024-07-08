/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Col, Row } from 'react-bootstrap'

import NamesContainer from '../common/NamesContainer'
import NotesContainer from '../common/NotesContainer'
import LinkContainer from '../common/LinkContainer'
import ObjectParser from '../../lib/parse/data/ObjectParser'
import StyledEntityPageSection from '../../styles/shared/EntityPageSection'
import { IEventInfo } from '../../types/derived-data/events'
import ProductionEvent from '../common/ProductionEvent'
import IdentifiersContainer from '../common/IdentifiersContainer'
import { hasData } from '../../lib/parse/data/helper'
import TextContainer from '../common/TextContainer'
import TextValue from '../common/TextValue'
import StyledHr from '../../styles/shared/Hr'

import DimensionsContainer from './DimensionsContainer'
import RelatedEvents from './RelatedEvents'

interface IObject {
  data: any
}

const About: React.FC<IObject> = ({ data }) => {
  const object = new ObjectParser(data)

  const aboutData = object.getAboutData()

  if (aboutData === null) {
    return null
  }

  const {
    entityClass,
    types,
    titles,
    identifiers,
    publicationEvents,
    productionEvent,
    encounteredEvent,
    materials,
    notes,
    dimensions,
    exhibitionDescription,
  } = aboutData as Record<string, any>

  return (
    <StyledEntityPageSection>
      <Row>
        <Col>
          <h2>About</h2>
        </Col>
      </Row>
      <dl>
        {titles !== null && (
          <React.Fragment>
            <NamesContainer names={titles} showBreakline />
          </React.Fragment>
        )}
        <TextContainer label="Object Class" textLabelClassName="col-md-3">
          <TextValue values={[entityClass]} className="col-md-9" />
          <StyledHr />
        </TextContainer>
        {identifiers.length > 0 && (
          <IdentifiersContainer identifiers={identifiers} id="objects" />
        )}
        {types.length > 0 && (
          <LinkContainer
            content={types}
            label="Categorized As"
            id="object-types-link-container"
          />
        )}
        {materials.length > 0 && (
          <LinkContainer
            content={materials}
            label="Materials"
            id="object-materials-link-container"
          />
        )}
        {dimensions.length > 0 && (
          <DimensionsContainer dimensions={dimensions} />
        )}
        {productionEvent !== null && hasData(productionEvent) && (
          <ProductionEvent
            event={productionEvent}
            label="Creation"
            id="object-production"
          />
        )}
        {encounteredEvent.length > 0 &&
          encounteredEvent.map((encounter: IEventInfo, ind: number) => {
            if (encounter !== null) {
              return (
                <ProductionEvent
                  key={`encounter_${ind}`}
                  event={encounter}
                  label="Encountered"
                  id="object-encounter"
                />
              )
            }
          })}
        {publicationEvents.length > 0 &&
          publicationEvents.map((publicationEvent: IEventInfo, ind: number) => (
            <ProductionEvent
              key={`publication_${ind}`}
              event={publicationEvent}
              label={
                publicationEvent.label !== null
                  ? publicationEvent.label
                  : 'Publication'
              }
              id="object-publication"
            />
          ))}
        {notes !== null && (
          <NotesContainer
            notes={notes}
            showBreakline
            id="objects-notes-container"
          />
        )}
        {exhibitionDescription !== null && (
          <NotesContainer
            notes={exhibitionDescription}
            showBreakline
            id="exhibitions-notes-container"
          />
        )}
        <RelatedEvents entity={data} />
      </dl>
    </StyledEntityPageSection>
  )
}

export default About
