/* eslint-disable react/no-array-index-key */
import React from 'react'

import LanguageSuperscript from './LanguageSuperscript'

interface IName {
  content: string
  language: string | undefined
  languageId: string
}

const Name: React.FC<IName> = ({ content, language, languageId }) => (
  <React.Fragment>
    {content}{' '}
    {language !== undefined && language !== '' && (
      <LanguageSuperscript language={language} id={languageId} />
    )}
  </React.Fragment>
)

export default Name
