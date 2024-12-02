/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react'
import { useParams } from 'react-router-dom'

import {
  QueryOption,
  getAllowedSearchOptions,
} from '../../config/advancedSearch/options'
import { useAppDispatch } from '../../app/hooks'
import {
  addBoost,
  addComplete,
  removeBoost,
  removeComplete,
  updateOptions,
} from '../../redux/slices/advancedSearchSlice'
import { searchScope } from '../../config/searchTypes'
import { conditionals } from '../../config/advancedSearch/conditionals'
import { ResultsTab } from '../../types/ResultsTab'

import DropdownCheckbox from './DropdownCheckbox'

/**
 * Dropdown list for advanced search row options
 * @param {Record<string, any>} state the current advanced search state
 * @param {string} stateId id of the current advanced search state object
 * @returns {JSX.Element}
 */
const DropdownCheckboxList = forwardRef<
  HTMLDivElement,
  {
    state: Record<string, any>
    stateId: string
  }
>(({ state, stateId }) => {
  const dispatch = useAppDispatch()
  const { tab } = useParams<keyof ResultsTab>() as ResultsTab
  const scope = searchScope[tab]
  const keys = Object.keys(state)
  let allowedOptions: QueryOption[] = []
  for (const key of keys) {
    if (!conditionals.hasOwnProperty(key) && !key.startsWith('_')) {
      allowedOptions = getAllowedSearchOptions(scope, key) || []
    }
  }

  const allowedOptionsBooleans = allowedOptions.reduce(
    (booleans, currentOption) => {
      booleans[currentOption] = true
      return booleans
    },
    {
      exact: false,
      unexact: false,
      'case-sensitive': false,
      'case-insensitive': false,
      'diacritic-sensitive': false,
      'diacritic-insensitive': false,
      'punctuation-sensitive': false,
      'punctuation-insensitive': false,
      'whitespace-sensitive': false,
      'whitespace-insensitive': false,
      stemmed: false,
      unstemmed: false,
      wildcarded: false,
      unwildcarded: false,
    },
  )

  const { _options, _weight, _complete } = state
  const options = _options as QueryOption[]
  const optionBooleans = options.reduce(
    (booleans, currentOption) => {
      booleans[currentOption] = true
      return booleans
    },
    {
      exact: false,
      unexact: false,
      'case-sensitive': false,
      'case-insensitive': false,
      'diacritic-sensitive': false,
      'diacritic-insensitive': false,
      'punctuation-sensitive': false,
      'punctuation-insensitive': false,
      'whitespace-sensitive': false,
      'whitespace-insensitive': false,
      stemmed: false,
      unstemmed: false,
      wildcarded: false,
      unwildcarded: false,
    },
  )
  const createOptionsDispatch =
    (selectedOption: QueryOption): (() => void) =>
    () =>
      dispatch(updateOptions({ stateId, selectedOption }))
  return (
    <React.Fragment>
      <DropdownCheckbox
        label="Boosted"
        helpTextKey="boosted"
        checked={_weight}
        onCheck={() => dispatch(addBoost({ stateId }))}
        onUncheck={() => dispatch(removeBoost({ stateId }))}
      />
      {allowedOptions.length > 0 &&
        // search terms with allowedOptions = ['exact'] do a cts.fieldValueQuery() so they already match a full value (sending a _complete won't change anything)
        !(allowedOptions.length === 1 && allowedOptions[0] === 'exact') && (
          <DropdownCheckbox
            label="Exact"
            helpTextKey="exact"
            checked={_complete}
            onCheck={() => dispatch(addComplete({ stateId }))}
            onUncheck={() => dispatch(removeComplete({ stateId }))}
          />
        )}
      {allowedOptionsBooleans['case-sensitive'] &&
        allowedOptionsBooleans['case-insensitive'] && (
          <DropdownCheckbox
            label="Case Sensitive"
            helpTextKey="caseSensitive"
            checked={optionBooleans['case-sensitive']}
            onCheck={createOptionsDispatch('case-sensitive')}
            onUncheck={createOptionsDispatch('case-insensitive')}
          />
        )}
      {allowedOptionsBooleans['diacritic-sensitive'] &&
        allowedOptionsBooleans['diacritic-insensitive'] && (
          <DropdownCheckbox
            label="Diacritic Sensitive"
            helpTextKey="diacriticSensitive"
            checked={optionBooleans['diacritic-sensitive']}
            onCheck={createOptionsDispatch('diacritic-sensitive')}
            onUncheck={createOptionsDispatch('diacritic-insensitive')}
          />
        )}
      {allowedOptionsBooleans['punctuation-sensitive'] &&
        allowedOptionsBooleans['punctuation-insensitive'] && (
          <DropdownCheckbox
            label="Punctuation Sensitive"
            helpTextKey="punctuationSensitive"
            checked={optionBooleans['punctuation-sensitive']}
            onCheck={createOptionsDispatch('punctuation-sensitive')}
            onUncheck={createOptionsDispatch('punctuation-insensitive')}
          />
        )}
      {allowedOptionsBooleans['whitespace-sensitive'] &&
        allowedOptionsBooleans['whitespace-insensitive'] && (
          <DropdownCheckbox
            label="Whitespace Sensitive"
            helpTextKey="whitespaceSensitive"
            checked={optionBooleans['whitespace-sensitive']}
            onCheck={createOptionsDispatch('whitespace-sensitive')}
            onUncheck={createOptionsDispatch('whitespace-insensitive')}
          />
        )}
      {allowedOptionsBooleans.stemmed && allowedOptionsBooleans.unstemmed && (
        <DropdownCheckbox
          label="Stemmed"
          helpTextKey="stemmed"
          checked={optionBooleans.stemmed}
          onCheck={createOptionsDispatch('stemmed')}
          onUncheck={createOptionsDispatch('unstemmed')}
        />
      )}
      {allowedOptionsBooleans.wildcarded &&
        allowedOptionsBooleans.unwildcarded && (
          <DropdownCheckbox
            label="Wildcarded"
            helpTextKey="wildcarded"
            checked={optionBooleans.wildcarded}
            onCheck={createOptionsDispatch('wildcarded')}
            onUncheck={createOptionsDispatch('unwildcarded')}
          />
        )}
    </React.Fragment>
  )
})

DropdownCheckboxList.displayName = 'DropdownCheckboxList'

export default DropdownCheckboxList
