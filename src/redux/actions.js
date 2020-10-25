import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CURRENT_STYLE,
  APPLY_STYLE,
  CURRENT_TITLE,
  UPDATE_DATE
} from './types';

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

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}

export function currentTitle(data) {
  return {
    type: CURRENT_TITLE,
    data
  }
}

export function updateDate() {
  return {
    type: UPDATE_DATE
  }
}
