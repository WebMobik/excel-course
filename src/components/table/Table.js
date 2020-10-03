import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {onMouseEvent} from './table.listener';
import {shouldResize} from './table.functions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, options = {
      name: 'Table',
      listeners: ['mousedown'],
    })
    this.$root = $root
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      onMouseEvent(this.$root, event)
    }
  }
}
