export class ActiveRoute {
  static get path() {
    return window.location.hash
  }

  static get param() {
    return ActiveRoute.path.split('/')[1]
  }
}
