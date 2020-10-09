const CODES = {
  A: 65,
  Z: 90
}

function toCell(row) {
  return function(_, col) {
    return `
      <div class="cell" 
        contenteditable="" 
        data-id="${row}:${col}"
        data-type="cell"
        data-col="${col}"
      ></div> 
    `
  }
}

function toColumn(index, content) {
  return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${content}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(index, cols) {
  const resizer = index ? `<div class="row-resize" data-resize="row"></div>`: ''
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

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map((el, index) => toColumn(index, el))
      .join('')

  rows.push(createRow(null, cols))

  for (let row = 0; row < rowsCount; row++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')
    rows.push(createRow(row+1, cell))
  }

  return rows.join('')
}
