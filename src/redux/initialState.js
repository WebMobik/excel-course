import {storage, clone} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyles,
  openedDate: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyle: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state') ?
    normalize(storage('excel-state')) :
    defaultState

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
