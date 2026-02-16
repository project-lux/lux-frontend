import React from 'react'

import NamesContainer from '../common/NamesContainer'
import NotesContainer from '../common/NotesContainer'
import ConceptParser from '../../lib/parse/data/ConceptParser'
import IEntity from '../../types/data/IEntity'
import LinkContainer from '../common/LinkContainer'
import ClassContainer from '../common/ClassContainer'
import WebPages from '../common/WebPages'
import StyledHr from '../../styles/shared/Hr'

interface IProps {
  entity: IEntity
}

const About: React.FC<IProps> = ({ entity }) => {
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
          <NamesContainer names={names} expandColumns length={5} showHeader />
        )}
        <ClassContainer
          label="Concept Class"
          entityClass={entityClass}
          className="conceptClassHr"
          hideBreaklineOnDesktop
          headerTitle="Concept Class"
        />
        {types.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Categorized As</h3>
            <LinkContainer
              content={types}
              expandColumns
              itemSpacing="single"
              id="concept-types-link-container"
            />
          </React.Fragment>
        )}
        {influences.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Component Terms</h3>
            <LinkContainer
              label="Component Terms"
              content={influences}
              expandColumns
              id="concept-influences-link-container"
            />
          </React.Fragment>
        )}
        <WebPages webPages={webPages} />
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
