import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {parse} from '@core/parse';
import {createTable} from './table.template';
import {onMouseEvent} from './table.listener';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions';
import {TableSelect} from './TableSelect';
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, options = {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      subscribe: ['dataState'],
      ...options
    })
    this.$root = $root
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelect()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', value => {
      this.selection.current
          .attr('data-value', value)
      this.selection.current
          .text(parse(value))
      this.updateTextInStore(value)
    })
    this.$on('formula:blur', () => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.currentStyle(styles))
    this.$emit('table:select', $cell)
  }

  async resizeTable(event) {
    try {
      const data = await onMouseEvent(this.$root, event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
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
      const $next = this.$root.find(nextSelector(key, id, event))
      this.selectCell($next)
      if (key == 'Enter') {
        const $target = $(event.target)
        $target.text(parse($target.text()))
      }
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    const $targetText = $(event.target).text()
    this.selection.current.attr('data-value', $targetText)
    this.updateTextInStore($targetText)
  }
}
