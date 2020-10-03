const CODES = {
  A: 65,
  Z: 90
}

function toCell(index, cell) {
  return `
      <div class="cell" contenteditable="" data-cell="${index}">${cell}</div>
    `
}

function toColumn(index, content) {
  return `
        <div class="column" data-type="resizable" data-cell="${index}">
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

  for (let i = 0; i < rowsCount; i++) {
    const cell = new Array(colsCount)
        .fill('')
        .map((el, index) => toCell(index, el))
        .join('')
    rows.push(createRow(i+1, cell))
  }

  return rows.join('')
}
