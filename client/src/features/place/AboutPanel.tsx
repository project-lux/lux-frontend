import React from 'react'

import LinkContainer from '../common/LinkContainer'
import NotesContainer from '../common/NotesContainer'
import NamesContainer from '../common/NamesContainer'
import PlaceParser from '../../lib/parse/data/PlaceParser'
import IPlace from '../../types/data/IPlace'
import WebPages from '../common/WebPages'

interface IProps {
  entity: IPlace
}

const AboutPanel: React.FC<IProps> = ({ entity }) => {
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
          <NamesContainer names={names} expandColumns length={5} />
        )}
        {types.length > 0 && (
          <LinkContainer
            content={types}
            label="Categorized As"
            expandColumns
            itemSpacing="single"
            id="place-types-link-container"
          />
        )}
        <WebPages webPages={webPages} />
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
      </dl>
    </div>
  )
}

export default AboutPanel
