const CODES = {
  A: 65,
  Z: 90
}

function toCell(cell) {
  return `
        <div class="cell" contenteditable="">${cell}</div>
    `
}

function toColumn(content) {
  return `
        <div class="column">
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
        <div class="row">
            ${rowInfo.trim()}
            <div class="row-data">${cols}</div>
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
      .map(toChar) // char array
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')
    rows.push(createRow(i+1, cell))
  }

  return rows.join('')
}
