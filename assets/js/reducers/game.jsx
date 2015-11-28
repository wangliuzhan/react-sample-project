
export default function(state = {}, action) {
  if (action.type === 'create_game') {
    return Object.assign({}, state, {
      created: action.payload
    })
  }

  if (action.type === 'del_game') {
    return Object.assign({}, state, {
      removed: action.payload
    })
  }

  return state
}
