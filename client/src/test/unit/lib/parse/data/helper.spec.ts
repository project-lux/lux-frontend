import { apiText } from '../../../../../lib/parse/data/helper'
import { imprints } from '../../../../data/concept/imprints'
import { items } from '../../../../data/concept/items'
import { preferredTerms } from '../../../../data/concept/preferredTerms'

describe('helper', () => {
  describe('apiText', () => {
    it('returns the primary name when it is present', () => {
      expect(apiText(imprints, 'some/page/uri')).toBe('Imprints')
    })

    it('returns null when filterByAatValue is provided and is present in equivalent', () => {
      expect(
        apiText(items, 'some/page/uri', 'http://vocab.getty.edu/aat/300404024'),
      ).toBeNull()
    })

    it('returns the name when filterByAatValue is provided but is not present in equivalent', () => {
      expect(
        apiText(items, 'some/page/uri', 'http://vocab.getty.edu/aat/nothing'),
      ).toBe('items')
    })

    it('returns a key label based on entity type when primary name is in equivalent', () => {
      // path contains "object"
      expect(
        apiText(
          preferredTerms,
          '/view/object/0ac519e3-311f-4ab9-92e8-3503b221e9d8',
        ),
      ).toBe('Titles')

      // path contains "digital"
      expect(
        apiText(
          preferredTerms,
          '/view/digital/b387cfbb-b151-48a3-a1e7-c48c386d18cd',
        ),
      ).toBe('Titles')

      // path contains "visual"
      expect(
        apiText(
          preferredTerms,
          '/view/visual/cb6e3082-b56c-4375-896c-31bc1974a687',
        ),
      ).toBe('Titles')

      // path contains "text"
      expect(
        apiText(
          preferredTerms,
          '/view/text/86ea5610-176b-4785-9ee4-fb489e0b171d',
        ),
      ).toBe('Titles')

      // path contains "set"
      expect(
        apiText(
          preferredTerms,
          '/view/set/4ad2c040-3154-4813-8da6-42555098813a',
        ),
      ).toBe('Titles')

      // path contains none of the above
      expect(
        apiText(
          preferredTerms,
          '/view/group/d07b9b86-0a1e-4026-aa4c-8ecba8bbd9c9',
        ),
      ).toBe('Name')
    })
  })
})
