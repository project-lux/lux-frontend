const CMS_PREFIX = '/content'

export const aboutPagesMap = new Map([
  [`${CMS_PREFIX}/about-lux`, 'About LUX'],
  [
    `${CMS_PREFIX}/collaboration-history`,
    "History of Digital Collaboration among Yale's Libraries, Museums, and ITS",
  ],
  [`${CMS_PREFIX}/technology`, 'LUX Technology'],
  [`${CMS_PREFIX}/sharable-outcomes`, 'Sharable Outcomes from LUX'],
  [`${CMS_PREFIX}/who-we-are`, 'Who We Are'],
  [`${CMS_PREFIX}/land-acknowledgement`, 'Land Acknowledgement'],
])

const cmsRouteMap = new Map([
  [`${CMS_PREFIX}/open-access`, 'Open Access'],
  [`${CMS_PREFIX}/simple-search`, 'Simple Search'],
  [`${CMS_PREFIX}/advanced-search`, 'Advanced Search'],
  [`${CMS_PREFIX}/result-views`, 'Result Views'],
  [`${CMS_PREFIX}/item-records`, 'Item Records'],
  [`${CMS_PREFIX}/access-to-collections`, 'Access to Collections'],
  [`${CMS_PREFIX}/rights-info`, 'Rights and Usage'],
  [`${CMS_PREFIX}/terms-of-use`, 'Terms of Use'],
])

export const getRouteNames = (): Map<string, string> => {
  const routeMap = new Map([
    ['/', 'LUX Landing Page'],
    ['/view/results', 'Results Page'],
  ])

  cmsRouteMap.forEach((value, key) => {
    routeMap.set(key, value)
  })

  aboutPagesMap.forEach((value, key) => {
    routeMap.set(key, value)
  })

  return routeMap
}
