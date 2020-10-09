class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
            document.querySelector(selector) :
            selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    this.$el.textContent = text
  }

  clear() {
    this.html('')
    return this
  }

  on(eventName, callback) {
    this.$el.addEventListener(eventName, callback)
  }

  off(eventName, callback) {
    this.$el.removeEventListener(eventName, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  focus() {
    this.$el.focus()
    return this
  }

  id(parse) {
    if (parse) {
      const parse = this.id().split(':')
      return {
        row: +parse[0],
        col: +parse[1]
      }
    }
    return this.data.id
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  addClass(className) {
    this.$el.classList.add(className)
  }

  removeClass(className) {
    this.$el.classList.remove(className)
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes='') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
