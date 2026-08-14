import React, { useState } from 'react'
import sanitizeHtml from 'sanitize-html'
import styled from 'styled-components'

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

const collapsedHtmlStyle = {
  maxHeight: '7.5rem',
  overflow: 'hidden',
}

const collapsedParagraphStyle = {
  ...collapsedHtmlStyle,
  display: 'block',
}

const StyledHtmlDiv = styled.div`
  line-height: 24px;
`

const TextNote: React.FC<ITextNote> = ({
  content,
  id,
  language,
  htmlContent,
  length = 250,
}) => {
  const [showLess, setShowLess] = useState(true)
  // This should hopefully never happen
  if (content === '' && htmlContent === undefined) {
    return null
  }

  const sanitizedContent = sanitizeHtml(htmlContent || content)
  const linkName = showLess ? 'Show All' : 'Show Less'
  const isHtml = htmlContent !== undefined || content.includes('<span class=')
  const textOnlyContent = isHtml
    ? sanitizeHtml(sanitizedContent, {
        allowedTags: [],
        allowedAttributes: {},
      })
    : content
  const shouldCollapse = textOnlyContent.length > length
  const hasLanguage = language !== undefined && language !== ''
  let containerClassName = shouldCollapse
    ? 'collapsableNoteContainer'
    : 'noteContainer'
  let dataTestId = shouldCollapse
    ? `${id}-collapsable-text-note`
    : `${id}-text-note`
  const contentClassName = isHtml
    ? 'noteContentHtmlDiv'
    : 'noteContentParagraph'
  const languageId = isHtml
    ? 'collapsable-content-html-note'
    : 'collapsable-note-content'

  return (
    <div className={containerClassName} data-testid={dataTestId}>
      {isHtml ? (
        <div className={contentClassName} style={{ whiteSpace: 'pre-line' }}>
          <StyledHtmlDiv
            style={shouldCollapse && showLess ? collapsedHtmlStyle : undefined}
            dangerouslySetInnerHTML={{
              __html: sanitizedContent,
            }}
          />
          {hasLanguage && (
            <LanguageSuperscript
              language={language}
              className="contentHtml"
              id={languageId}
            />
          )}
          {shouldCollapse && (
            <React.Fragment>
              &nbsp;
              <button
                type="button"
                className="btn btn-link"
                style={buttonStyle}
                onClick={() => setShowLess(!showLess)}
              >
                {linkName}
              </button>
            </React.Fragment>
          )}
        </div>
      ) : (
        <p className={contentClassName} style={{ whiteSpace: 'pre-line' }}>
          <span
            style={
              shouldCollapse && showLess ? collapsedParagraphStyle : undefined
            }
          >
            {content}
          </span>
          {hasLanguage && (
            <LanguageSuperscript language={language} id={languageId} />
          )}
          {shouldCollapse && (
            <React.Fragment>
              &nbsp;
              <button
                type="button"
                className="btn btn-link"
                style={buttonStyle}
                onClick={() => setShowLess(!showLess)}
              >
                {linkName}
              </button>
            </React.Fragment>
          )}
        </p>
      )}
    </div>
  )
}

export default TextNote
