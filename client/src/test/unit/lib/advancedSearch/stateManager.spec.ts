import { advancedSearch } from '../../../../config/advancedSearch/advancedSearch'
import { QueryOption } from '../../../../config/advancedSearch/options'
import config from '../../../../config/config'
import {
  addChildHelper,
  addFieldSelectionHelper,
  convertAqSearchParam,
  findObjectInState,
  getExistingValue,
  getFieldToEntityRelationship,
  getParentLabels,
  getUpdatedOptions,
  removeObjectFromState,
} from '../../../../lib/advancedSearch/stateManager'
import { getStateId } from '../../../../lib/advancedSearch/stateId'
import { IAdvancedSearchState } from '../../../../redux/slices/advancedSearchSlice'

jest.mock('../../../../lib/advancedSearch/stateId', () => ({
  __esModule: true,
  getStateId: jest.fn(() => '1'),
}))

describe('stateManager functions', () => {
  config.advancedSearch = advancedSearch()

  beforeEach(async () => {
    const stateId = getStateId as jest.MockedFunction<typeof getStateId>
    stateId.mockImplementation(() => '1')
  })

  describe('removeObjectFromState', () => {
    it('returns state with array containing one object if only one object in a group', () => {
      const mockChildOne: IAdvancedSearchState = {
        _stateId: '1',
        name: '',
      }

      const mockParent: IAdvancedSearchState = {
        AND: [mockChildOne],
      }

      const mockState: IAdvancedSearchState = {
        _stateId: '1',
        ...mockParent,
      }

      expect(
        removeObjectFromState(mockParent, mockChildOne, mockState),
      ).toEqual({
        _stateId: '1',
        AND: [
          {
            _stateId: '1',
          },
        ],
      })
    })

    it('removes the object in array if array length is more than one', () => {
      const mockChildOne: IAdvancedSearchState = {
        _stateId: '3',
        name: '',
      }

      const mockChildTwo: IAdvancedSearchState = {
        _stateId: '4',
        producedBy: {
          _stateId: '2',
        },
      }

      const mockParent: IAdvancedSearchState = {
        AND: [mockChildOne, mockChildTwo],
      }

      const mockState: IAdvancedSearchState = {
        _stateId: '1',
        ...mockParent,
      }

      expect(
        removeObjectFromState(mockParent, mockChildTwo, mockState),
      ).toEqual({
        _stateId: '1',
        AND: [
          {
            _stateId: '3',
            name: '',
          },
        ],
      })
    })

    it('removes groups', () => {
      const mockChildOne: IAdvancedSearchState = {
        _stateId: '3',
        name: '',
      }

      const mockChildTwo: IAdvancedSearchState = {
        _stateId: '4',
        AND: [
          {
            _stateId: '5',
            producedBy: {
              _stateId: '2',
            },
          },
        ],
      }

      const mockParent: IAdvancedSearchState = {
        AND: [mockChildOne, mockChildTwo],
      }

      const mockState: IAdvancedSearchState = {
        _stateId: '1',
        ...mockParent,
      }

      expect(
        removeObjectFromState(mockParent, mockChildTwo, mockState),
      ).toEqual({
        _stateId: '1',
        AND: [mockChildOne, { _stateId: '4' }],
      })
    })
  })

  describe('addChildHelper', () => {
    it('returns state with added child to multiple field group', () => {
      const mockState: IAdvancedSearchState = {
        _stateId: '1',
        AND: [
          {
            _stateId: '1',
            name: '',
          },
        ],
      }
      const mockStateWithAddedQuery: IAdvancedSearchState = {
        _stateId: '1',
        AND: [
          {
            _stateId: '1',
            name: '',
          },
          {
            _stateId: '1',
          },
        ],
      }

      expect(addChildHelper(mockState)).toEqual(mockStateWithAddedQuery)
    })
  })

  describe('getParentLabels', () => {
    it('returns the labels based on the scope', () => {
      expect(getParentLabels('set')).toEqual({
        classification: 'Categorized As',
        containing: 'Contain',
        curatedBy: 'Curated By',
        id: 'LUX URI',
        identifier: 'Identifier',
        name: 'Name',
        text: 'Anywhere',
        member: 'Member of',
        usedForEvent: 'Used for Exhibition',
      })
    })
  })

  describe('getFieldToEntityRelationship', () => {
    it('returns the relationship based on the field selected', () => {
      const scope = 'item'
      const field = 'carries'
      expect(getFieldToEntityRelationship(scope, field)).toEqual('work')
    })
  })

  describe('getExistingValue', () => {
    const mockStateWithGroup: IAdvancedSearchState = {
      _stateId: '1',
      AND: [
        {
          _stateId: '1',
          name: 'test',
        },
      ],
      _options: [],
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const existingField: Array<Record<string, any>> = [
      {
        _stateId: '1',
        name: 'test',
      },
    ]

    it('returns the existing value for that field', () => {
      expect(getExistingValue(mockStateWithGroup)).toStrictEqual(existingField)
    })
  })

  describe('findObjectInState', () => {
    it('returns the correct object', () => {
      const mockState: IAdvancedSearchState = {
        _stateId: '1',
        encounteredBy: {
          AND: [
            {
              _stateId: '2',
              name: 'test',
            },
            {
              _stateId: '3',
              createdObject: {
                AND: [
                  {
                    _stateId: '4',
                    name: 'test',
                  },
                ],
              },
            },
          ],
        },
      }
      expect(findObjectInState(mockState, '4')).toEqual({
        _stateId: '4',
        name: 'test',
      })
    })

    it('returns null', () => {
      const mockState: IAdvancedSearchState = {
        _stateId: '1',
        encounteredBy: {
          AND: [
            {
              _stateId: '2',
              name: 'test',
            },
            {
              _stateId: '3',
              createdObject: {
                AND: [
                  {
                    _stateId: '4',
                    name: 'test',
                  },
                ],
              },
            },
          ],
        },
      }
      expect(findObjectInState(mockState, '6')).toBeNull()
    })
  })

  describe('convertAqSearchParam', () => {
    it('returns a json object with _stateId values and correct _options', () => {
      const mockStateWithOptions: IAdvancedSearchState = {
        encounteredBy: {
          AND: [
            {
              name: 'test',
            },
          ],
        },
      }

      const mockConvertedState: IAdvancedSearchState = {
        _stateId: '1',
        encounteredBy: {
          _stateId: '1',
          AND: [
            {
              _stateId: '1',
              name: 'test',
              _options: [
                'case-insensitive',
                'diacritic-insensitive',
                'punctuation-insensitive',
                'whitespace-insensitive',
                'stemmed',
                'wildcarded',
              ],
            },
          ],
        },
        _options: [
          'case-insensitive',
          'diacritic-insensitive',
          'punctuation-insensitive',
          'whitespace-insensitive',
          'stemmed',
          'wildcarded',
        ],
      }
      expect(convertAqSearchParam('item', mockStateWithOptions)).toEqual(
        mockConvertedState,
      )
    })
  })

  describe('getUpdatedOptions', () => {
    it('returns ', () => {
      const currentOptions: QueryOption[] = [
        'case-insensitive',
        'diacritic-insensitive',
        'punctuation-insensitive',
        'whitespace-insensitive',
        'stemmed',
        'wildcarded',
      ]

      const newOptions: QueryOption[] = [
        'diacritic-insensitive',
        'punctuation-insensitive',
        'whitespace-insensitive',
        'stemmed',
        'wildcarded',
        'case-sensitive',
      ]

      expect(getUpdatedOptions('case-sensitive', currentOptions)).toEqual(
        newOptions,
      )
    })
  })

  describe('addFieldSelectionHelper', () => {
    it('returns object with conditional property', () => {
      const objectInState = {
        _stateId: '1',
      }

      expect(addFieldSelectionHelper(objectInState, 'item', 'AND')).toEqual({
        _stateId: '1',
        _options: [],
        AND: [
          {
            _stateId: '1',
          },
        ],
      })
    })

    it('returns object with text input property', () => {
      const objectInState = {
        _stateId: '1',
      }

      expect(addFieldSelectionHelper(objectInState, 'item', 'text')).toEqual({
        _stateId: '1',
        text: '',
        _options: [
          'case-insensitive',
          'diacritic-insensitive',
          'punctuation-insensitive',
          'whitespace-insensitive',
          'stemmed',
          'wildcarded',
        ],
      })
    })

    it('returns object with boolean input property', () => {
      const objectInState = {
        _stateId: '1',
      }

      expect(
        addFieldSelectionHelper(objectInState, 'item', 'hasDigitalImage'),
      ).toEqual({
        _stateId: '1',
        hasDigitalImage: '',
        _options: [
          'case-sensitive',
          'diacritic-sensitive',
          'punctuation-sensitive',
          'whitespace-sensitive',
          'unstemmed',
          'unwildcarded',
        ],
      })
    })

    it('returns object with range input property', () => {
      const objectInState = {
        _stateId: '1',
      }

      expect(
        addFieldSelectionHelper(objectInState, 'item', 'producedDate'),
      ).toEqual({
        _stateId: '1',
        producedDate: '',
        _options: [],
      })
    })

    it('returns object with record type input property', () => {
      const objectInState = {
        _stateId: '1',
      }

      expect(
        addFieldSelectionHelper(objectInState, 'agent', 'recordType'),
      ).toEqual({
        _stateId: '1',
        recordType: '',
        _options: [],
      })
    })

    it('returns object with relationship property', () => {
      const objectInState = {
        _stateId: '1',
      }

      expect(
        addFieldSelectionHelper(objectInState, 'item', 'encounteredBy'),
      ).toEqual({
        _stateId: '1',
        encounteredBy: {
          _stateId: '1',
        },
        _options: [
          'case-insensitive',
          'diacritic-insensitive',
          'punctuation-insensitive',
          'whitespace-insensitive',
          'stemmed',
          'wildcarded',
        ],
      })
    })
  })
})
