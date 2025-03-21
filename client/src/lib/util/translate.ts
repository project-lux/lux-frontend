import config, { getDataApiBaseUrl } from '../../config/config'

interface ITranslateParameters {
  query: string
  scope: string
  onSuccess: (translatedString: string) => void
  onError: () => void
  onLoading: () => void
}

export function translate({
  query,
  scope,
  onSuccess,
  onError,
  onLoading,
}: ITranslateParameters): void {
  const urlParams = new URLSearchParams()
  urlParams.set('q', query)
  onLoading()
  fetch(`${getDataApiBaseUrl()}api/translate/${scope}?${urlParams.toString()}`)
    .then((response) => {
      if (response.ok) {
        response.text().then((translatedString) => {
          onSuccess(translatedString)
        })
      } else {
        onError()
      }
    })
    .catch(() => onError())
}

export function checkForStopWords(queryString: string): string {
  if (queryString.includes('"')) {
    return queryString
  }
  const queryStringWords = queryString.split(/\W+/)
  if (queryStringWords.length === 1) {
    return queryString
  }
  for (const word of queryStringWords) {
    if (word !== '' && !config.advancedSearch.stopWords.includes(word)) {
      return queryString
    }
  }

  return `"${queryString}"`
}
