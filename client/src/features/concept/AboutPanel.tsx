/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import NamesContainer from '../common/NamesContainer'
import NotesContainer from '../common/NotesContainer'
import ConceptParser from '../../lib/parse/data/ConceptParser'
import IEntity from '../../types/data/IEntity'
import LinkContainer from '../common/LinkContainer'
import ClassContainer from '../common/ClassContainer'
import StyledHr from '../../styles/shared/Hr'

interface IProps {
  entity: IEntity
}

const AboutPanel: React.FC<IProps> = ({ entity }) => {
  const concept = new ConceptParser(entity)
  const aboutData = concept.getAboutData()

  if (aboutData === null) {
    return null
  }

  const { name, names, entityClass, types, notes, influences } =
    aboutData as Record<
      string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any
    >

  return (
    <React.Fragment>
      <h2 data-testid="concept-about-header">About {name}</h2>
      <dl>
        <h3>Names</h3>
        {names !== null && (
          <NamesContainer names={names} expandColumns length={5} />
        )}
        <StyledHr width="100%" />
        <h3>Concept Class</h3>
        <ClassContainer
          label="Concept Class"
          entityClass={entityClass}
          className="conceptClassHr"
          hideBreaklineOnDesktop
        />
        <StyledHr width="100%" />
        <h3>Categroized As</h3>
        {types.length > 0 && (
          <LinkContainer
            content={types}
            // label="Categorized As"
            expandColumns
            itemSpacing="single"
            id="concept-types-link-container"
          />
        )}
        <StyledHr width="100%" />
        <h3>Component Terms</h3>
        <a href="#" className="mb-4">
          Sample Term
        </a>
        {influences.length > 0 && (
          <LinkContainer
            // label="Component Terms"
            content={influences}
            expandColumns
            id="concept-influences-link-container"
          />
        )}
        <StyledHr width="100%" />
        <h3>Notes</h3>
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
      </dl>
    </React.Fragment>
  )
}

export default AboutPanel
