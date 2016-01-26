
export default function(state = {}, action) {
  // ajax开始
  if (action.type === 'create_game') {
    return Object.assign({}, state, {
      loading: true
    })
  }

  // 成功请求
  if (action.type === 'create_game_ok') {
    return Object.assign({}, state, {
      created: action.payload,
      loading: false
    })
  }

  // 请求失败
  if (action.type === 'create_game_error') {
    return Object.assign({}, state, {
      loading: false
    })
  }

  if (action.type === 'del_game') {
    return Object.assign({}, state, {
      removed: action.payload,
      loading: false
    })
  }

  return state
}
