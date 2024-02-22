import config from '../../config/config'

export const faqPageCmsResponse = {
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
  data: [
    {
      type: 'node--faq',
      id: 'test-id-1',
      links: {
        self: {
          href: `${config.env.cmsApiBaseUrl}node/faq/182cc1fe-893b-47db-bc03-02f4812a5b84?resourceVersion=id%3A636`,
        },
      },
      attributes: {
        drupal_internal__nid: 307,
        drupal_internal__vid: 636,
        status: true,
        title: 'Question One',
        body: '<p>Body one</p>',
        field_faq_tag: ['1'],
        field_sort_weight: -15,
      },
      relationships: {
        node_type: {
          data: {
            type: 'node_type--node_type',
            id: 'test-id-1',
            meta: {
              drupal_internal__target_id: 'faq',
            },
          },
          links: {
            related: {
              href: `${config.env.cmsApiBaseUrl}node/faq/182cc1fe-893b-47db-bc03-02f4812a5b84/node_type?resourceVersion=id%3A636`,
            },
            self: {
              href: `${config.env.cmsApiBaseUrl}node/faq/182cc1fe-893b-47db-bc03-02f4812a5b84/relationships/node_type?resourceVersion=id%3A636`,
            },
          },
        },
      },
    },
    {
      type: 'node--faq',
      id: 'test-id-2',
      links: {
        self: {
          href: `${config.env.cmsApiBaseUrl}node/faq/a4846b24-3e45-4047-9789-3fe69de40ecb?resourceVersion=id%3A650`,
        },
      },
      attributes: {
        drupal_internal__nid: 309,
        drupal_internal__vid: 650,
        status: true,
        title: 'Question Two',
        body: '<p>Body two</p>',
        field_faq_tag: ['2'],
        field_sort_weight: -19,
      },
      relationships: {
        node_type: {
          data: {
            type: 'node_type--node_type',
            id: 'test-id-2',
            meta: {
              drupal_internal__target_id: 'faq',
            },
          },
          links: {
            related: {
              href: `${config.env.cmsApiBaseUrl}node/faq/a4846b24-3e45-4047-9789-3fe69de40ecb/node_type?resourceVersion=id%3A650`,
            },
            self: {
              href: `${config.env.cmsApiBaseUrl}node/faq/a4846b24-3e45-4047-9789-3fe69de40ecb/relationships/node_type?resourceVersion=id%3A650`,
            },
          },
        },
      },
    },
    {
      type: 'node--faq',
      id: 'test-id-3',
      links: {
        self: {
          href: `${config.env.cmsApiBaseUrl}node/faq/064a950a-7ff8-4120-ad37-d2b8239fd536?resourceVersion=id%3A651`,
        },
      },
      attributes: {
        drupal_internal__nid: 310,
        drupal_internal__vid: 651,
        status: true,
        title: 'Question Three',
        body: '<p>Body three</p>',
        field_faq_tag: ['2'],
        field_sort_weight: -18,
      },
      relationships: {
        node_type: {
          data: {
            type: 'node_type--node_type',
            id: 'test-id-3',
            meta: {
              drupal_internal__target_id: 'faq',
            },
          },
          links: {
            related: {
              href: `${config.env.cmsApiBaseUrl}node/faq/064a950a-7ff8-4120-ad37-d2b8239fd536/node_type?resourceVersion=id%3A651`,
            },
            self: {
              href: `${config.env.cmsApiBaseUrl}node/faq/064a950a-7ff8-4120-ad37-d2b8239fd536/relationships/node_type?resourceVersion=id%3A651`,
            },
          },
        },
      },
    },
  ],
  meta: {
    count: 33,
  },
  links: {
    self: {
      href: `${config.env.cmsApiBaseUrl}node/faq?page%5Blimit%5D=100`,
    },
  },
}
