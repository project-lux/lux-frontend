import config from '../../config/config'

export const aboutPageCmsResponse = {
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
    id: 'testId',
    links: {
      self: {
        href: `${config.env.cmsApiBaseUrl}node/page/self`,
      },
    },
    attributes: {
      drupal_internal__nid: 42,
      drupal_internal__vid: 551,
      status: true,
      title: 'About LUX',
      body: '<h2>About Page</h2>\n\n<p>This is the body paragraph.</p>',
      field_page_type: null,
    },
    relationships: {
      node_type: {
        data: {
          type: 'node_type--node_type',
          id: 'node-test-id',
          meta: {
            drupal_internal__target_id: 'page',
          },
        },
        links: {
          related: {
            href: `${config.env.cmsApiBaseUrl}node/page/related`,
          },
          self: {
            href: `${config.env.cmsApiBaseUrl}node/page/test`,
          },
        },
      },
    },
  },
  links: {
    self: {
      href: `${config.env.cmsApiBaseUrl}node/page/self`,
    },
  },
}
