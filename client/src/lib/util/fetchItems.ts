/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchItems = (uri: string): Promise<any> =>
  fetch(`${uri}?profile=results`)
    .then((response) =>
      response.text().then((translatedString) => JSON.parse(translatedString)),
    )
    .catch((e) => new Error('An error occurred retrieving the data from the '))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getItems(uris: Array<string>): any {
  const promises = uris.map((uri: string) => fetchItems(uri))
  return Promise.all(promises).then((result) => ({ data: result }))
}
