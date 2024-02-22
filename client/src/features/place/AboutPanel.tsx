import React from 'react'

import LinkContainer from '../common/LinkContainer'
import NotesContainer from '../common/NotesContainer'
import NamesContainer from '../common/NamesContainer'
import TextValue from '../common/TextValue'
import TextContainer from '../common/TextContainer'
import PlaceParser from '../../lib/parse/data/PlaceParser'
import IPlace from '../../types/data/IPlace'

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
    <React.Fragment>
      <h2 data-testid="place-page-about-header">About {name}</h2>
      <dl>
        {names !== null && (
          <NamesContainer names={names} expandColumns length={5} />
        )}
        {types.length > 0 && (
          <LinkContainer
            content={types}
            label="Types"
            expandColumns
            itemSpacing="single"
            id="place-types-link-container"
          />
        )}
        {webPages.length > 0 && (
          <TextContainer label="Web Pages">
            <TextValue
              values={webPages.map((url: string, ind: number) => (
                <a
                  target="_new"
                  key={url}
                  href={url}
                  data-testid={`place-web-pages-${ind}`}
                >
                  {url}
                </a>
              ))}
            />
          </TextContainer>
        )}
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
      </dl>
    </React.Fragment>
  )
}

export default AboutPanel
