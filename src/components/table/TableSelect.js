
export class TableSelect {
  static className = 'selected'

  constructor() {
    this.group = []
    this.current = null
  }

  select($el) {
    this.clear()
    $el.focus().addClass(TableSelect.className)
    this.group.push($el)
    this.current = $el
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelect.className))
    this.group = []
  }

  selectGroup($elArr = []) {
    this.clear()
    this.group = $elArr
    this.group.forEach(el => el.addClass(TableSelect.className))
  }
}
