const PAGE_LENGTH = 10000

/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchTimelineData = (
  uri: string,
): Promise<{ [x: string]: any } | Error> =>
  fetch(`${uri}&pageLength=${PAGE_LENGTH}`)
    .then((response) =>
      response
        .text()
        .then((translatedString) => ({ [uri]: JSON.parse(translatedString) })),
    )
    .catch((e) => new Error('The requested facets could not be returned.'))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTimelines = (
  hrefs: Array<string>,
): Promise<{ data: (Error | { [x: string]: any })[] }> => {
  const promises = hrefs.map((href: string) => fetchTimelineData(href))
  return Promise.all(promises).then((result) => ({ data: result }))
}
