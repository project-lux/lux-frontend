/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import MyCollectionParser from '../../lib/parse/data/MyCollectionParser'
import LinkContainer from '../common/LinkContainer'
import NotesContainer from '../common/NotesContainer'
import IEntity from '../../types/data/IEntity'
import NamesContainer from '../common/NamesContainer'
import WebPages from '../common/WebPages'
import IdentifiersList from '../common/IdentifiersList'

interface IProps {
  data: IEntity
}

const About: React.FC<IProps> = ({ data }) => {
  const agent = new MyCollectionParser(data)
  const aboutData = agent.getAboutData()

  if (aboutData === null) {
    return null
  }

  const { name, names, types, identifiers, notes, webPages } =
    aboutData as Record<string, any>

  return (
    <React.Fragment>
      <h2 data-testid="person-page-about-header">About {name}</h2>
      <dl className="about-person-and-group">
        {names !== null && (
          <NamesContainer names={names} expandColumns length={5} />
        )}
        {types.length > 0 && (
          <LinkContainer
            content={types}
            label="Categorized As"
            expandColumns
            itemSpacing="single"
            id="my-collection-types-link-container"
          />
        )}
        {identifiers.length > 0 && (
          <IdentifiersList identifiers={identifiers} expandIdentiferColumn />
        )}
        <WebPages webPages={webPages} />
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
      </dl>
    </React.Fragment>
  )
}

export default About
