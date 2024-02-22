import config from '../../config/config'

export const contentPageCmsResponse = {
  jsonapi: {
    version: '1.0',
    meta: {
      links: {
        self: {
          href: 'http://jsonapi.org/format/1.0/',
        },
      },
    },
  },
  data: {
    type: 'node--page',
    id: 'd1883671-2d9e-4d9c-a50c-faa3c2281ec7',
    links: {
      self: {
        href: `${config.env.cmsApiBaseUrl}node/page/d1883671-2d9e-4d9c-a50c-faa3c2281ec7?resourceVersion=id%3A716`,
      },
    },
    attributes: {
      drupal_internal__nid: 46,
      drupal_internal__vid: 716,
      status: true,
      title: 'Open Access',
      body: '<p>Content page body.</p>\n',
      field_page_type: '1',
    },
    relationships: {
      node_type: {
        data: {
          type: 'node_type--node_type',
          id: '1516d67b-1026-4dcf-a5b7-bbd44a153519',
          meta: {
            drupal_internal__target_id: 'page',
          },
        },
        links: {
          related: {
            href: `${config.env.cmsApiBaseUrl}node/page/d1883671-2d9e-4d9c-a50c-faa3c2281ec7/node_type?resourceVersion=id%3A716`,
          },
          self: {
            href: `${config.env.cmsApiBaseUrl}jsonapi/node/page/d1883671-2d9e-4d9c-a50c-faa3c2281ec7/relationships/node_type?resourceVersion=id%3A716`,
          },
        },
      },
    },
  },
  links: {
    self: {
      href: `${config.env.cmsApiBaseUrl}node/page/d1883671-2d9e-4d9c-a50c-faa3c2281ec7`,
    },
  },
}
