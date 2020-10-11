const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 25

function toCell(state, row) {
  return function(_, col) {
    return `
      <div class="cell" 
        contenteditable="" 
        data-id="${row}:${col}"
        data-type="cell"
        data-col="${col}"
        style="
          width: ${getWidth(state.colState, col)} 
        "
      ></div> 
    `
  }
}

function toColumn({elem, index, size}) {
  return `
        <div 
        class="column" 
        data-type="resizable" 
        data-col="${index}" 
        style="width: ${size}"
        >
          ${elem}
          <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, content, state) {
  const resizer = index ?`<div class="row-resize" data-resize="row"></div>` : ''
  const height = getHeight(state, index)

  return `
        <div 
          class="row" 
          data-type="resizable" 
          data-row=${index} 
          style="height: ${height}">
            <div class="row-info">${index ? index : ''}${resizer}</div>
            <div class="row-data">${content}</div>
        </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  return function(elem, index) {
    return {
      elem, index, size: getWidth(state, index)
    }
  }
}

export function createTable(rowsCount = 15, state) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(row+1, cell, state.rowState))
  }

  return rows.join('')
}
