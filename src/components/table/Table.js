import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, options = {
      name: 'Table',
      listeners: ['mousedown'],
      mouseEvent: ''
    })
    this.listeners = options.listeners
    this.mouseEvent = options.mouseEvent
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    const target = event.target
    if (target.getAttribute('data-resize') !== null) {
      if (!this.listeners.includes(['mousemove'])) {
        this.listeners.push('mousemove', 'mouseup')
        this.initDomListeners()
      }
      this.mouseEvent = event
      console.log(this.listeners)
    }
    //     target.style.right = startX - pageX + 'px'

    //   target.onmouseup = function() {
    //     document.removeEventListener('mousemove', onMouseMove)
    //     target.onmouseup = null
    //   }
    // }

    // target.ondragstart = function() {
    //   return false;
    // };
  }

  onMousemove(event) {
    if (event.target) {
      event.target.style.zIndex = 9999
      const startX = this.mouseEvent.clientX
      console.log(event.pageX - startX)
      event.target.style.right = startX - event.pageX + 'px'
    }
  }

  onMouseup(event) {
    event.target.style.zIndex = 0
    this.removeDomListeners()
    this.listeners = ['mousedown']
  }
}
