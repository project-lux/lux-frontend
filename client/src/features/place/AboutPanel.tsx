import React from 'react'

import LinkContainer from '../common/LinkContainer'
import NotesContainer from '../common/NotesContainer'
import NamesContainer from '../common/NamesContainer'
import TextValue from '../common/TextValue'
import PlaceParser from '../../lib/parse/data/PlaceParser'
import IPlace from '../../types/data/IPlace'
import ExternalLink from '../common/ExternalLink'
import StyledDataRow from '../../styles/shared/DataRow'
import ExpandableList from '../common/ExpandableList'
import TextLabel from '../common/TextLabel'

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
            label="Categorized As"
            expandColumns
            itemSpacing="single"
            id="place-types-link-container"
          />
        )}
        {webPages.length > 0 && (
          <StyledDataRow className="row">
            <TextLabel label="Web Pages" className="col-md-12" />
            <ExpandableList className="col-md-12">
              <TextValue
                values={webPages.map((url: string, ind: number) => (
                  <ExternalLink
                    key={url}
                    url={url}
                    name={url}
                    id={`place-web-pages-${ind}`}
                  />
                ))}
              />
            </ExpandableList>
          </StyledDataRow>
        )}
        {notes !== null && <NotesContainer notes={notes} expandColumns />}
      </dl>
    </React.Fragment>
  )
}

export default AboutPanel
