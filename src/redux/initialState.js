import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyles
}

const normalize = state => ({
  ...state,
  currentStyle: defaultStyles,
  currentText: ''
})

export const initialState = storage('excel-state') ?
    normalize(storage('excel-state')) :
    defaultState
