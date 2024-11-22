/* eslint-disable @typescript-eslint/no-explicit-any */
export const fetchHalLinkSearchRequest = (
  link: string,
  page: number,
): Promise<any> =>
  fetch(`${link}&page=${page}`)
    .then((response) =>
      response.text().then((translatedString) => JSON.parse(translatedString)),
    )
    .catch(() => new Error('The requested facets could not be returned.'))
