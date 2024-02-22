import config from '../../config/config'
import { ICmsResponse } from '../../lib/parse/cms/FeaturedCollectionParser'

export const langingPageCmsResponse = {
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
      type: 'node--landing_page',
      id: '123456',
      links: {
        self: {
          href: `${config.env.cmsApiBaseUrl}node/landing_page/123456?resourceVersion=id%3A913`,
        },
      },
      attributes: {
        drupal_internal__nid: 7,
        drupal_internal__vid: 913,
        status: true,
        title: 'LUX Landing Page Content',
        field_footer_blocks: [
          '<h2>Open Access</h2>\n\n<p>Open access information.</p>',
          '<h2>Interoperability</h2>\n\n<p>Interoperability information.</p>',
          '<h2>Bias in Collections</h2>\n\n<p>Bias in collections information.</p>',
        ],
        field_more_about_lux:
          '<h2>More About LUX</h2>\n\n<h3>Yale\'s Cultural Heritage IT Collaboration</h3>\n\n<p><span><span><span><span><span><span>More about LUX</span></span></span></span></span></span></p>\n\n<ul><li><a href="https://library.yale.edu/" target="new"><span><span><span><span><span><span>Yale University Library</span></span></span></span></span></span></a></li>\n\t<li><a href="https://britishart.yale.edu/" target="new"><span><span><span><span><span><span>Yale Center for British Art</span></span></span></span></span></span></a></li>\n\t<li><a href="https://peabody.yale.edu/" target="new"><span><span><span><span><span><span>Yale Peabody Museum</span></span></span></span></span></span></a></li>\n\t<li><a href="https://artgallery.yale.edu/" target="new"><span><span><span><span><span><span>Yale University Art Gallery</span></span></span></span></span></span></a></li>\n</ul>',
        field_what_is_lu: {
          value:
            "<h2>What Is LUX</h2>\r\n\r\n<h3>Yale's Cultural Heritage IT Collaboration</h3>\r\n\r\n<p>What is LUX?</p>\r\n",
          format: 'basic_html',
          processed:
            "<h2>What Is LUX</h2>\n\n<h3>Yale's Cultural Heritage IT Collaboration</h3>\n\n<p>What is LUX?</p>",
        },
      },
      relationships: {
        node_type: {
          data: {
            type: 'node_type--node_type',
            id: 'abc123',
            meta: {
              drupal_internal__target_id: 'landing_page',
            },
          },
          links: {
            related: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page/123456/node_type?resourceVersion=id%3A913`,
            },
            self: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page/123456/relationships/node_type?resourceVersion=id%3A913`,
            },
          },
        },
        field_hero_image: {
          data: [],
          links: {
            related: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page/123456/field_hero_image?resourceVersion=id%3A913`,
            },
            self: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page/123456/relationships/field_hero_image?resourceVersion=id%3A913`,
            },
          },
        },
      },
    },
  ],
  meta: {
    count: 1,
  },
  links: {
    self: {
      href: `${config.env.cmsApiBaseUrl}node/landing_page`,
    },
  },
}

export const landingPageImageCmsResponse = {
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
      type: 'node--landing_page_image',
      id: '654321',
      links: {
        self: {
          href: `${config.env.cmsApiBaseUrl}node/landing_page_image/654321?resourceVersion=id%3A22`,
        },
      },
      attributes: {
        drupal_internal__nid: 21,
        drupal_internal__vid: 22,
        status: true,
        title:
          'Florida perforate reindeer lichen (Cladonia perforata). Endemic to Florida.',
        promote: false,
        sticky: false,
        field_chit_unit: ['2'],
        field_iiif_image: {
          uri: 'https://images.collections.yale.edu/iiif/2/ypm:706a217c-b129-4118-9804-f6f9d736f4f1/318,157,2927,1350/1950,900/0/default.jpg',
          title: '',
          options: [],
        },
        field_landing_page_image_link: {
          uri: `${config.env.dataApiBaseUrl}view/object/e472b01a-b9ef-4140-ae68-ccbf8b8126ec`,
          title: '',
          options: [],
        },
        field_link_to_unit_record: null,
        field_url_path: '/view/object/e472b01a-b9ef-4140-ae68-ccbf8b8126ec',
      },
      relationships: {
        node_type: {
          data: {
            type: 'node_type--node_type',
            id: '13579',
            meta: {
              drupal_internal__target_id: 'landing_page_image',
            },
          },
          links: {
            related: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page_image/654321/node_type?resourceVersion=id%3A22`,
            },
            self: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page_image/654321/relationships/node_type?resourceVersion=id%3A22`,
            },
          },
        },
        field_landing_page_image: {
          data: {
            type: 'file--file',
            id: '8642',
            meta: {
              alt: 'Light silver-gray multi-branched tree-like plant against a black background.',
              title: '',
              width: 3484,
              height: 2608,
              drupal_internal__target_id: 18,
            },
          },
          links: {
            related: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page_image/654321/field_landing_page_image?resourceVersion=id%3A22`,
            },
            self: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page_image/654321/relationships/field_landing_page_image?resourceVersion=id%3A22`,
            },
          },
        },
      },
    },
    {
      type: 'node--landing_page_image',
      id: '123abc',
      links: {
        self: {
          href: `${config.env.cmsApiBaseUrl}node/landing_page_image/123abc?resourceVersion=id%3A25`,
        },
      },
      attributes: {
        drupal_internal__nid: 24,
        drupal_internal__vid: 25,
        status: true,
        title: 'Le café de nuit (The Night Café)',
        promote: false,
        sticky: false,
        field_chit_unit: ['3'],
        field_iiif_image: {
          uri: 'https://images.collections.yale.edu/iiif/2/yuag:3b072179-2fc7-42bc-87cc-9ee4d782b270/815,713,5852,2704/1950,900/0/default.jpg',
          title: '',
          options: [],
        },
        field_landing_page_image_link: {
          uri: `${config.env.dataApiBaseUrl}view/object/6a76f826-54e7-4b94-8fee-f043b29bb2b8`,
          title: '',
          options: [],
        },
        field_link_to_unit_record: null,
        field_url_path: '/view/object/6a76f826-54e7-4b94-8fee-f043b29bb2b8',
      },
      relationships: {
        node_type: {
          data: {
            type: 'node_type--node_type',
            id: '13579',
            meta: {
              drupal_internal__target_id: 'landing_page_image',
            },
          },
          links: {
            related: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page_image/123abc/node_type?resourceVersion=id%3A25`,
            },
            self: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page_image/123abc/relationships/node_type?resourceVersion=id%3A25`,
            },
          },
        },
        field_landing_page_image: {
          data: null,
          links: {
            related: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page_image/123abc/field_landing_page_image?resourceVersion=id%3A25`,
            },
            self: {
              href: `${config.env.cmsApiBaseUrl}node/landing_page_image/123abc/relationships/field_landing_page_image?resourceVersion=id%3A25`,
            },
          },
        },
      },
    },
  ],
  meta: {
    count: 87,
  },
  links: {
    self: {
      href: `${config.env.cmsApiBaseUrl}node/landing_page_image?page%5Blimit%5D=100`,
    },
  },
}

export const featuredBlockCmsResponse: ICmsResponse = {
  data: [
    {
      id: 'test-id-YUAG',
      attributes: {
        title: 'YUAG attributes title',
        body: 'YUAG body',
        field_iiif_image: {
          uri: 'https://YUAG-image-url.jpeg',
          title: 'field IIIF image title',
        },
        field_url_path: 'field url path',
        field_chit_unit: ['3'],
      },
      relationships: {
        field_featured_image: {
          data: {
            id: 'test data id',
            meta: {
              alt: 'alt',
            },
          },
        },
      },
    },
    {
      id: 'test-id-YUL',
      attributes: {
        title: 'YUL attributes title',
        body: 'YUL body',
        field_iiif_image: {
          uri: 'https://YUL-image-url.jpeg',
          title: 'field IIIF image title',
        },
        field_url_path: 'field url path',
        field_chit_unit: ['4'],
      },
      relationships: {
        field_featured_image: {
          data: {
            id: 'test data id',
            meta: {
              alt: 'alt',
            },
          },
        },
      },
    },
    {
      id: 'test-id-YPM',
      attributes: {
        title: 'YPM attributes title',
        body: 'YPM body',
        field_iiif_image: {
          uri: 'https://YPM-image-url.jpeg',
          title: 'field IIIF image title',
        },
        field_url_path: 'field url path',
        field_chit_unit: ['2'],
      },
      relationships: {
        field_featured_image: {
          data: {
            id: 'test data id',
            meta: {
              alt: 'alt',
            },
          },
        },
      },
    },
  ],
}
