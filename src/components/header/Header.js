import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from './header.template';
import * as actions from '@/redux/actions'
import {$} from '@core/dom'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  toHTML() {
    return createHeader(this.store.getState())
  }

  updateTextHeaderInStore(value) {
    this.$dispatch(actions.currentTitle(value))
  }

  onInput(event) {
    const $target = $(event.target)
    this.updateTextHeaderInStore($target.text())
  }
}
