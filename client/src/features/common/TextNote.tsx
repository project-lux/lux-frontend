import React, { useState } from 'react'
import sanitizeHtml from 'sanitize-html'

import LanguageSuperscript from './LanguageSuperscript'

interface ITextNote {
  content: string
  id: string
  language?: string
  htmlContent?: string
  length?: number
}

const buttonStyle = {
  marginTop: '-0.3rem',
  padding: 0,
  fontWeight: 200,
  height: '24px',
  lineHeight: '24px',
}

const TextNote: React.FC<ITextNote> = ({
  content,
  id,
  language,
  htmlContent,
  length = 1250,
}) => {
  const [showLess, setShowLess] = useState(true)
  // This should hopefully never happen
  if (content === '' && htmlContent === undefined) {
    return null
  }
  const linkName = showLess ? 'Show All' : 'Show Less'
  const isHtml = htmlContent !== undefined || content.includes('<span class=')

  if (content.length < length || isHtml) {
    return (
      <div className="noteContainer" data-testid={`${id}-text-note`}>
        <div className="noteContent" style={{ whiteSpace: 'pre-line' }}>
          {isHtml ? (
            <React.Fragment>
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(htmlContent || content),
                }}
              />
              {language !== undefined && language !== '' && (
                <LanguageSuperscript
                  language={language}
                  className="contentHtml"
                  id="content-html-note"
                />
              )}
            </React.Fragment>
          ) : (
            <div>
              {content}{' '}
              {language !== undefined && language !== '' && (
                <LanguageSuperscript language={language} id="content-note" />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className="collapsableNoteContainer"
      data-testid={`${id}-collapsable-text-note`}
    >
      <p className="noteContent" style={{ whiteSpace: 'pre-line' }}>
        {showLess ? `${content.slice(0, length)}…` : content}
        {language !== undefined && language !== '' && (
          <LanguageSuperscript
            language={language}
            id="collapsable-note-content"
          />
        )}
        &nbsp;
        <button
          type="button"
          className="btn btn-link"
          style={buttonStyle}
          onClick={() => setShowLess(!showLess)}
        >
          {linkName}
        </button>
      </p>
    </div>
  )
}

export default TextNote
