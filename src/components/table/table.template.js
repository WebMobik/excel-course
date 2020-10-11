const CODES = {
  A: 65,
  Z: 90
}

const DEFAULT_WALUE = 120

function toCell(state, row) {
  return function(_, col) {
    return `
      <div class="cell" 
        contenteditable="" 
        data-id="${row}:${col}"
        data-type="cell"
        data-col="${col}"
        style="width: ${getWidth(state.colState, col)}"
      ></div> 
    `
  }
}

function toColumn({col, index, width}) {
  return `
        <div 
        class="column" 
        data-type="resizable" 
        data-col="${index}" 
        style="width: ${width}"
        >
          ${col}
          <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, cols) {
  const resizer = index ?
    `<div 
    class="row-resize" 
    data-resize="row"
    data-row=${index}>
    </div>` :
    ''
  const rowInfo = `
  <div class="row-info">${index ? index : ''}${resizer}</div>
  `

  return `
        <div class="row" data-type="resizable" data-cell="${index}">
            ${rowInfo.trim()}
            <div class="row-data">${cols}</div>
            <div class="row-resize"></div>
        </div>
    `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state, index) {
  return (state[index] || DEFAULT_WALUE) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col, index, width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 15, state) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(row+1, cell))
  }

  return rows.join('')
}
