import React from 'react'

import config from '../../config/config'

interface IProps {
  searchString: string
}

/**
 * Removes any words in the config's stop words list from the searchString.
 */
export function removeStopWords(searchString: string): string {
  return searchString
    .split(/\s+/)
    .filter(
      (word) =>
        word !== '' &&
        !config.advancedSearch.stopWords.includes(word.toLowerCase()),
    )
    .join(' ')
}

const KeywordSearchLink: React.FC<IProps> = ({ searchString }) => (
  <p>{removeStopWords(searchString)}</p>
)

export default KeywordSearchLink
