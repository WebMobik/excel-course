import {$} from '@core/dom'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Select is not provide in router')
    }
    this.$placeholder = $(selector)

    this.changePageHandler = this.changePageHandler.bind(this)
    this.routes = routes

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)

    this.changePageHandler()
  }

  changePageHandler() {
    const Page = this.routes.excel
    const page = new Page()
    this.$placeholder.append(page.getRoot())

    page.afterRender()
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
