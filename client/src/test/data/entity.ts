import config from '../../config/config'
import { unit } from '../../config/objectsSearchTags'
import IEntity from '../../types/data/IEntity'

// eslint-disable-next-line import/prefer-default-export
export const entity: IEntity = {
  id: `${config.env.dataApiBaseUrl}data/object/1`,
  type: 'HumanMadeObject',
  '@context': 'https://linked.art/ns/v1/data.json',
  _label: 'Test Object',
  identified_by: [
    {
      id: '',
      type: 'Name',
      content: 'Mock Entity',
      classified_as: [
        {
          id: config.aat.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
      language: [
        {
          id: config.aat.langen,
          type: 'Language',
          _label: 'eng',
        },
      ],
    },
    {
      id: '',
      type: 'Name',
      content: 'animal de compagnie',
      classified_as: [
        {
          id: config.aat.primaryName,
          type: 'Type',
          _label: 'Primary Name',
        },
      ],
      language: [
        {
          id: config.aat.langfr,
          type: 'Language',
          _label: 'french',
        },
      ],
    },
    {
      id: '',
      type: 'Name',
      content: 'Name with no language',
      classified_as: [
        {
          id: config.aat.displayName,
          type: 'Type',
          _label: 'Display Name',
        },
      ],
    },
    {
      id: '',
      type: 'Identifier',
      content: '12345abcde',
      attributed_by: [
        {
          type: 'AttributeAssignment',
          carried_out_by: [
            {
              id: `${config.env.dataApiBaseUrl}data/group/carried-out-by-library`,
              type: 'Group',
              _label: 'Library',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/classified-as`,
          type: 'Type',
          _label: 'System-Assigned Number',
        },
      ],
    },
    {
      id: '',
      type: 'Identifier',
      content: 'hello',
      attributed_by: [
        {
          type: 'AttributeAssignment',
          carried_out_by: [
            {
              id: `${config.env.dataApiBaseUrl}data/group/1234`,
              type: 'Group',
              _label: 'Library',
            },
          ],
        },
      ],
      classified_as: [
        {
          id: config.aat.sortValue,
          type: 'Type',
          _label: 'Sort value',
        },
      ],
    },
  ],
  part_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/object/12345`,
      type: 'object',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/object/54321`,
      type: 'object',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/object/6789`,
      type: 'object',
    },
  ],
  classified_as: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
      type: 'Type',
      _label: 'photographs',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/type-of-work`,
          type: 'Type',
          _label: 'Type of Work',
        },
      ],
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-2`,
      type: 'Type',
      _label: 'paintings',
    },
    {
      id: config.aat.collectionItem,
      type: 'Type',
      _label: 'collection item',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/classified-as-3`,
      type: 'Language',
      _label: 'spanish',
    },
  ],
  referred_to_by: [
    {
      id: '',
      type: 'LinguisticObject',
      _content_html:
        '<span class="lux_data"><a href="https://artgallery.yale.edu/print-study-room">By appointment, Duffy Study Room</a></span>',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/classified-as-1`,
          type: 'Type',
          _label: 'Access statement',
        },
      ],
      identified_by: [
        {
          id: `${config.env.dataApiBaseUrl}data/concept/identified-by-1`,
          type: 'Type',
          content: 'Attributed',
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/display-title`,
              type: 'Type',
              _label: 'Display Title',
            },
          ],
        },
      ],
    },
    {
      id: `${config.env.dataApiBaseUrl}data/text/fa6dd25e-054a-483c-84b4-0420bdf168e0`,
      type: 'LinguisticObject',
      content: 'Note 2',
      classified_as: [
        {
          id: `${config.env.dataApiBaseUrl}data/text/classified-as-2`,
          type: 'Type',
          _label: 'Not a Rights Statement',
        },
      ],
      language: [
        {
          id: config.aat.langen,
          type: 'Language',
          _label: 'English',
        },
      ],
    },
    {
      id: `${config.env.dataApiBaseUrl}data/text/copyright-licensing-statement`,
      type: 'LinguisticObject',
      content: 'Copyright licensing statement',
      classified_as: [
        {
          id: config.aat.copyrightLicensingStatement,
          type: 'Type',
          _label: 'Copyright Statement',
        },
      ],
    },
  ],
  member_of: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/member-of-1`,
      type: 'Set',
      _label: 'Photography (YUAG)',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/member-of-2`,
      type: 'Set',
      _label: 'Photography (YUAG)',
    },
  ],
  subject_of: [
    {
      id: '',
      type: 'LinguisticObject',
      _label: 'Website Text',
      digitally_carried_by: [
        {
          id: '',
          type: 'DigitalObject',
          _label: 'Home Page',
          access_point: [
            {
              id: 'https://test.yale.edu/site/link/2',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: config.aat.webPage,
              type: 'Type',
              _label: 'Web Page',
            },
          ],
        },
      ],
    },
    {
      id: '',
      type: 'LinguisticObject',
      _label: 'Website Text',
      digitally_carried_by: [
        {
          id: '',
          type: 'DigitalObject',
          _label: 'Home Page',
          access_point: [
            {
              id: 'https://www.not-a-web-page.com/',
              type: 'DigitalObject',
            },
          ],
          identified_by: [
            {
              id: '',
              type: 'Name',
              _label: 'Web Page',
              content: 'Name of non-web page link',
            },
          ],
        },
      ],
    },
    {
      id: '',
      type: 'LinguisticObject',
      _label: 'Website Text',
      digitally_carried_by: [
        {
          id: '',
          type: 'DigitalObject',
          _label: 'Home Page',
          access_point: [
            {
              id: 'https://test.yale.edu/site/link/1',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: config.aat.webPage,
              type: 'Type',
              _label: 'Web Page',
            },
          ],
          identified_by: [
            {
              id: '',
              type: 'Type',
              _label: 'Web Page',
              content: 'site link identified by',
            },
          ],
        },
      ],
    },
    {
      id: '',
      type: 'LinguisticObject',
      _label: 'IIIF v3 manifest',
      digitally_carried_by: [
        {
          id: '',
          type: 'DigitalObject',
          _label: 'IIIF v3 manifest',
          conforms_to: [
            {
              id: 'http://iiif.io/api/presentation/3/context.json',
              type: 'InformationObject',
            },
          ],
          access_point: [
            {
              id: 'https://manifests.collections.yale.edu/unit/obj/12345',
              type: 'DigitalObject',
            },
          ],
        },
      ],
    },
  ],
  equivalent: [
    {
      id: 'http://vocab.getty.edu/ulan/500404158',
      type: 'HumanMadeObject',
      _label: 'Equivalent Entity',
    },
    {
      id: 'https://viaf.org/viaf/3145857035722921320',
      type: 'HumanMadeObject',
      _label: 'Equivalent Entity',
    },
    {
      id: 'https://d-nb.info/gnd/118500856',
      type: 'HumanMadeObject',
      _label: 'Equivalent Entity',
    },
    {
      id: 'http://viaf.org/viaf/5811159477600927990004',
      type: 'HumanMadeObject',
      _label: 'Equivalent Entity',
    },
    {
      id: 'https://linked-art.library.yale.edu/node/test',
      type: 'HumanMadeObject',
      _label: 'Equivalent Entity',
    },
  ],
  represents: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/represents-1`,
      type: 'concept',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/represents-2`,
      type: 'concept',
    },
  ],
  about: [
    {
      id: `${config.env.dataApiBaseUrl}data/concept/about-1`,
      type: 'concept',
    },
    {
      id: `${config.env.dataApiBaseUrl}data/concept/about-2`,
      type: 'concept',
    },
  ],
  representation: [
    {
      type: 'VisualItem',
      _label: 'Appearance of Alfred Stieglitz',
      digitally_shown_by: [
        {
          type: 'DigitalObject',
          _label: 'Digital Image of Alfred Stieglitz',
          access_point: [
            {
              id: 'http://commons.wikimedia.org/wiki/Special:FilePath/Alfred%20Stieglitz%20self-portrait%2C%20freienwald%2C%201886.jpg',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/c6fc19d0-44e1-4464-82d0-d08ac1022555`,
              type: 'Type',
              _label: 'Digital Image',
            },
          ],
        },
      ],
    },
    {
      type: 'VisualItem',
      _label: 'Wikidata Image',
      digitally_shown_by: [
        {
          type: 'DigitalObject',
          access_point: [
            {
              id: 'https://commons.wikimedia.org/wiki/Special:Filepath/Alfred_Stieglitz_self-portrait,_freienwald,_1886.jpg',
              type: 'DigitalObject',
            },
          ],
          classified_as: [
            {
              id: `${config.env.dataApiBaseUrl}data/concept/c6fc19d0-44e1-4464-82d0-d08ac1022555`,
              type: 'Type',
              _label: 'Digital Image',
            },
          ],
          referred_to_by: [
            {
              type: 'LinguisticObject',
              content: 'Andy Warhol with Archie, his pet Dachshund',
              classified_as: [
                {
                  id: 'http://vocab.getty.edu/aat/300435416',
                  type: 'Type',
                  _label: 'Description',
                  classified_as: [
                    {
                      id: 'http://vocab.getty.edu/aat/300418049',
                      type: 'Type',
                      _label: 'Brief Text',
                    },
                  ],
                },
              ],
            },
            {
              type: 'LinguisticObject',
              content: 'by Jack Mitchell',
              classified_as: [
                {
                  id: `${config.env.dataApiBaseUrl}data/concept/4030679e-c6e0-4e5e-b3c0-48ee1b8cfe60`,
                  type: 'Type',
                  _label: 'Copyright/License Statement',
                  classified_as: [
                    {
                      id: 'http://vocab.getty.edu/aat/300418049',
                      type: 'Type',
                      _label: 'Brief Text',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  language: [
    {
      id: config.aat.langspa,
      type: 'concept',
    },
    {
      id: config.aat.langen,
      type: 'concept',
    },
  ],
  _links: {
    curies: [
      {
        name: 'la',
        href: 'https://linked.art/api/1.0/rels/{rel}',
        templated: true,
      },
      {
        name: 'lux',
        href: `${config.env.dataApiBaseUrl}api/rels/{rel}`,
        templated: true,
      },
    ],
    self: {
      href: `${config.env.dataApiBaseUrl}data/object/72c1ebe6-d0b4-4ac1-8632-19d854b2bcd9`,
    },
    [unit.searchTag]: {
      href: `${config.env.dataApiBaseUrl}api/search/agent?q=%7BC%22memberOfInverse%22%3A%7B%22curated%22%3A%7B%22containing%22%3A%7B%22id%22%3A%22https%3A%2F%2Flux.collections.yale.edu%2Fdata%2Fobject%2F72c1ebe6-d0b4-4ac1-8632-19d854b2bcd9%22%7D%7D%7D%7D`,
      _estimate: 1,
    },
    'lux:testHalLink2': {
      href: `${config.env.dataApiBaseUrl}api/search/agent?q=hal-link-to-search`,
      _estimate: 1,
    },
  },
}

export default entity
