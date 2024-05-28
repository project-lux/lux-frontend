import config from '../../../../config/config'
import { advancedSearch } from '../../../../config/advancedSearch/advancedSearch'
import {
  containsInput,
  filterAdvancedSearch,
  getProperty,
  isBooleanInput,
  isDateInput,
  isGroup,
  isRangeInput,
  isTextInput,
  validateAdvancedSearch,
} from '../../../../lib/advancedSearch/advancedSearchParser'

describe('advancedSearchParser functions', () => {
  describe('getProperty', () => {
    it('returns property', () => {
      const obj = {
        _stateId: '2',
        _comp: '>',
        activeDate: 'test',
      }
      expect(getProperty(obj)).toEqual('activeDate')
    })
  })

  describe('containsInput', () => {
    it('returns true', () => {
      expect(containsInput(['_stateId', 'producedDate', '_comp'])).toEqual(true)
    })
  })

  describe('isRangeInput', () => {
    it('returns true for dimension input', () => {
      expect(isRangeInput('height')).toEqual(true)
    })
  })

  describe('isDateInput', () => {
    it('returns true', () => {
      expect(isDateInput('producedDate')).toEqual(true)
    })
  })

  describe('isTextInput', () => {
    it('returns true', () => {
      expect(isTextInput('name')).toEqual(true)
    })
  })

  describe('isGroup', () => {
    it('returns true', () => {
      expect(isGroup('AND')).toEqual(true)
    })
  })

  describe('isBooleanInput', () => {
    it('returns true for hasDigitalImage', () => {
      expect(isBooleanInput('hasDigitalImage')).toEqual(true)
    })

    it('returns true for isOnline', () => {
      expect(isBooleanInput('isOnline')).toEqual(true)
    })

    it('returns true for isOnline', () => {
      expect(isBooleanInput('isPublicDomain')).toEqual(true)
    })
  })

  describe('validateAdvancedSearch', () => {
    it('returns true if text value is entered', () => {
      expect(
        validateAdvancedSearch({
          _stateId: 1,
          name: 'andy "warhol',
        }),
      ).toEqual(true)
    })

    it('returns true if there are many text values and only is one is valid', () => {
      const mockState = {
        _stateId: 1,
        AND: [
          {
            _stateId: 2,
            text: '',
          },
          {
            _stateId: 3,
            name: 'andy warhol',
          },
          {
            _stateId: 4,
            id: '',
          },
        ],
      }
      expect(validateAdvancedSearch(mockState)).toEqual(true)
    })

    it('returns true if there is valid range input', () => {
      const mockState = {
        _stateId: 1,
        height: '1900',
        _comp: '>',
      }
      expect(validateAdvancedSearch(mockState)).toEqual(true)
    })

    it('returns false if there is invalid range input', () => {
      const mockState = {
        _stateId: 1,
        height: '1900',
        _comp: '',
      }
      expect(validateAdvancedSearch(mockState)).toEqual(false)
    })

    // TODO: uncomment when ML estimates are fixed
    // it('returns true if there is valid date input', () => {
    //   const mockState = {
    //     _stateId: 1,
    //     producedDate: {
    //       start: '1900',
    //       end: '1950',
    //     },
    //   }
    //   expect(validateAdvancedSearch(mockState)).toEqual(true)
    // })

    // TODO: uncomment when ML estimates are fixed
    // it('returns false if there is invalid date input', () => {
    //   const mockState = {
    //     _stateId: 1,
    //     producedDate: {
    //       start: '',
    //       end: '',
    //     },
    //   }
    //   expect(validateAdvancedSearch(mockState)).toEqual(false)
    // })
  })

  describe('filterAdvancedSearch', () => {
    config.advancedSearch = advancedSearch()

    it('removes invalid objects', () => {
      const mockState = {
        _stateId: 1,
        AND: [
          {
            _stateId: 2,
            producedBy: {
              _stateId: 5,
              name: '  ',
            },
          },
          {
            _stateId: 3,
            name: 'andy warhol',
          },
          {
            _stateId: 4,
            id: '',
          },
          {
            _stateId: 6,
            classification: {
              _stateId: 7,
              AND: [
                {
                  _stateId: 8,
                },
              ],
            },
          },
          // TODO: uncomment when ML estimates are fixed
          // {
          //   _stateId: 9,
          //   producedDate: {
          //     start: '',
          //     end: '',
          //   },
          // },
        ],
      }

      expect(filterAdvancedSearch('item', mockState)).toMatchObject({
        AND: [
          {
            name: 'andy warhol',
          },
        ],
      })
    })
  })
})
