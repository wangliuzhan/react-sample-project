export default function(state = {}, action) {
  if (action.type === 'ajax_error') {
    return Object.assign({}, state, {
      ajax: action.payload
    })
  }

  return state
}
