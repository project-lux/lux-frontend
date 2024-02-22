import { transformRelatedListResults } from '../../../../../lib/parse/search/relatedListsParser'
import {
  mockRelatedListsResults,
  mockTranslatedRelatedListsResults,
} from '../../../../data/relatedLists'

describe('relatedListsParser', () => {
  it('converts related lists results correctly', () => {
    const translatedResults = transformRelatedListResults(
      mockRelatedListsResults.orderedItems,
    )
    expect(translatedResults).toStrictEqual(mockTranslatedRelatedListsResults)
  })
})
