import React from 'react'

import LanguageSuperscript from './LanguageSuperscript'

interface IName {
  content: string
  language: string | undefined
  languageId: string
  notation?: string
}

const Name: React.FC<IName> = ({ content, language, languageId, notation }) => (
  <p className="mb-0">
    <span lang={notation}>{content} </span>
    {language !== undefined && language !== '' && (
      <LanguageSuperscript language={language} id={languageId} />
    )}
  </p>
)

export default Name
