import {storage} from '@core/utils'
import {defaultStyle} from '@/constans'

const defaultState = {
  colState: {},
  rowState: {},
  dataState: {},
  currentText: '',
  currentStyle: defaultStyle
}

export const initialState = storage('excel-state') ?
    storage('excel-state') :
    defaultState
