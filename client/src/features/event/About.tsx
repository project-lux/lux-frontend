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
import ExternalLink from '../common/ExternalLink'
import StyledHr from '../../styles/shared/Hr'
import ClassContainer from '../common/ClassContainer'

interface IProps {
  entity: IEntity
}

const About: React.FC<IProps> = ({ entity }) => {
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
  } = aboutData as Record<string, any>

  return (
    <div data-testid="about-event">
      <h2 data-testid="event-about-header">About {name}</h2>
      <dl>
        {names !== null && (
          <NamesContainer names={names} expandColumns length={5} showHeader />
        )}
        <ClassContainer
          label="Event Class"
          entityClass={entityClass}
          className="eventClassHr"
          hideBreaklineOnDesktop
          headerTitle="Event Class"
        />
        {agents.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Carried Out By</h3>
            <LinkContainer
              content={agents}
              itemSpacing="single"
              expandColumns
              id="event-agent-link-container"
            />
          </React.Fragment>
        )}
        {dates.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Date(s) of Event</h3>
            <StyledDataRow className="row" data-testid="event-date-container">
              <ExpandableList className="col-12">
                <TextValue values={dates} className="col-md-9" />
              </ExpandableList>
            </StyledDataRow>
          </React.Fragment>
        )}
        {locations.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Place of Event</h3>
            <LinkContainer
              content={locations}
              itemSpacing="single"
              expandColumns
              id="event-location-link-container"
            />
          </React.Fragment>
        )}
        {types.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Categorized As</h3>
            <LinkContainer
              content={types}
              itemSpacing="single"
              expandColumns
              id="event-types-link-container"
            />
          </React.Fragment>
        )}
        {identifiers.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Identifiers</h3>
            <IdentifiersList identifiers={identifiers} expandIdentiferColumn />
          </React.Fragment>
        )}
        {webPages.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Web Pages</h3>
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
          </React.Fragment>
        )}
        {part.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Part</h3>
            {part.map((p: IEventPart) =>
              Object.keys(p).map((key: string, ind: number) => (
                <div
                  className="row"
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
          </React.Fragment>
        )}
        {notes !== null && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Notes</h3>
            <NotesContainer notes={notes} expandColumns />
          </React.Fragment>
        )}
      </dl>
    </div>
  )
}

export default About
