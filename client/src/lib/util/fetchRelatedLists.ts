interface IRelationshipParameters {
  halLink: string
  page: number
  onSuccess: (data: string) => void
  onError: () => void
  onLoading: () => void
}

export function fetchRelatedLists({
  halLink,
  page,
  onSuccess,
  onError,
  onLoading,
}: IRelationshipParameters): void {
  onLoading()
  fetch(`${halLink}&page=${page}`)
    .then((response) => {
      if (response.ok) {
        response.text().then((data) => {
          onSuccess(data)
        })
      } else {
        onError()
      }
    })
    .catch((e) => onError())
}
