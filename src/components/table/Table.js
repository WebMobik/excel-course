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
      listeners: ['mousedown', 'keydown'],
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

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
    this.emitter.subscribe('it is working', text => {
      this.selection.current.text(text)
    })
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
        this.selection.select($target)
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
      this.selection.select($next)
    }
  }
}
