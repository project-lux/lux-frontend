import React from 'react'

import LinkContainer from '../common/LinkContainer'
import NotesContainer from '../common/NotesContainer'
import NamesContainer from '../common/NamesContainer'
import PlaceParser from '../../lib/parse/data/PlaceParser'
import IPlace from '../../types/data/IPlace'
import WebPages from '../common/WebPages'
import StyledHr from '../../styles/shared/Hr'

interface IProps {
  entity: IPlace
}

const About: React.FC<IProps> = ({ entity }) => {
  const place = new PlaceParser(entity)
  const aboutData = place.getAboutData()

  if (aboutData === null) {
    return null
  }

  const { types, name, names, webPages, notes } = aboutData as Record<
    string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >

  return (
    <div data-testid="about-place">
      <h2 data-testid="place-page-about-header">About {name}</h2>
      <dl>
        {names !== null && (
          <NamesContainer names={names} expandColumns length={5} showHeader />
        )}
        {types.length > 0 && (
          <React.Fragment>
            <StyledHr width="100%" />
            <h3>Categorized As</h3>
            <LinkContainer
              content={types}
              expandColumns
              itemSpacing="single"
              id="place-types-link-container"
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
