/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchWithToken } from './fetchWithToken'

const PAGE_LENGTH = 10000

type FetchResultType = { [x: string]: any } | Error
type TimelineReturnType = { data: Array<FetchResultType> } | { error: string }

export const fetchTimelineData = (
  uri: string,
  halLinkName: string,
): Promise<FetchResultType> =>
  fetchWithToken(`${uri}&pageLength=${PAGE_LENGTH}`)
    .then((response) =>
      response.text().then((translatedString) => ({
        [halLinkName]: JSON.parse(translatedString),
      })),
    )
    .catch(() => new Error('The requested facets could not be returned.'))

export const getTimelines = (
  halLinks: Record<string, { href: string }>,
): Promise<TimelineReturnType> => {
  const promises = Object.entries(halLinks).map(([key, obj]) =>
    fetchTimelineData(obj.href, key),
  )
  return Promise.all(promises)
    .then((result) => {
      const items: Array<{ [x: string]: any }> = []
      for (const item of result) {
        if (item instanceof Error) {
          console.error('Error fetching timeline data:', item.message)
        } else {
          items.push(item)
        }
      }
      return { data: items }
    })
    .catch((e) => ({ error: e.message }))
}
