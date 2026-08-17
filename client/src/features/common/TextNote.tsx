import React, { useLayoutEffect, useRef, useState } from 'react'
import sanitizeHtml from 'sanitize-html'
import styled from 'styled-components'

import theme from '../../styles/theme'

import LanguageSuperscript from './LanguageSuperscript'

interface ITextNote {
  content: string
  id: string
  language?: string
  htmlContent?: string
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
  color: ${theme.color.black};
  letter-spacing: 0;
  font-size: ${theme.font.mobile.bodyLight.size};
  line-height: ${theme.font.mobile.bodyLight.lineHeight};
  font-weight: ${theme.font.mobile.bodyLight.weight};

  @media (min-width: ${theme.breakpoints.md}px) {
    font-size: ${theme.font.desktop.bodyLight.size};
    line-height: ${theme.font.desktop.bodyLight.lineHeight};
    font-weight: ${theme.font.desktop.bodyLight.weight};
  }
`

const TextNote: React.FC<ITextNote> = ({
  content,
  id,
  language,
  htmlContent,
}) => {
  const [showLess, setShowLess] = useState(true)
  const [hasOverflow, setHasOverflow] = useState(false)
  const htmlContentRef = useRef<HTMLDivElement>(null)
  const paragraphContentRef = useRef<HTMLSpanElement>(null)

  const sanitizedContent = sanitizeHtml(htmlContent || content)
  const linkName = showLess ? 'Show All' : 'Show Less'
  const isHtml = htmlContent !== undefined || content.includes('<span class=')
  const shouldCollapse = hasOverflow
  const hasLanguage = language !== undefined && language !== ''

  // Only measure while collapsed: the max-height/overflow-hidden style is
  // what makes scrollHeight (full content) differ from clientHeight (capped)
  // when the content actually overflows. While expanded there's nothing to
  // measure, so we leave hasOverflow as-is rather than let it flip false.
  useLayoutEffect(() => {
    const node = htmlContentRef.current || paragraphContentRef.current
    if (!node || !showLess) {
      return undefined
    }

    const checkOverflow = (): void => {
      setHasOverflow(node.scrollHeight > node.clientHeight)
    }

    checkOverflow()

    const resizeObserver = new ResizeObserver(checkOverflow)
    resizeObserver.observe(node)

    return () => resizeObserver.disconnect()
  }, [showLess, sanitizedContent])

  // This should hopefully never happen
  if (content === '' && htmlContent === undefined) {
    return null
  }

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
            ref={htmlContentRef}
            style={showLess ? collapsedHtmlStyle : undefined}
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
            ref={paragraphContentRef}
            style={showLess ? collapsedParagraphStyle : undefined}
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
