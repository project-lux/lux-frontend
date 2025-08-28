import React from 'react'

import NamesContainer from '../common/NamesContainer'
import NotesContainer from '../common/NotesContainer'
import ConceptParser from '../../lib/parse/data/ConceptParser'
import IEntity from '../../types/data/IEntity'
import LinkContainer from '../common/LinkContainer'
import ClassContainer from '../common/ClassContainer'
import WebPages from '../common/WebPages'

interface IProps {
  entity: IEntity
}

const AboutPanel: React.FC<IProps> = ({ entity }) => {
  const concept = new ConceptParser(entity)
  const aboutData = concept.getAboutData()

  if (aboutData === null) {
    return null
  }

  const { name, names, entityClass, types, notes, influences, webPages } =
    aboutData as Record<
      string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >

  return (
    <div data-testid="about-concept">
      <h2 data-testid="concept-about-header">About {name}</h2>
      <dl>
        {names !== null && (
          <NamesContainer names={names} expandColumns length={5} />
        )}
        <ClassContainer
          label="Concept Class"
          entityClass={entityClass}
          className="conceptClassHr"
          hideBreaklineOnDesktop
        />
        {types.length > 0 && (
          <LinkContainer
            content={types}
            label="Categorized As"
            expandColumns
            itemSpacing="single"
            id="concept-types-link-container"
          />
        )}
        {influences.length > 0 && (
          <LinkContainer
            label="Component Terms"
            content={influences}
            expandColumns
            id="concept-influences-link-container"
          />
        )}
        <WebPages webPages={webPages} />
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
      </dl>
    </div>
  )
}

export default AboutPanel
