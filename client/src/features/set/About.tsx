/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { isNull } from 'lodash'

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
import { useGetSearchRelationshipQuery } from '../../redux/api/ml_api'
import { events } from '../../config/setsSearchTags'

interface IObject {
  entity: IEntity
}

const About: React.FC<IObject> = ({ entity }) => {
  const setParser = new SetParser(entity)
  const aboutData = setParser.getAboutData()
  const eventHalLink = setParser.getHalLink(events.searchTag)
  let eventData: Array<string> = []

  const { data, isSuccess } = useGetSearchRelationshipQuery(
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      uri: eventHalLink!,
    },
    {
      skip: isNull(eventHalLink),
    },
  )

  if (aboutData === null) {
    return null
  }

  if (isSuccess && data) {
    eventData = data.orderedItems.map((item) => item.id)
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
        {eventData.length > 0 && (
          <LinkContainer
            content={eventData}
            label={events.title}
            id="set-types-link-container"
          />
        )}
      </dl>
    </StyledEntityPageSection>
  )
}

export default About
