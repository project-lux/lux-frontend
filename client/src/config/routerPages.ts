import { FaqGroupKey, faqGroupLabels } from './cms'
import { searchScope } from './searchTypes'

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

export const openAccessRouteMap = new Map([
  [`${CMS_PREFIX}/open-access`, 'Open Access'],
  [`${CMS_PREFIX}/collections-access`, 'Access to Collections'],
  [`${CMS_PREFIX}/rights-usage`, 'Rights and Usage'],
  [`${CMS_PREFIX}/open-access-faq`, 'Open Access FAQ'],
  [`${CMS_PREFIX}/open-access-policy-2011`, 'Open Access Image Policy'],
])

const termsOfUseRouteMap = new Map([
  [`${CMS_PREFIX}/terms-of-use`, 'Terms of Use'],
])

const faqRouteMap = new Map([
  [`${CMS_PREFIX}/faq`, faqGroupLabels[FaqGroupKey.GENERAL_INFO]],
  [`${CMS_PREFIX}/simple-search`, faqGroupLabels[FaqGroupKey.SIMPLE_SEARCH]],
  [
    `${CMS_PREFIX}/advanced-search`,
    faqGroupLabels[FaqGroupKey.ADVANCED_SEARCH],
  ],
  [`${CMS_PREFIX}/result-views`, faqGroupLabels[FaqGroupKey.RESULT_VIEWS]],
  [`${CMS_PREFIX}/item-records`, faqGroupLabels[FaqGroupKey.ITEM_RECORDS]],
])

export const getRouteNames = (): Map<string, string> => {
  const routeMap = new Map([['/', 'LUX Landing Page']])

  Object.keys(searchScope).map((key) => {
    routeMap.set(`/view/results/${key}`, 'Results Page')
  })

  faqRouteMap.forEach((value, key) => {
    routeMap.set(key, value)
  })

  openAccessRouteMap.forEach((value, key) => {
    routeMap.set(key, value)
  })

  termsOfUseRouteMap.forEach((value, key) => {
    routeMap.set(key, value)
  })

  aboutPagesMap.forEach((value, key) => {
    routeMap.set(key, value)
  })

  return routeMap
}
