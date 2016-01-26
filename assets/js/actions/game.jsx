/**
 * 所有的 action 必须遵循 Flux Standard Action
 * https://github.com/acdlite/flux-standard-action
 *
 * action只能包含如下四个字段：
 * type / payload / meta / error
 * error为true时，payload为Error对象
 */

export function create(payload) {
  return {
    type: 'create_game',
    payload,
    meta: {
      ajax: true,
      url: '/abc'
    }
  }
}

export function del(payload) {
  return {
    type: 'del_game',
    payload,
    meta: {
      ajax: true,
      url: '/abc'
    }
  }
}
