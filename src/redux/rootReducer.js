import {
  TABLE_RESIZE,
  CHANGE_TEXT,
  CURRENT_STYLE,
  APPLY_STYLE,
  CURRENT_TITLE,
  UPDATE_DATE
} from './types';

export function rootReducer(state, action) {
  let field
  let val
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState'
      return {...state, [field]: value(action, state, field)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        dataState: value(action, state, field)}
    case CURRENT_STYLE:
      return {
        ...state,
        currentStyle: action.data,
      }
    case APPLY_STYLE:
      field = 'stylesState'
      val = state[field] || {}
      action.data.ids.forEach(id => {
        val[id] = {...val[id], ...action.data.value}
      })
      return {
        ...state,
        [field]: val,
        currentStyle: {...state.currentStyle, ...action.data.value}
      }
    case CURRENT_TITLE:
      return {
        ...state,
        title: action.data
      }
    case UPDATE_DATE:
      return {
        ...state,
        openedDate: new Date().toJSON()
      }
    default: return state
  }
}

function value(action, state, field) {
  const prevState = state[field] || {}
  prevState[action.data.id] = action.data.value
  return prevState
}
