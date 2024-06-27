/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import ExpandableList from '../common/ExpandableList'
import LinkContainer from '../common/LinkContainer'
import TextValue from '../common/TextValue'
import NotesContainer from '../common/NotesContainer'
import EventParser from '../../lib/parse/data/EventParser'
import IEntity from '../../types/data/IEntity'
import NamesContainer from '../common/NamesContainer'
import TextLabel from '../common/TextLabel'
import RecordLink from '../common/RecordLink'
import StyledDataRow from '../../styles/shared/DataRow'
import { IEventPart } from '../../types/derived-data/events'
import IdentifiersList from '../common/IdentifiersList'
import TextContainer from '../common/TextContainer'
import ExternalLink from '../common/ExternalLink'

interface IProps {
  entity: IEntity
}

const AboutPanel: React.FC<IProps> = ({ entity }) => {
  const event = new EventParser(entity)
  const aboutData = event.getAboutData()

  if (aboutData === null) {
    return null
  }

  const {
    name,
    names,
    entityClass,
    agents,
    dates,
    types,
    locations,
    identifiers,
    webPages,
    notes,
    part,
  } = aboutData as Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >

  return (
    <React.Fragment>
      <h2 data-testid="event-about-header">About {name}</h2>
      <dl>
        {names !== null && (
          <NamesContainer names={names} expandColumns length={5} />
        )}
        <TextContainer label="Event Class">
          <TextValue values={[entityClass]} />
        </TextContainer>
        <LinkContainer
          label="Carried Out By"
          content={agents}
          itemSpacing="single"
          expandColumns
          id="event-agent-link-container"
        />
        {dates.length > 0 && (
          <StyledDataRow className="row" data-testid="event-date-container">
            <TextLabel label="Dates" className="col-12" />
            <ExpandableList className="col-12">
              <TextValue values={dates} className="col-md-9" />
            </ExpandableList>
          </StyledDataRow>
        )}
        <LinkContainer
          label="Took Place At"
          content={locations}
          itemSpacing="single"
          expandColumns
          id="event-location-link-container"
        />
        <LinkContainer
          label="Categorized As"
          content={types}
          itemSpacing="single"
          expandColumns
          id="event-types-link-container"
        />
        {identifiers.length > 0 && (
          <IdentifiersList identifiers={identifiers} expandIdentiferColumn />
        )}
        {webPages.length > 0 && (
          <TextContainer label="Web Pages">
            <TextValue
              values={webPages.map(
                (webPage: { content: string; link: string }, ind: number) => (
                  <ExternalLink
                    key={webPage.link}
                    url={webPage.link}
                    name={
                      webPage.content !== '' ? webPage.content : webPage.link
                    }
                    id={`event-web-page-${ind}`}
                  />
                ),
              )}
            />
          </TextContainer>
        )}
        {part.length > 0 &&
          part.map((p: IEventPart) =>
            Object.keys(p).map((key: string, ind: number) => (
              <div
                className="row"
                // eslint-disable-next-line react/no-array-index-key
                key={`${key}_${ind}`}
                data-testid={`event-part-container-${ind}`}
              >
                <TextLabel label={key} className="col-12" />
                <div className="col-12">
                  {p[key].transfer.map((title: string) => (
                    <RecordLink key={title} url={title} />
                  ))}
                  <br />
                  {p[key].date.map((d: string) => d)}
                </div>
              </div>
            )),
          )}
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
      </dl>
    </React.Fragment>
  )
}

export default AboutPanel
