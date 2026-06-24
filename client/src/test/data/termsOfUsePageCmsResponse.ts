export const termsOfUsePageCmsResponse = {
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
    id: '9541cd7b-10df-4060-8594-004029fe3c38',
    links: {
      self: {
        href: 'https://dev.lux-cms.collections.yale.edu/jsonapi/node/page/9541cd7b-10df-4060-8594-004029fe3c38?resourceVersion=id%3A552',
      },
    },
    attributes: {
      drupal_internal__nid: 1,
      drupal_internal__vid: 1,
      status: true,
      title: 'Terms of Use',
      body: 'This is a test of the terms of use page body.',
      field_page_type: null,
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
            href: 'test',
          },
          self: {
            href: 'test',
          },
        },
      },
    },
  },
  links: {
    self: {
      href: 'test',
    },
  },
}
