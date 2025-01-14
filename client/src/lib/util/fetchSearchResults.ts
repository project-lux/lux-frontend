import config from '../../config/config'

interface IRelationshipParameters {
  scope: string
  query: string
  onSuccess: (data: string) => void
  onError: () => void
  onLoading: () => void
}

export function fetchSearchResults({
  scope,
  query,
  onSuccess,
  onError,
  onLoading,
}: IRelationshipParameters): void {
  const urlParams = new URLSearchParams()
  urlParams.set('q', query)
  onLoading()
  fetch(`${config.env.dataApiBaseUrl}api/search/${scope}?${urlParams}`)
    .then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          onSuccess(data)
        })
      } else {
        onError()
      }
    })
    .catch(() => onError())
}
