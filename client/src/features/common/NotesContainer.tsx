import React from 'react'

import { getColumnWidth } from '../../lib/util/ui'
import StyledHr from '../../styles/shared/Hr'
import {
  IContentWithLanguage,
  INoteContent,
} from '../../types/IContentWithLanguage'

import ExpandableList from './ExpandableList'
import TextLabel from './TextLabel'
import TextNote from './TextNote'
import TextValue from './TextValue'

interface INotes {
  notes: IContentWithLanguage
  id?: string
  showBreakline?: boolean
  expandColumns?: boolean
  labelTooltipText?: string
}

const NotesContainer: React.FC<INotes> = ({
  notes,
  id = 'notes-container',
  showBreakline,
  expandColumns = false,
  labelTooltipText = '',
}) => {
  const [textValueWidth, textLabelWidth] = getColumnWidth(expandColumns)

  const formatTextNote = (noteData: Array<INoteContent>): JSX.Element[] =>
    // eslint-disable-next-line
    noteData.map((note, ind) => <TextNote key={ind} content={note.content} id={`${id}-${ind}`} language={note.language} htmlContent={note._content_html} />)

  const length = 20

  return (
    <React.Fragment>
      {Object.keys(notes).map((noteLabel: string, ind: number) => {
        const formattedNotes = formatTextNote(notes[noteLabel])

        return (
          <div className="row" key={noteLabel} data-testid={`${id}-${ind}`}>
            <TextLabel
              className={textLabelWidth}
              label={noteLabel}
              tooltipText={labelTooltipText}
            />
            <ExpandableList className={textValueWidth}>
              <TextValue
                values={formattedNotes}
                className={
                  formattedNotes.length > length ? 'col-md-12' : textValueWidth
                }
              />
            </ExpandableList>
            {showBreakline && <StyledHr />}
          </div>
        )
      })}
    </React.Fragment>
  )
}

export default NotesContainer
