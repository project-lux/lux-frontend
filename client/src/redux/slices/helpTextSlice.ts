import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { nonSearchTermHelpText } from '../../config/advancedSearch/helpText'
import config from '../../config/config'

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
      if (scope !== undefined && value !== '') {
        state.selectedHelpText =
          config.advancedSearch.terms[scope][value].helpText
        state.selectedKey = config.advancedSearch.terms[scope][value].label
      } else {
        state.selectedHelpText = nonSearchTermHelpText[value].helpText
        state.selectedKey = nonSearchTermHelpText[value].label
      }
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
