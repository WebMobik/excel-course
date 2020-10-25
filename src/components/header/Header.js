import {ExcelComponent} from '@core/ExcelComponent';
import {createHeader} from './header.template';
import * as actions from '@/redux/actions'
import {$} from '@core/dom'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
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

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type == 'exit') {
      ActiveRoute.navigate('')
    }
    if ($target.data.type == 'delete') {
      const key = ActiveRoute.param
      const description = confirm('Вы действительно хотите удалить таблицу ?')
      if (description) {
        localStorage.removeItem('excel:' + key)
        ActiveRoute.navigate('')
      }
    }
  }
}
