import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click']
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input inputForm" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log(event.target.textContent.trim())
  }

  onClick(event) {
    // removeEvent(event)
    console.log('You clicked this', event.target.textContent)
  }
}
