import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom'

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
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const typeResize = $resizer.data.resize
    const coords = $parent.getCoords()
    const sideProp = typeResize == 'col' ? 'bottom' : 'right'
    let value

    if (typeResize) {
      $resizer.css({
        opacity: 1,
        [sideProp]: '-5000px'
      })
    }

    document.onmousemove = e => {
      if (typeResize === 'col') {
        const delta = e.pageX - coords.right
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else if (typeResize === 'row') {
        const delta = e.pageY - coords.bottom // - coords.height
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (typeResize === 'col') {
        $parent.css({width: value + 'px'})
        console.log($parent.data)
        this.$root
            .findAll(`[data-cell="${$parent.data.cell}"]`)
            .forEach(el => el.style.width = value + 'px')
        $resizer.css({
          opacity: 0,
          right: 0
        })
      } else if (typeResize === 'row') {
        $parent.css({height: value + 'px'})
        $resizer.css({
          opacity: 0,
          bottom: 0,
        })
      }
    }
  }
}
