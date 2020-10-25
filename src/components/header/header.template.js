export function createHeader(state) {
  const del = 'data-type="delete"'
  const exit = 'data-type="exit"'
  return `
        <input type="text" class="input" value="${state.title}" />

        <div>

        <div class="button" ${del}>
            <i class="material-icons" ${del}>delete</i>
        </div>

        <div class="button" ${exit}>
            <i class="material-icons" ${exit}>exit_to_app</i>
        </div>

        </div>
    `
}
