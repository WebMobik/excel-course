export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = document.createElement('div')
    this.components.map(Component => {
      const component = new Component()

      $root.insertAdjacentElement('beforeend', component.toHTML())
    })

    return $root
  }

  render() {
    return this.$el.append(this.getRoot())
  }
}
