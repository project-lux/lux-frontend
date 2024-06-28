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

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const getTimelines = (
//   hrefs: Array<string>,
// ): { data: Error | Record<string, IOrderedItems[]> } => {
//   const results: Record<string, Array<IOrderedItems>> = {}
//   // set results
//   hrefs.map((href) => {
//     results[href] = []
//     return null
//   })

//   hrefs.map(async (href: string) => {
//     let currentPage = 1
//     let numPages = 1
//     let total = 0
//     let done = false
//     while (!done) {
//       const data = await fetchTimelineData(href, currentPage)
//       if (data instanceof Error) {
//       } else if (data.partOf) {
//         const { partOf, orderedItems } = data
//         // It should be an object
//         if (!Array.isArray(partOf) && currentPage === 1) {
//           // calculate the number of pages
//           const { totalItems } = partOf
//           total = isUndefined(totalItems) ? 0 : totalItems
//           if (total > PAGE_LENGTH) {
//             numPages = Math.ceil(total / PAGE_LENGTH)
//           }
//         }

//         results[href].concat(...orderedItems)
//       }

//       // Only increment pages if the number of pages is more than one and it is not the last page
//       if (numPages > 1 && currentPage !== numPages) {
//         currentPage += 1
//       }

//       if (numPages === currentPage) {
//         done = true
//       }
//     }
//   })
//   return { data: results }
// }
