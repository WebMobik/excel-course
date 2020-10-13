import {TABLE_RESIZE, CHANGE_TEXT, CURRENT_STYLE} from './types';

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}

export function currentStyle(data) {
  return {
    type: CURRENT_STYLE,
    data
  }
}
