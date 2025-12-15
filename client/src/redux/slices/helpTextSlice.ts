import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import lodash from 'lodash'

import { nonSearchTermHelpText } from '../../config/advancedSearch/helpText'
import config from '../../config/config'
import { debug } from '../../lib/util/log'

export interface IHelpTextKey {
  selectedHelpText: string
  hoverHelpText: string
  selectedKey: string
  selectedHoverKey: string
}

const initialState: IHelpTextKey = {
  selectedHelpText: nonSearchTermHelpText.fieldSelectRow.helpText,
  hoverHelpText: '',
  selectedKey: '',
  selectedHoverKey: '',
}

export const helpTextSlice = createSlice({
  name: 'helpTextKey',
  initialState,
  reducers: {
    // Updates the state.value onChange of user input
    addSelectedHelpText: (
      state,
      action: PayloadAction<{ value: string; scope?: string }>,
    ) => {
      const { value, scope } = action.payload
      const hasHelp = (obj: { label?: string; helpText?: string }): boolean =>
        typeof obj === 'object' &&
        obj.label !== undefined &&
        obj.helpText !== undefined
      let valueObj: { label?: string; helpText?: string } = {}

      if (scope !== undefined && value !== '') {
        valueObj = lodash.get(config.advancedSearch.terms, [scope, value])
        if (!hasHelp(valueObj)) {
          debug(
            `failed to get help text for scope: ${scope}, label: ${valueObj?.label}, value: ${value}`,
          )
          return state
        }
      } else {
        valueObj = nonSearchTermHelpText[value]
        if (!hasHelp(valueObj)) {
          debug(`failed to get non-search-term help text for value: ${value}`)
          return state
        }
      }
      state.selectedHelpText = valueObj.helpText || ''
      state.selectedKey = valueObj.label || ''
    },
    addHoverHelpText: (
      state,
      action: PayloadAction<{ value: string; scope?: string }>,
    ) => {
      const { value, scope } = action.payload
      const { advancedSearch } = config
      const { terms } = advancedSearch
      if (scope !== undefined && value !== '') {
        // check that the values passed exist in the configuration
        if (terms.hasOwnProperty(scope) && terms[scope].hasOwnProperty(value)) {
          state.hoverHelpText = terms[scope][value].helpText
          state.selectedHoverKey = terms[scope][value].label
        }
      } else {
        state.hoverHelpText = nonSearchTermHelpText[value].helpText
        state.selectedHoverKey = nonSearchTermHelpText[value].label
      }
    },
    resetHoverHelpText: (state) => {
      state.hoverHelpText = ''
      state.selectedHoverKey = ''
    },
    resetHelpTextState: () => initialState,
  },
})

export const {
  addSelectedHelpText,
  addHoverHelpText,
  resetHoverHelpText,
  resetHelpTextState,
} = helpTextSlice.actions

export default helpTextSlice.reducer
