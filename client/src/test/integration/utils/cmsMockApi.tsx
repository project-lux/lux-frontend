import nock from 'nock'

import {
  cmsObjectsResponse,
  cmsWorksResponse,
  cmsPeopleAndGroupsResponse,
  cmsPlacesResponse,
  cmsConceptsResponse,
  cmsEventsResponse,
} from '../../data/cmsResponse'
import {
  langingPageCmsResponse,
  landingPageImageCmsResponse,
  featuredBlockCmsResponse,
} from '../../data/landingPageCmsResponse'
import config from '../../../config/config'
import { pagePaths } from '../../../config/cms'
import { aboutPageCmsResponse } from '../../data/aboutPageCmsResponse'
import { faqPageCmsResponse } from '../../data/faqPageCmsResponse'
import { contentPageCmsResponse } from '../../data/contentPageCmsResponse'

export default function cmsMockApi(): void {
  const cmsApiUrl = config.env.cmsApiBaseUrl || ''

  // Mock api calls made on the landing page
  nock(cmsApiUrl)
    .get(`/node/landing_page`)
    .reply(200, JSON.stringify(langingPageCmsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(cmsApiUrl)
    .get(`/node/landing_page_image?page[limit]=100`)
    .reply(200, JSON.stringify(landingPageImageCmsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(cmsApiUrl)
    .get(`/node/featured_block?page[limit]=100`)
    .reply(200, JSON.stringify(featuredBlockCmsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Mock api calls to the overlay endpoints
  nock(cmsApiUrl)
    .get(`/node/overlays/55538b06-19eb-4826-9e7d-bd65cf520277`)
    .reply(200, JSON.stringify(cmsObjectsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(cmsApiUrl)
    .get(`/node/overlays/bb17aee7-9ea4-4b6b-98ab-2aa42c18eb42`)
    .reply(200, JSON.stringify(cmsWorksResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(cmsApiUrl)
    .get(`/node/overlays/76db9289-5023-421a-9f22-f3057d0f87cc`)
    .reply(200, JSON.stringify(cmsPeopleAndGroupsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(cmsApiUrl)
    .get(`/node/overlays/a3f82f9d-441a-43b7-b29d-ca267d2cdb08`)
    .reply(200, JSON.stringify(cmsPlacesResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(cmsApiUrl)
    .get(`/node/overlays/7498936d-708d-4f69-b14b-58e6256615df`)
    .reply(200, JSON.stringify(cmsConceptsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  nock(cmsApiUrl)
    .get(`/node/overlays/2ae8cde4-1218-412f-9eb3-b58c328da20c`)
    .reply(200, JSON.stringify(cmsEventsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // About page api call
  nock(cmsApiUrl)
    .get(`/${pagePaths.aboutLux}`)
    .reply(200, JSON.stringify(aboutPageCmsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // FAQ page api call
  nock(cmsApiUrl)
    .get(`/node/faq?page[limit]=100`)
    .reply(200, JSON.stringify(faqPageCmsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })

  // Content page api call
  nock(cmsApiUrl)
    .get(`/${pagePaths.openAccess}`)
    .reply(200, JSON.stringify(contentPageCmsResponse), {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    })
}
