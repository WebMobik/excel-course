import {$} from '@core/dom'

export function onMouseEvent($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const typeResize = $resizer.data.resize
    const coords = $parent.getCoords()
    const sideProp = typeResize == 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })

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
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else if (typeResize === 'row') {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        type: typeResize,
        id: $parent.data[typeResize]
      })

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0
      })
    }
  })
}
