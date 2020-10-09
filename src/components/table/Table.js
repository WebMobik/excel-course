import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from './table.template';
import {onMouseEvent} from './table.listener';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import {TableSelect} from './TableSelect';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, options = {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
    this.$root = $root
  }

  toHTML() {
    return createTable(20)
  }

  prepare() {
    this.selection = new TableSelect()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text => {
      this.selection.current.text(text)
    })
    this.$on('formula:blur', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      onMouseEvent(this.$root, event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'Enter',
      'Tab'
    ]

    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
