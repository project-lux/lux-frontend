/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'

import PersonAndGroupParser from '../../lib/parse/data/PersonAndGroupParser'
import LinkContainer from '../common/LinkContainer'
import NotesContainer from '../common/NotesContainer'
import IEntity from '../../types/data/IEntity'
import TextValue from '../common/TextValue'
import NamesContainer from '../common/NamesContainer'
import TextContainer from '../common/TextContainer'
import ExternalLink from '../common/ExternalLink'

import Dates from './Dates'
import Activity from './Activity'

interface IProps {
  data: IEntity
}

const About: React.FC<IProps> = ({ data }) => {
  const agent = new PersonAndGroupParser(data)
  const aboutData = agent.getAboutData()

  if (aboutData === null) {
    return null
  }

  const {
    // person specific
    birthDate,
    birthPlace,
    deathDate,
    deathPlace,
    // group specific
    formationDate,
    formationPlace,
    formedBy,
    dissolutionDate,
    dissolutionPlace,
    dissolvedBy,
    residence,
    // shared
    classifiedAs,
    entityClass,
    names,
    memberOf,
    professionalActivity,
    webPages,
    notes,
  } = aboutData as Record<string, any>

  return (
    <React.Fragment>
      <dl className="about-person-and-group">
        {names !== null && (
          <NamesContainer names={names} expandColumns length={5} />
        )}
        <TextContainer label="Person or Group Class">
          <TextValue values={[entityClass]} />
        </TextContainer>
        <Dates
          date={birthDate}
          place={birthPlace}
          dateLabel="Birth"
          placeLabel="Birth Place"
          id="person-born"
        />
        <Dates
          date={deathDate}
          place={deathPlace}
          dateLabel="Death"
          placeLabel="Death Place"
          id="person-died"
        />
        <Dates
          date={formationDate}
          place={formationPlace}
          dateLabel="Formation Date"
          placeLabel="Formation Place"
          id="group-formed"
        />
        <Dates
          date={dissolutionDate}
          place={dissolutionPlace}
          dateLabel="Dissolution Date"
          placeLabel="Dissolution Place"
          id="group-dissolved"
        />
        <LinkContainer
          label="Formed By"
          content={formedBy}
          expandColumns
          itemSpacing="single"
          id="group-formed-by-links-container"
        />
        <LinkContainer
          label="Dissolved By"
          content={dissolvedBy}
          expandColumns
          id="group-dissolved-by-links-container"
        />
        {classifiedAs.length > 0 &&
          classifiedAs.map((obj: { [key: string]: Array<string> }) =>
            Object.keys(obj).map((key: string, ind: number) => (
              <LinkContainer
                key={key}
                content={obj[key]}
                label={key}
                itemSpacing="single"
                length={5}
                expandColumns
                id={`classified-as-links-container-${ind}`}
              />
            )),
          )}
        <LinkContainer
          label="Member Of"
          content={memberOf}
          expandColumns
          itemSpacing="single"
          id="member-of-links-container"
        />
        <LinkContainer
          label="Residence"
          content={residence}
          expandColumns
          itemSpacing="single"
          rowClassName="mb-2"
          id="group-residence-links-container"
        />
        {professionalActivity.length > 0 && (
          <Activity data={professionalActivity} />
        )}
        {webPages.length > 0 && (
          <TextContainer label="Web Pages">
            <TextValue
              values={webPages.map((url: string, ind: number) => (
                <ExternalLink
                  key={url}
                  url={url}
                  name={url}
                  id={`person-group-web-page-${ind}`}
                />
              ))}
            />
          </TextContainer>
        )}
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
      </dl>
    </React.Fragment>
  )
}

export default About
